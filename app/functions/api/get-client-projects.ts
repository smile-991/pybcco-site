export async function onRequestGet(context: any) {
  const { request, env } = context
  const jsonHeaders = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  }

  try {
    const cookie = request.headers.get("cookie") || ""
    const match = cookie.match(/pybcco_client=([^;]+)/)
    const accessToken = match?.[1]
      ? decodeURIComponent(match[1]).trim()
      : ""

    if (!accessToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: jsonHeaders,
      })
    }

    const serviceHeaders = {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      Accept: "application/json",
    }

    const clientRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/clients?access_token=eq.${encodeURIComponent(
        accessToken
      )}&select=id`,
      { headers: serviceHeaders }
    )

    const clients = await clientRes.json().catch(() => [])
    const clientId = Array.isArray(clients) ? clients?.[0]?.id : null

    if (!clientRes.ok || !clientId) {
      return new Response(JSON.stringify({ error: "Invalid client session" }), {
        status: 401,
        headers: jsonHeaders,
      })
    }

    const projectsRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/projects?client_id=eq.${encodeURIComponent(
        clientId
      )}&order=created_at.desc&select=*`,
      { headers: serviceHeaders }
    )

    const projects = await projectsRes.json().catch(() => null)

    if (!projectsRes.ok) {
      return new Response(
        JSON.stringify({
          error: "Failed to load projects",
          details: projects,
        }),
        { status: 502, headers: jsonHeaders }
      )
    }

    return new Response(
      JSON.stringify(Array.isArray(projects) ? projects : []),
      { status: 200, headers: jsonHeaders }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Server error",
        details: error?.message || String(error),
      }),
      { status: 500, headers: jsonHeaders }
    )
  }
}
