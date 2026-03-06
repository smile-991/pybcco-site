export async function onRequestGet(context: any) {
  const { request, env } = context

  const cookie = request.headers.get("cookie") || ""

  // Admin cookie
  const isAdmin = cookie.includes("pybcco_admin=1")

  // Client cookie
  const clientMatch = cookie.match(/pybcco_client=([^;]+)/)
  const accessToken = clientMatch?.[1] || null

  // 🔹 fallback client id from header (activate-account flow)
  const clientIdHeader = request.headers.get("x-client-id") || null

  if (!isAdmin && !accessToken && !clientIdHeader) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  const urlObj = new URL(request.url)

  const projectIdRaw =
    urlObj.searchParams.get("project_id") ||
    urlObj.searchParams.get("id")

  if (!projectIdRaw) {
    return new Response(JSON.stringify({ error: "Project ID required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const projectId = projectIdRaw.trim()

  const uuidOk =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      projectId
    )

  if (!uuidOk) {
    return new Response(JSON.stringify({ error: "Invalid project id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
  }

  if (isAdmin) {
    headers.apikey = env.SUPABASE_SERVICE_ROLE_KEY
    headers.Authorization = `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
  } else {
    headers.apikey = env.SUPABASE_ANON_KEY
    headers.Authorization = `Bearer ${env.SUPABASE_ANON_KEY}`

    if (accessToken) {
      headers["x-client-token"] = accessToken
    }

    if (clientIdHeader) {
      headers["x-client-id"] = clientIdHeader
    }
  }

  // =========================
  // 1️⃣ Project
  // =========================

  const projectRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}&select=*`,
    { headers }
  )

  const projectText = await projectRes.text()

  let projects: any = null

  try {
    projects = projectText ? JSON.parse(projectText) : null
  } catch {
    projects = null
  }

  if (!projectRes.ok) {
    return new Response(
      JSON.stringify({
        error: "Supabase error (project)",
        status: projectRes.status,
        details: projects,
      }),
      { status: projectRes.status }
    )
  }

  if (!Array.isArray(projects) || projects.length === 0) {
    return new Response(JSON.stringify({ error: "Project not found" }), {
      status: 404,
    })
  }

  const project = projects[0]

  // =========================
  // 2️⃣ Payments
  // =========================

  const paymentsRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/payments?project_id=eq.${projectId}&order=created_at.desc&select=*`,
    { headers }
  )

  const payments = await paymentsRes.json().catch(() => [])

  // =========================
  // 3️⃣ Documents
  // =========================

  const documentsRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/documents?project_id=eq.${projectId}&order=uploaded_at.desc&select=*`,
    { headers }
  )

  const documents = await documentsRes.json().catch(() => [])

  // =========================
  // 4️⃣ Updates
  // =========================

  const updatesRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/updates?project_id=eq.${projectId}&order=created_at.desc&select=*`,
    { headers }
  )

  const updates = await updatesRes.json().catch(() => [])

  // =========================
  // 5️⃣ Update Photos
  // =========================

  const updateIds =
    Array.isArray(updates) ? updates.map((u: any) => u.id).filter(Boolean) : []

  let update_photos: any[] = []

  if (updateIds.length > 0) {
    const inList = updateIds.join(",")

    const photosRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/update_photos?update_id=in.(${inList})&select=*`,
      { headers }
    )

    const photos = await photosRes.json().catch(() => [])

    update_photos = Array.isArray(photos) ? photos : []
  }

  // =========================
  // 6️⃣ Milestones
  // =========================

  const milestonesRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/project_milestones?project_id=eq.${projectId}&order=percentage.asc&select=*`,
    { headers }
  )

  const milestones = await milestonesRes.json().catch(() => [])

  return new Response(
    JSON.stringify({
      project,
      payments: Array.isArray(payments) ? payments : [],
      documents: Array.isArray(documents) ? documents : [],
      updates: Array.isArray(updates) ? updates : [],
      update_photos,
      milestones: Array.isArray(milestones) ? milestones : [],
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  )
}