export async function onRequestPost(context: any) {
  try {
    const { request, env } = context
    const body = await request.json()

    if (!body?.password) {
      return new Response(JSON.stringify({ error: "Password required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      })
    }

    if (body.password !== env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // ✅ Cookie ثابت + شغال بدون loop
        "Set-Cookie":
          "pybcco_admin=1; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000"
      }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}