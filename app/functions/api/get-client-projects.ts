export async function onRequestGet(context: any) {
  const { request, env } = context
  const cookie = request.headers.get("cookie") || ""

  const match = cookie.match(/pybcco_client=([^;]+)/)

  if (!match) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401 }
    )
  }

  const clientId = match[1]

  const res = await fetch(
    `${env.SUPABASE_URL}/rest/v1/projects?client_id=eq.${clientId}&select=*`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    }
  )

  const data = await res.json()

  return new Response(JSON.stringify(data), { status: 200 })
}