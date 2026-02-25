export async function onRequestGet(context: any) {
  const { request, env } = context
  const cookie = request.headers.get("cookie") || ""

  const match = cookie.match(/pybcco_client=([^;]+)/)

  if (!match) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401
    })
  }

  const accessToken = match[1]

  const res = await fetch(
    `${env.SUPABASE_URL}/rest/v1/projects?select=*`,
    {
      headers: {
        apikey: env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
        "x-client-token": accessToken
      }
    }
  )

  const data = await res.json()

  return new Response(JSON.stringify(data), { status: 200 })
}