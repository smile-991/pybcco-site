export async function onRequestGet(context: any) {
  const { request, env } = context
  const cookie = request.headers.get("cookie") || ""

  const match = cookie.match(/pybcco_client=([^;]+)/)
  if (!match) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  const accessToken = match[1]

  const urlObj = new URL(request.url)
  const projectIdRaw = urlObj.searchParams.get("id")
  if (!projectIdRaw) {
    return new Response(JSON.stringify({ error: "Project ID required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const projectId = encodeURIComponent(projectIdRaw)

  const headers = {
    apikey: env.SUPABASE_ANON_KEY,
    Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
    "x-client-token": accessToken,
    Accept: "application/json",
  }

  // 1) Project (RLS يمنع أي مشروع مو تابع للعميل)
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
    `${env.SUPABASE_URL}/rest/v1/payments?project_id=eq.${projectId}&order=date.asc&select=*`,
    { headers }
  )
  const payments = await paymentsRes.json().catch(() => [])

  // 3) Documents
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

  // 5) Update photos (بس صور تحديثات هذا المشروع)
  const updateIds =
    Array.isArray(updates) ? updates.map((u: any) => u.id).filter(Boolean) : []

  let update_photos: any[] = []

  if (updateIds.length > 0) {
    // PostgREST in.(...) للـ UUID عادة بدون quotes
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