export async function onRequest(context: any) {
  const { request, env } = context

  const origin = request.headers.get("Origin") || "https://pybcco.com"
  const allowOrigin = origin.includes("pybcco.com") ? origin : "https://pybcco.com"

  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json",
    Vary: "Origin",
  }

  // Preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  // POST only
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: corsHeaders,
    })
  }

  // Admin auth
  const cookie = request.headers.get("cookie") || ""
  const isAdmin = cookie.includes("pybcco_admin=1")
  if (!isAdmin) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: corsHeaders,
    })
  }

  if (!env.SUPABASE_URL) {
    return new Response(JSON.stringify({ error: "Missing SUPABASE_URL" }), {
      status: 500,
      headers: corsHeaders,
    })
  }
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    return new Response(JSON.stringify({ error: "Missing SUPABASE_SERVICE_ROLE_KEY" }), {
      status: 500,
      headers: corsHeaders,
    })
  }

  let body: any = null
  try {
    body = await request.json()
  } catch {
    body = null
  }

  const id = String(body?.id || "").trim()
  const is_done = !!body?.is_done

  if (!id) {
    return new Response(JSON.stringify({ error: "Milestone id required" }), {
      status: 400,
      headers: corsHeaders,
    })
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
  }

  // 1) Read milestone to know project_id
  const msRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/project_milestones?id=eq.${id}&select=id,project_id,percentage`,
    { headers }
  )
  const msText = await msRes.text()
  let msJson: any = null
  try {
    msJson = msText ? JSON.parse(msText) : null
  } catch {
    msJson = null
  }

  if (!msRes.ok) {
    return new Response(
      JSON.stringify({ error: "Supabase error (milestone read)", status: msRes.status, details: msJson }),
      { status: msRes.status, headers: corsHeaders }
    )
  }

  if (!Array.isArray(msJson) || msJson.length === 0) {
    return new Response(JSON.stringify({ error: "Milestone not found" }), {
      status: 404,
      headers: corsHeaders,
    })
  }

  const milestone = msJson[0]
  const projectId = milestone.project_id

  // 2) Update milestone
  const updateRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/project_milestones?id=eq.${id}`,
    {
      method: "PATCH",
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        is_done,
        done_at: is_done ? new Date().toISOString() : null,
      }),
    }
  )

  const updText = await updateRes.text()
  let updJson: any = null
  try {
    updJson = updText ? JSON.parse(updText) : null
  } catch {
    updJson = null
  }

  if (!updateRes.ok) {
    return new Response(
      JSON.stringify({ error: "Supabase error (milestone update)", status: updateRes.status, details: updJson }),
      { status: updateRes.status, headers: corsHeaders }
    )
  }

  const updatedMilestone = Array.isArray(updJson) ? updJson[0] : updJson

  // 3) Recompute project progress based on max done milestone percentage
  const maxRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/project_milestones?project_id=eq.${projectId}&is_done=eq.true&select=percentage&order=percentage.desc&limit=1`,
    { headers }
  )

  let maxPct = 0
  if (maxRes.ok) {
    const maxArr = await maxRes.json().catch(() => [])
    if (Array.isArray(maxArr) && maxArr.length > 0) {
      const p = Number(maxArr[0]?.percentage || 0)
      maxPct = Number.isFinite(p) ? Math.max(0, Math.min(100, Math.trunc(p))) : 0
    }
  }

  // 4) Update projects.progress_percent (keep it aligned)
  const projUpd = await fetch(
    `${env.SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}`,
    {
      method: "PATCH",
      headers: {
        ...headers,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ progress_percent: maxPct }),
    }
  )

  if (!projUpd.ok) {
    const t = await projUpd.text().catch(() => "")
    return new Response(
      JSON.stringify({
        error: "Milestone updated, but project progress update failed",
        status: projUpd.status,
        details: t,
        milestone: updatedMilestone,
      }),
      { status: 500, headers: corsHeaders }
    )
  }

  return new Response(JSON.stringify({ ok: true, milestone: updatedMilestone, progress_percent: maxPct }), {
    status: 200,
    headers: corsHeaders,
  })
}
