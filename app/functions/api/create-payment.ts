export async function onRequestPost(context: any) {
  const { request, env } = context
  const cookie = request.headers.get("cookie") || ""

  if (!cookie.includes("pybcco_admin=1")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  let body: any = null
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 })
  }

  const {
    project_id,
    amount,
    date,
    method,
    note
  } = body || {}

  if (!project_id || !amount) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
  }

  const insertRes = await fetch(`${env.SUPABASE_URL}/rest/v1/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      project_id,
      amount,
      date: date || new Date().toISOString(),
      method: method || null,
      note: note || null
    })
  })

  const inserted = await insertRes.json()

  if (!insertRes.ok) {
    return new Response(JSON.stringify({ error: "Supabase error", details: inserted }), { status: 400 })
  }

  return new Response(JSON.stringify(inserted[0]), { status: 200 })
}