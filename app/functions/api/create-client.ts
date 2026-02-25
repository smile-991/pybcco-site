function normalizePhone(input: any) {
  return String(input || "").trim().replace(/\s+/g, "")
}

function createTokenHex(bytes = 32) {
  const arr = new Uint8Array(bytes)
  crypto.getRandomValues(arr)
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export async function onRequestPost(context: any) {
  try {
    const { request, env } = context
    const cookie = request.headers.get("cookie") || ""

    if (!cookie.includes("pybcco_admin=1")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      })
    }

    const body = await request.json().catch(() => ({}))
    const full_name = String(body.full_name || "").trim()
    const phone = normalizePhone(body.phone)

    if (!full_name || !phone) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // ✅ توليد access_token قوي
    const access_token = createTokenHex(32)

    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        full_name,
        phone,
        access_token,
      }),
    })

    const text = await res.text()
    let data: any = null
    try {
      data = text ? JSON.parse(text) : null
    } catch {
      data = null
    }

    if (!res.ok) {
      // Supabase عادة بيرجع كائن فيه message/code/details
      // إذا phone unique رح يطلع خطأ تكرار
      return new Response(
        JSON.stringify({
          error: "Failed to create client",
          details: data,
          status: res.status,
        }),
        {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    const row = Array.isArray(data) ? data[0] : data
    return new Response(JSON.stringify(row), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: "Server error", details: String(e?.message || e) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}