export async function onRequestGet(context: any) {
  const { request, env } = context
  const cookie = request.headers.get("cookie") || ""

  // ✅ 1) Detect admin vs client
  // عدّل اسم الكوكي إذا عندك مختلف (مثلاً: pybcco_admin_session)
  const adminMatch = cookie.match(/pybcco_admin=([^;]+)/)
  const clientMatch = cookie.match(/pybcco_client=([^;]+)/)

  const isAdmin = !!adminMatch
  const accessToken = clientMatch?.[1] || null

  // ✅ لازم يكون واحد منهم موجود
  if (!isAdmin && !accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  // ✅ 2) Get project id (support id OR project_id)
  const urlObj = new URL(request.url)
  const projectIdRaw = urlObj.searchParams.get("project_id") || urlObj.searchParams.get("id")

  if (!projectIdRaw) {
    return new Response(JSON.stringify({ error: "Project ID required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  // ✅ لا تعمل encodeURIComponent للـ UUID داخل eq. (ممكن يعمل مشاكل مع PostgREST)
  const projectId = projectIdRaw.trim()

  // ✅ Optional: validate UUID شكلًا (يحميك من مدخلات غريبة)
  const uuidOk = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    projectId
  )
  if (!uuidOk) {
    return new Response(JSON.stringify({ error: "Invalid project id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  // ✅ 3) Build headers for Supabase REST
  // - Admin: use SERVICE_ROLE (bypass RLS) ✅
  // - Client: use ANON + x-client-token (RLS) ✅
  const headers: Record<string, string> = {
    Accept: "application/json",
  }

  if (isAdmin) {
    // لازم يكون موجود عندك في Cloudflare env
    // SUPABASE_SERVICE_ROLE_KEY
    if (!env.SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(JSON.stringify({ error: "Missing SUPABASE_SERVICE_ROLE_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    headers.apikey = env.SUPABASE_SERVICE_ROLE_KEY
    headers.Authorization = `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
  } else {
    // Client (RLS)
    headers.apikey = env.SUPABASE_ANON_KEY
    headers.Authorization = `Bearer ${env.SUPABASE_ANON_KEY}`
    headers["x-client-token"] = accessToken as string
  }

  // ✅ 4) Project
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

  // ✅ 5) Payments (الأفضل created_at.desc بدل date.asc)
  const paymentsRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/payments?project_id=eq.${projectId}&order=created_at.desc&select=*`,
    { headers }
  )
  const payments = await paymentsRes.json().catch(() => [])

  // ✅ 6) Documents (لو عندك uploaded_at ممتاز، وإذا لا، عدّلها لـ created_at)
  const documentsRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/documents?project_id=eq.${projectId}&order=uploaded_at.desc&select=*`,
    { headers }
  )
  const documents = await documentsRes.json().catch(() => [])

  // ✅ 7) Updates
  const updatesRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/updates?project_id=eq.${projectId}&order=created_at.desc&select=*`,
    { headers }
  )
  const updates = await updatesRes.json().catch(() => [])

  // ✅ 8) Update photos
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