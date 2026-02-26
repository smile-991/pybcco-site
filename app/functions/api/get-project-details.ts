export async function onRequestGet(context: any) {
  const { request, env } = context
  const cookie = request.headers.get("cookie") || ""

  // ✅ Admin cookie (نفس منطق /api/admin-session)
  const isAdmin = cookie.includes("pybcco_admin=1")

  // ✅ Client cookie (للـ Portal)
  const clientMatch = cookie.match(/pybcco_client=([^;]+)/)
  const accessToken = clientMatch?.[1] || null

  // لازم يكون Admin أو Client
  if (!isAdmin && !accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  // ✅ project id (يدعم id أو project_id)
  const urlObj = new URL(request.url)
  const projectIdRaw =
    urlObj.searchParams.get("project_id") || urlObj.searchParams.get("id")

  if (!projectIdRaw) {
    return new Response(JSON.stringify({ error: "Project ID required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const projectId = projectIdRaw.trim()

  // ✅ Optional: UUID validation
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

  // ✅ Build headers for Supabase REST
  // - Admin: SERVICE ROLE (bypass RLS)
  // - Client: ANON + x-client-token (RLS)
  const headers: Record<string, string> = {
    Accept: "application/json",
  }

  if (isAdmin) {
    if (!env.SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing SUPABASE_SERVICE_ROLE_KEY" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }

    headers.apikey = env.SUPABASE_SERVICE_ROLE_KEY
    headers.Authorization = `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
  } else {
    if (!env.SUPABASE_ANON_KEY) {
      return new Response(JSON.stringify({ error: "Missing SUPABASE_ANON_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    headers.apikey = env.SUPABASE_ANON_KEY
    headers.Authorization = `Bearer ${env.SUPABASE_ANON_KEY}`
    headers["x-client-token"] = accessToken as string
  }

  // 1) Project
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
      { status: projectRes.status, headers: { "Content-Type": "application/json" } }
    )
  }

  if (!Array.isArray(projects) || projects.length === 0) {
    return new Response(JSON.stringify({ error: "Project not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    })
  }

  const project = projects[0]

  // 2) Payments
  const paymentsRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/payments?project_id=eq.${projectId}&order=created_at.desc&select=*`,
    { headers }
  )
  const payments = await paymentsRes.json().catch(() => [])

  // 3) Documents
  // إذا ما عندك uploaded_at فعليًا بجدول documents: بدّلها لـ created_at.desc
  const documentsRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/documents?project_id=eq.${projectId}&order=uploaded_at.desc&select=*`,
    { headers }
  )
  const documents = await documentsRes.json().catch(() => [])

  // 4) Updates
  const updatesRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/updates?project_id=eq.${projectId}&order=created_at.desc&select=*`,
    { headers }
  )
  const updates = await updatesRes.json().catch(() => [])

  // 5) Update photos
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

  return new Response(
    JSON.stringify({
      project,
      payments: Array.isArray(payments) ? payments : [],
      documents: Array.isArray(documents) ? documents : [],
      updates: Array.isArray(updates) ? updates : [],
      update_photos,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  )
}