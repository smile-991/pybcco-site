export const onRequest = async ({ request, env }: any) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,x-client-token",
    "Content-Type": "application/json",
  }

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders })
  if (request.method !== "POST") return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers: corsHeaders })

  try {
    const cookie = request.headers.get("cookie") || ""
    const isAdmin = cookie.includes("pybcco_admin=1")
    const clientToken = request.headers.get("x-client-token") || ""

    const body = await request.json().catch(() => ({}))
    const projectId = String(body.project_id || "").trim()
    if (!projectId) return new Response(JSON.stringify({ error: "project_id is required" }), { status: 400, headers: corsHeaders })

    // إذا مو أدمن لازم يكون معه توكن
    if (!isAdmin && !clientToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders })
    }

    // ✅ (اختياري) تحقق أن المشروع تابع لهذا العميل عند استخدام clientToken
    // إذا عندك جدول clients فيه access_token, نعمل تحقق:
    // 1) نجيب client_id من access_token
    // 2) نتأكد project.client_id = client_id
    if (!isAdmin) {
      const cRes = await fetch(`${env.SUPABASE_URL}/rest/v1/clients?access_token=eq.${encodeURIComponent(clientToken)}&select=id`, {
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
      })
      const c = await cRes.json().catch(() => [])
      const clientId = c?.[0]?.id
      if (!clientId) return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401, headers: corsHeaders })

      const pRes = await fetch(`${env.SUPABASE_URL}/rest/v1/projects?id=eq.${encodeURIComponent(projectId)}&client_id=eq.${encodeURIComponent(clientId)}&select=id`, {
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
      })
      const p = await pRes.json().catch(() => [])
      if (!p?.[0]?.id) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: corsHeaders })
    }

    const res = await fetch(
      `${env.SUPABASE_URL}/rest/v1/project_comments?project_id=eq.${encodeURIComponent(projectId)}&select=*&order=created_at.asc`,
      {
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    )

    const dataText = await res.text()
    const data = dataText ? JSON.parse(dataText) : []

    return new Response(JSON.stringify({ ok: true, project_id: projectId, items: data }), { status: 200, headers: corsHeaders })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: "Internal Server Error", message: e?.message || String(e) }), { status: 500, headers: corsHeaders })
  }
}