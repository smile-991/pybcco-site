export async function onRequestGet(context: any) {
  const { request, env } = context
  const cookie = request.headers.get("cookie") || ""

  const match = cookie.match(/pybcco_client=([^;]+)/)
  if (!match) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  const accessToken = match[1]

  const url = new URL(request.url)
  const projectId = url.searchParams.get("id")
  if (!projectId) {
    return new Response(JSON.stringify({ error: "Project ID required" }), { status: 400 })
  }

  const headers = {
    apikey: env.SUPABASE_ANON_KEY,
    Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
    "x-client-token": accessToken
  }

  // 1) Project (RLS رح يمنع أي مشروع مو تبع العميل)
  const projectRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}&select=*`,
    { headers }
  )
  const projects = await projectRes.json()

  if (!Array.isArray(projects) || projects.length === 0) {
    return new Response(JSON.stringify({ error: "Project not found" }), { status: 404 })
  }

  const project = projects[0]

  // 2) Payments
  const paymentsRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/payments?project_id=eq.${projectId}&order=date.asc&select=*`,
    { headers }
  )
  const payments = await paymentsRes.json()

  // 3) Documents
  const documentsRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/documents?project_id=eq.${projectId}&order=uploaded_at.desc&select=*`,
    { headers }
  )
  const documents = await documentsRes.json()

  // 4) Updates
  const updatesRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/updates?project_id=eq.${projectId}&order=created_at.desc&select=*`,
    { headers }
  )
  const updates = await updatesRes.json()

  // 5) Update photos (فلترة احترافية: بس صور تحديثات هذا المشروع)
  // نجيب IDs للتحديثات (إن وجدت) وبعدين نفلتر update_photos عليهم
  const updateIds = Array.isArray(updates) ? updates.map((u: any) => u.id).filter(Boolean) : []
  let update_photos: any[] = []

  if (updateIds.length > 0) {
    const inList = updateIds.map((x: string) => `"${x}"`).join(",")
    const photosRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/update_photos?update_id=in.(${inList})&select=*`,
      { headers }
    )
    const photos = await photosRes.json()
    update_photos = Array.isArray(photos) ? photos : []
  }

  return new Response(
    JSON.stringify({
      project,
      payments: Array.isArray(payments) ? payments : [],
      documents: Array.isArray(documents) ? documents : [],
      updates: Array.isArray(updates) ? updates : [],
      update_photos
    }),
    { status: 200 }
  )
}