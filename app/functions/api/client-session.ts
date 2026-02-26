export const onRequestGet = async (context: any) => {
  const { request, env } = context

  const corsHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  }

  try {
    const cookie = request.headers.get("cookie") || ""
    const match = cookie.match(/pybcco_client=([^;]+)/)

    if (!match) {
      return new Response(JSON.stringify({ authorized: false }), {
        status: 401,
        headers: corsHeaders,
      })
    }

    // ✅ اعتبر قيمة الكوكي هي نفسها client_token
    const clientToken = decodeURIComponent(match[1] || "").trim()
    if (!clientToken) {
      return new Response(JSON.stringify({ authorized: false }), {
        status: 401,
        headers: corsHeaders,
      })
    }

    // ✅ تحقق من token داخل جدول clients
    const cRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/clients?access_token=eq.${encodeURIComponent(
        clientToken
      )}&select=id`,
      {
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    )

    const c = await cRes.json().catch(() => [])
    const clientId = c?.[0]?.id

    if (!clientId) {
      return new Response(JSON.stringify({ authorized: false }), {
        status: 401,
        headers: corsHeaders,
      })
    }

    return new Response(
      JSON.stringify({
        authorized: true,
        client_token: clientToken,
        client_id: clientId,
      }),
      { status: 200, headers: corsHeaders }
    )
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        authorized: false,
        error: "Internal Server Error",
        message: e?.message || String(e),
      }),
      { status: 500, headers: corsHeaders }
    )
  }
}