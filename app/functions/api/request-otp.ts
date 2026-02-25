export async function onRequestPost(context: any) {
  const { request, env } = context
  const body = await request.json()
  const { phone } = body

  if (!phone) {
    return new Response(
      JSON.stringify({ error: "Phone required" }),
      { status: 400 }
    )
  }

  // تحقق أن العميل موجود
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

  // توليد كود 6 أرقام
  const code = Math.floor(100000 + Math.random() * 900000).toString()

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()

  await fetch(`${env.SUPABASE_URL}/rest/v1/otp_tokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
    },
    body: JSON.stringify({
      phone,
      code,
      expires_at: expiresAt,
      attempts: 0
    })
  })

  return new Response(
    JSON.stringify({
      success: true,
      message: "OTP generated. Send it via WhatsApp manually."
    }),
    { status: 200 }
  )
}