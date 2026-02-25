export async function onRequestGet(context: any) {
  const { request, env } = context
  const cookie = request.headers.get("cookie") || ""

  if (!cookie.includes("pybcco_admin=1")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    })
  }

  try {
    const res = await fetch(
      `${env.SUPABASE_URL}/rest/v1/clients?select=*`,
      {
        method: "GET",
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    const text = await res.text()

    // لو Supabase رجع HTML أو نص غريب
    let data: any
    try {
      data = text ? JSON.parse(text) : []
    } catch {
      return new Response(
        JSON.stringify({
          error: "Bad response from Supabase",
          status: res.status,
          raw: text.slice(0, 200)
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      )
    }

    // لو Supabase رجع error
    if (!res.ok) {
      return new Response(
        JSON.stringify({
          error: "Supabase error",
          status: res.status,
          details: data
        }),
        { status: res.status, headers: { "Content-Type": "application/json" } }
      )
    }

    // لازم يكون Array
    if (!Array.isArray(data)) {
      return new Response(
        JSON.stringify({
          error: "Unexpected response format",
          details: data
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      )
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: "Server error", details: String(e?.message || e) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}