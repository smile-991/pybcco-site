export async function onRequestGet(context: any) {
  const { request, env } = context
  const cookie = request.headers.get("cookie") || ""

  if (!cookie.includes("pybcco_admin=1")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  const url = new URL(request.url)
  const clientId = url.searchParams.get("client_id")

  if (!clientId) {
    return new Response(JSON.stringify({ error: "client_id required" }), { status: 400 })
  }

  const res = await fetch(
    `${env.SUPABASE_URL}/rest/v1/projects?client_id=eq.${clientId}&order=created_at.desc&select=*`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  )

  const data = await res.json()

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Supabase error", details: data }), { status: 400 })
  }

  return new Response(JSON.stringify(data), { status: 200 })
}