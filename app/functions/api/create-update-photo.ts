export const onRequest = async (context: any) => {
  const { request, env } = context

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  }

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders })
  if (request.method !== "POST")
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers: corsHeaders })

  try {
    const body = await request.json().catch(() => ({}))
    const update_id = String(body.update_id || "").trim()
    const photo_url = String(body.photo_url || "").trim()

    if (!update_id || !photo_url) {
      return new Response(JSON.stringify({ error: "update_id and photo_url are required" }), {
        status: 400,
        headers: corsHeaders,
      })
    }

    const ins = await fetch(`${env.SUPABASE_URL}/rest/v1/update_photos`, {
      method: "POST",
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ update_id, photo_url }),
    })

    const txt = await ins.text()
    const json = txt ? JSON.parse(txt) : null

    if (!ins.ok) {
      return new Response(JSON.stringify({ error: "Insert failed", status: ins.status, details: json }), {
        status: 500,
        headers: corsHeaders,
      })
    }

    return new Response(JSON.stringify({ ok: true, item: json?.[0] || json }), { status: 200, headers: corsHeaders })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: "Internal Server Error", message: e?.message || String(e) }), {
      status: 500,
      headers: corsHeaders,
    })
  }
}