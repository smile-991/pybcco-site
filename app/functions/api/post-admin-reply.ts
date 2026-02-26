export const onRequest = async ({ request, env }: any) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  }

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders })
  if (request.method !== "POST") return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers: corsHeaders })

  try {
    const cookie = request.headers.get("cookie") || ""
    if (!cookie.includes("pybcco_admin=1")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders })
    }

    const body = await request.json().catch(() => ({}))
    const projectId = String(body.project_id || "").trim()
    const message = String(body.message || "").trim()
    if (!projectId || !message) return new Response(JSON.stringify({ error: "project_id and message are required" }), { status: 400, headers: corsHeaders })

    const ins = await fetch(`${env.SUPABASE_URL}/rest/v1/project_comments`, {
      method: "POST",
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ project_id: projectId, sender_role: "admin", message }),
    })

    const txt = await ins.text()
    const json = txt ? JSON.parse(txt) : null
    if (!ins.ok) return new Response(JSON.stringify({ error: "Insert failed", status: ins.status, details: json }), { status: 500, headers: corsHeaders })

    return new Response(JSON.stringify({ ok: true, item: json?.[0] || json }), { status: 200, headers: corsHeaders })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: "Internal Server Error", message: e?.message || String(e) }), { status: 500, headers: corsHeaders })
  }
}