export const onRequest = async (context: any) => {
  const { request, env } = context

  const origin = request.headers.get("Origin") || "https://pybcco.com"
  const allowOrigin = origin.includes("pybcco.com") ? origin : "https://pybcco.com"

  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    Vary: "Origin",
  }

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders })
  if (request.method !== "POST")
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers: corsHeaders })

  const cookie = request.headers.get("cookie") || ""
  if (!cookie.includes("pybcco_admin=1")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders })
  }

  const safeJson = async (res: Response) => {
    const t = await res.text()
    if (!t) return null
    try { return JSON.parse(t) } catch { return t }
  }

  const parseStorageFromPublicUrl = (url: string) => {
    const m = url.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/)
    if (!m) return null
    return { bucket: m[1], path: m[2] }
  }

  const encodePath = (p: string) => p.split("/").map(encodeURIComponent).join("/")

  try {
    const body = await request.json().catch(() => ({}))
    const id = String(body.id || "").trim()
    const deleteStorage = body.delete_storage !== false // default true

    if (!id) return new Response(JSON.stringify({ error: "id required" }), { status: 400, headers: corsHeaders })

    // 1) fetch photo row to get photo_url
    const getRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/update_photos?id=eq.${encodeURIComponent(id)}&select=id,photo_url`,
      {
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    )
    const getJson = await safeJson(getRes)
    const row = Array.isArray(getJson) ? getJson[0] : null
    if (!getRes.ok || !row) {
      return new Response(JSON.stringify({ error: "Photo not found", details: getJson }), { status: 404, headers: corsHeaders })
    }

    // 2) delete db row
    const delRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/update_photos?id=eq.${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    )
    if (!delRes.ok) {
      const t = await delRes.text()
      return new Response(JSON.stringify({ error: "DB delete failed", details: t }), { status: 500, headers: corsHeaders })
    }

    // 3) delete storage (best effort)
    let storageDeleted = false
    let storageError: any = null

    if (deleteStorage && typeof row.photo_url === "string" && row.photo_url.includes("/storage/v1/object/public/")) {
      const parsed = parseStorageFromPublicUrl(row.photo_url)
      if (parsed) {
        const objPath = encodePath(parsed.path)
        const stRes = await fetch(`${env.SUPABASE_URL}/storage/v1/object/${parsed.bucket}/${objPath}`, {
          method: "DELETE",
          headers: {
            apikey: env.SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          },
        })
        if (stRes.ok) storageDeleted = true
        else storageError = await stRes.text()
      }
    }

    return new Response(JSON.stringify({ ok: true, dbDeleted: true, storageDeleted, storageError }), {
      status: 200,
      headers: corsHeaders,
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: "Internal Server Error", message: e?.message || String(e) }), {
      status: 500,
      headers: corsHeaders,
    })
  }
}