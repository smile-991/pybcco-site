export const onRequestPost = async (context: any) => {
  try {
    const { request, env } = context

    const cookie = request.headers.get("cookie") || ""
    if (!cookie.includes("pybcco_admin=1")) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { update_id, photo_url } = body

    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/update_photos`, {
      method: "POST",
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        update_id,
        photo_url
      })
    })

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    })

  } catch (err: any) {
    return new Response(err.message, { status: 500 })
  }
}