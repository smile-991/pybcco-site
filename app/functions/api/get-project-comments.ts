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

  // Preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  // Allow POST only
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: corsHeaders,
    })
  }

  try {
    // ✅ 1) token من الهيدر
    let clientToken = (request.headers.get("x-client-token") || "").trim()

    // ✅ 2) إذا ما في token، جيبه من session عبر Cookie
    if (!clientToken) {
      try {
        const baseUrl = new URL(request.url)
        const sessUrl = `${baseUrl.origin}/api/client-session`

        const sRes = await fetch(sessUrl, {
          method: "GET",
          headers: {
            Cookie: request.headers.get("Cookie") || "",
          },
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

    // ✅ إذا لسا ما في token
    if (!clientToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: corsHeaders,
      })
    }

    const body = await request.json().catch(() => ({}))
    const projectId = String(body.project_id || "").trim()

    if (!projectId) {
      return new Response(JSON.stringify({ error: "project_id is required" }), {
        status: 400,
        headers: corsHeaders,
      })
    }

    // 1) Find client by token
    const cRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/clients?access_token=eq.${encodeURIComponent(
        clientToken
      )}&select=id`,
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
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: corsHeaders,
      })
    }

    // 2) Verify project belongs to this client
    const pRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/projects?id=eq.${encodeURIComponent(
        projectId
      )}&client_id=eq.${encodeURIComponent(clientId)}&select=id`,
      {
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    )

    const p = await pRes.json().catch(() => [])
    if (!p?.[0]?.id) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: corsHeaders,
      })
    }

    // 3) Load comments
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
      return new Response(
        JSON.stringify({ error: "Load failed", status: listRes.status, details: items }),
        { status: 500, headers: corsHeaders }
      )
    }

    return new Response(JSON.stringify({ ok: true, items: Array.isArray(items) ? items : [] }), {
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