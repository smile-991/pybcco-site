export async function onRequestPost(context: any) {
  const { request, env } = context
  const body = await request.json()
  const { phone, code } = body

  if (!phone || !code) {
    return new Response(
      JSON.stringify({ error: "Phone and code required" }),
      { status: 400 }
    )
  }

  // جلب OTP صالح
  const otpRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/otp_tokens?phone=eq.${phone}&code=eq.${code}&select=*`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    }
  )

  const tokens = await otpRes.json()

  if (!tokens.length) {
    return new Response(
      JSON.stringify({ error: "Invalid code" }),
      { status: 401 }
    )
  }

  const token = tokens[0]

  // تحقق انتهاء الصلاحية
  if (new Date(token.expires_at) < new Date()) {
    return new Response(
      JSON.stringify({ error: "Code expired" }),
      { status: 401 }
    )
  }

  // جلب العميل
  const clientRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/clients?phone=eq.${phone}&select=id`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    }
  )

  const clients = await clientRes.json()

  if (!clients.length) {
    return new Response(
      JSON.stringify({ error: "Client not found" }),
      { status: 404 }
    )
  }

  const clientId = clients[0].id

  return new Response(
    JSON.stringify({ success: true }),
    {
      status: 200,
      headers: {
        "Set-Cookie":
          `pybcco_client=${clientId}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=86400`
      }
    }
  )
}