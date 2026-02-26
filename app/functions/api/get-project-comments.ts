export const onRequest = async (context: any) => {
  const { request, env } = context

  const origin = request.headers.get("Origin") || "https://pybcco.com"
  const allowOrigin = origin.includes("pybcco.com") ? origin : "https://pybcco.com"

  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,x-client-token",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json",
    Vary: "Origin",
  }

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders })
  if (request.method !== "POST")
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers: corsHeaders })

  try {
    const body = await request.json().catch(() => ({}))
    const projectId = String(body.project_id || "").trim()

    if (!projectId) {
      return new Response(JSON.stringify({ error: "project_id is required" }), { status: 400, headers: corsHeaders })
    }

    const baseUrl = new URL(request.url)
    const cookieHeader = request.headers.get("Cookie") || ""

    // =========================
    // 0) Try ADMIN session first (fallback)
    // =========================
    let isAdmin = false
    try {
      const adminSessUrl = `${baseUrl.origin}/api/admin-session`
      const aRes = await fetch(adminSessUrl, {
        method: "GET",
        headers: { Cookie: cookieHeader },
      })

      if (aRes.ok) {
        const aJson = await aRes.json().catch(() => null)
        if (aJson?.authorized === true) isAdmin = true
      }
    } catch {
      // ignore
    }

    // =========================
    // 1) Client token from header or client-session (ONLY if not admin)
    // =========================
    let clientToken = (request.headers.get("x-client-token") || "").trim()

    if (!isAdmin && !clientToken) {
      try {
        const sessUrl = `${baseUrl.origin}/api/client-session`
        const sRes = await fetch(sessUrl, {
          method: "GET",
          headers: { Cookie: cookieHeader },
        })

        if (sRes.ok) {
          const sJson = await sRes.json().catch(() => null)
          const t = String(sJson?.client_token || sJson?.access_token || "").trim()
          if (t) clientToken = t
        }
      } catch {
        // ignore
      }
    }

    // =========================
    // 2) Authorization gate
    // =========================
    if (!isAdmin && !clientToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders })
    }

    // =========================
    // 3) If client → verify ownership
    // =========================
    if (!isAdmin) {
      const cRes = await fetch(
        `${env.SUPABASE_URL}/rest/v1/clients?access_token=eq.${encodeURIComponent(clientToken)}&select=id`,
        {
          headers: {
            apikey: env.SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          },
        }
      )

      const c = await cRes.json().catch(() => [])
      const clientId = c?.[0]?.id
      if (!clientId) {
        return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401, headers: corsHeaders })
      }

      const pRes = await fetch(
        `${env.SUPABASE_URL}/rest/v1/projects?id=eq.${encodeURIComponent(projectId)}&client_id=eq.${encodeURIComponent(
          clientId
        )}&select=id`,
        {
          headers: {
            apikey: env.SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          },
        }
      )

      const p = await pRes.json().catch(() => [])
      if (!p?.[0]?.id) {
        return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: corsHeaders })
      }
    }

    // =========================
    // 4) Load comments (admin OR client)
    // =========================
    const listRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/project_comments?project_id=eq.${encodeURIComponent(
        projectId
      )}&select=id,project_id,sender_role,message,created_at&order=created_at.asc`,
      {
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    )

    const items = await listRes.json().catch(() => [])
    if (!listRes.ok) {
      return new Response(JSON.stringify({ error: "Load failed", status: listRes.status, details: items }), {
        status: 500,
        headers: corsHeaders,
      })
    }

    return new Response(JSON.stringify({ ok: true, items: Array.isArray(items) ? items : [] }), {
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