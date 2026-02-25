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
    client_id,
    title,
    address,
    status = "active",
    progress_percent = 0,
    total_amount = 0,
    start_date = null,
  } = body || {}

  if (!client_id || !title) {
    return new Response(JSON.stringify({ error: "Missing fields: client_id, title" }), { status: 400 })
  }

  const yearFull = new Date().getFullYear()

  // 1) نجيب آخر year_sequence لهالسنة
  const lastRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/projects?year_full=eq.${yearFull}&select=year_sequence&order=year_sequence.desc&limit=1`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  )

  const lastData = await lastRes.json()
  const lastSeq =
    Array.isArray(lastData) && lastData.length > 0
      ? Number(lastData[0].year_sequence || 0)
      : 0

  const yearSequence = lastSeq + 1

  // Project Code مثال: PY-2026-001
  const projectCode = `PY-${yearFull}-${String(yearSequence).padStart(3, "0")}`

  // 2) Insert
  const insertRes = await fetch(`${env.SUPABASE_URL}/rest/v1/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      client_id,
      project_code: projectCode,
      title,
      address,
      status,
      progress_percent,
      total_amount,
      start_date,
      year_full: yearFull,
      year_sequence: yearSequence,
    }),
  })

  const inserted = await insertRes.json()

  if (!insertRes.ok) {
    return new Response(JSON.stringify({ error: "Supabase error", details: inserted }), { status: 400 })
  }

  return new Response(JSON.stringify(inserted[0]), { status: 200 })
}