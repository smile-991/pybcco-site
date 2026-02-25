export async function onRequestPost(context: any) {
  try {
    const { request, env } = context
    const body = await request.json().catch(() => ({}))

    const phone = String(body.phone || "").trim()
    const code = String(body.code || "").trim()

    if (!phone || !code) {
      return new Response(JSON.stringify({ error: "Phone and code required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // 1) تحقق من OTP في Supabase (service role لأن otp_tokens حسّاس)
    const otpRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/otp_tokens?phone=eq.${encodeURIComponent(
        phone
      )}&code=eq.${encodeURIComponent(code)}&select=phone,code,expires_at`,
      {
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    )

    if (!otpRes.ok) {
      return new Response(JSON.stringify({ error: "OTP check failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    const otpRows = await otpRes.json()
    if (!Array.isArray(otpRows) || otpRows.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid code" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    const otp = otpRows[0]
    const expiresAt = otp.expires_at ? new Date(otp.expires_at).getTime() : 0
    if (!expiresAt || Date.now() > expiresAt) {
      return new Response(JSON.stringify({ error: "Code expired" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    // 2) جلب client + access_token من جدول clients
    const clientRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/clients?phone=eq.${encodeURIComponent(
        phone
      )}&select=id,access_token`,
      {
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    )

    if (!clientRes.ok) {
      return new Response(JSON.stringify({ error: "Client lookup failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    const clients = await clientRes.json()
    if (!Array.isArray(clients) || clients.length === 0) {
      return new Response(JSON.stringify({ error: "Client not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    const client = clients[0]
    const token = String(client.access_token || "").trim()

    if (!token) {
      return new Response(JSON.stringify({ error: "Client access token missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    // 3) (اختياري) حذف/تعطيل OTP بعد الاستخدام - حتى ما يعاد استعماله
    await fetch(
      `${env.SUPABASE_URL}/rest/v1/otp_tokens?phone=eq.${encodeURIComponent(
        phone
      )}&code=eq.${encodeURIComponent(code)}`,
      {
        method: "DELETE",
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    ).catch(() => {})

    // 4) Set Cookie سنة كاملة
    const ONE_YEAR = 60 * 60 * 24 * 365 // seconds = 31536000

    // ملاحظة: SameSite=Lax أفضل لسيناريوهات أكثر من Strict (بس Strict كمان OK)
    // بما أنه نفس الدومين تمام. بخليها Strict حسب أسلوبك.
    const cookie = [
      `pybcco_client=${encodeURIComponent(token)}`,
      "HttpOnly",
      "Secure",
      "Path=/",
      "SameSite=Strict",
      `Max-Age=${ONE_YEAR}`,
    ].join("; ")

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookie,
      },
    })
  } catch {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}