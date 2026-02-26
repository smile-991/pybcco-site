export const onRequest = async (context: any) => {
  const { request, env } = context

  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: corsHeaders,
    })
  }

  try {
    // ✅ Cloudflare يدعم request.formData()
    const form = await request.formData()

    const file = form.get("file") as File | null
    const folder = String(form.get("folder") || "").trim() // مثال: "documents" أو "updates"
    const projectId = String(form.get("project_id") || "").trim()
    const kind = String(form.get("kind") || "").trim() // "document" | "update_photo" (اختياري)

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided (field name must be: file)" }), {
        status: 400,
        headers: corsHeaders,
      })
    }

    // ✅ اختياري: إذا بدك تلزم project_id
    if (!projectId) {
      return new Response(JSON.stringify({ error: "project_id is required" }), {
        status: 400,
        headers: corsHeaders,
      })
    }

    const BUCKET = "project-files" // 🔴 غيّرها إذا Bucket عندك اسمها مختلف في Supabase Storage

    const ext = (() => {
      const n = file.name || "file"
      const i = n.lastIndexOf(".")
      return i >= 0 ? n.slice(i).toLowerCase() : ""
    })()

    const safeExt = ext && ext.length <= 10 ? ext : ""
    const ts = Date.now()
    const rand = Math.random().toString(16).slice(2)

    // مسار التخزين داخل الباكت
    const pathParts = [
      "projects",
      projectId,
      folder || (kind === "update_photo" ? "updates" : "documents"),
      `${ts}-${rand}${safeExt}`,
    ]
    const objectPath = pathParts.filter(Boolean).join("/")

    // ✅ رفع الملف على Supabase Storage
    const uploadUrl = `${env.SUPABASE_URL}/storage/v1/object/${BUCKET}/${objectPath}`

    const upRes = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": file.type || "application/octet-stream",
        "x-upsert": "true",
      },
      body: await file.arrayBuffer(),
    })

    const upText = await upRes.text()
    if (!upRes.ok) {
      return new Response(
        JSON.stringify({
          error: "Upload failed",
          status: upRes.status,
          details: upText,
          uploadUrl,
        }),
        { status: 500, headers: corsHeaders }
      )
    }

    // ✅ توليد Public URL
    // لازم الباكت تكون Public أو تستخدم Signed URL (لكن خلّينا Public لأنه أسهل للبوابة)
    const publicUrl = `${env.SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${objectPath}`

    return new Response(
      JSON.stringify({
        ok: true,
        path: objectPath,
        url: publicUrl,
      }),
      { status: 200, headers: corsHeaders }
    )
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: "Internal Server Error", message: e?.message || String(e) }),
      { status: 500, headers: corsHeaders }
    )
  }
}