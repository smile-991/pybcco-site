export async function onRequestPost(context: any) {
  try {
    const { request, env } = context
    const body = await request.json()

    if (!body.password) {
      return new Response(
        JSON.stringify({ error: "Password required" }),
        { status: 400 }
      )
    }

    if (body.password !== env.ADMIN_PASSWORD) {
      return new Response(
        JSON.stringify({ error: "Invalid password" }),
        { status: 401 }
      )
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Set-Cookie":
            "pybcco_admin=1; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=86400"
        }
      }
    )

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    )
  }
}