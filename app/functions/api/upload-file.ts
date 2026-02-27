export const onRequest = async (context: any) => {
  const { request, env } = context

  const origin = request.headers.get("Origin") || "*"
  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": origin === "null" ? "*" : origin,
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,x-client-token",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json",
    Vary: "Origin",
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed", method: request.method }), {
      status: 405,
      headers: corsHeaders,
    })
  }

  try {
    const form = await request.formData()

    const fileAny = form.get("file")
    const file = fileAny instanceof File ? fileAny : null

    const folder = String(form.get("folder") || "").trim()
    const projectId = String(form.get("project_id") || "").trim()
    const kind = String(form.get("kind") || "").trim()

    if (!file) {
      return new Response(
        JSON.stringify({
          error: "No file provided (field name must be: file)",
          debug: { gotType: typeof fileAny, gotValue: fileAny ? String(fileAny).slice(0, 80) : null },
        }),
        { status: 400, headers: corsHeaders }
      )
    }

    if (!projectId) {
      return new Response(JSON.stringify({ error: "project_id is required" }), {
        status: 400,
        headers: corsHeaders,
      })
    }

    const BUCKET = "project-files" // ✅ تأكد هذا الاسم مطابق بالـ Supabase Storage

    const ext = (() => {
      const n = file.name || "file"
      const i = n.lastIndexOf(".")
      return i >= 0 ? n.slice(i).toLowerCase() : ""
    })()

    const safeExt = ext && ext.length <= 10 ? ext : ""
    const ts = Date.now()
    const rand = Math.random().toString(16).slice(2)

    const finalFolder = folder || (kind === "update_photo" ? "updates" : "documents")

    const objectPath = [
      "projects",
      projectId,
      finalFolder,
      `${ts}-${rand}${safeExt}`,
    ].join("/")

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
          objectPath,
        }),
        { status: 500, headers: corsHeaders }
      )
    }

    const publicUrl = `${env.SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${objectPath}`

    return new Response(JSON.stringify({ ok: true, path: objectPath, url: publicUrl }), {
      status: 200,
      headers: corsHeaders,
    })
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: "Internal Server Error", message: e?.message || String(e) }),
      { status: 500, headers: corsHeaders }
    )
  }
}