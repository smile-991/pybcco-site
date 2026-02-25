export async function onRequestPost(context: any) {
  try {
    const { request, env } = context
    const cookie = request.headers.get("cookie") || ""

    if (!cookie.includes("pybcco_admin=1")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      })
    }

    const body = await request.json()

    const {
      client_id,
      title,
      address,
      total_amount,
      start_date
    } = body

    if (!client_id || !title) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      )
    }

    const now = new Date()
    const year = now.getFullYear()

    // 🔹 توليد رقم تسلسلي داخل نفس السنة
    const countRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/projects?year_full=eq.${year}&select=id`,
      {
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
        }
      }
    )

    const yearProjects = await countRes.json()
    const sequence = (Array.isArray(yearProjects) ? yearProjects.length : 0) + 1

    const project_code = `PY-${year}-${String(sequence).padStart(3, "0")}`

    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        client_id,
        title,
        address: address || null,
        total_amount: total_amount || 0,
        progress_percent: 0,
        status: "active",
        start_date: start_date || null,
        year_full: year,
        year_sequence: sequence,
        project_code
      })
    })

    const data = await res.json()

    if (!res.ok) {
      return new Response(JSON.stringify(data), { status: 400 })
    }

    return new Response(JSON.stringify(data[0]), { status: 200 })

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Server error", details: err.message }),
      { status: 500 }
    )
  }
}