export async function onRequestPost(context: any) {
  const { request, env } = context
  const cookie = request.headers.get("cookie") || ""

  if (!cookie.includes("pybcco_admin=1")) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401 }
    )
  }

  const body = await request.json()
  const { full_name, phone } = body

  if (!full_name || !phone) {
    return new Response(
      JSON.stringify({ error: "Missing fields" }),
      { status: 400 }
    )
  }

  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      full_name,
      phone
    })
  })

  const data = await res.json()

  if (!res.ok) {
    return new Response(JSON.stringify(data), { status: 400 })
  }

  return new Response(JSON.stringify(data[0]), { status: 200 })
}