export async function onRequestGet(context: any) {
  const { request, env } = context
  const cookie = request.headers.get("cookie") || ""

  const match = cookie.match(/pybcco_client=([^;]+)/)

  if (!match) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401 }
    )
  }

  const clientId = match[1]
  const url = new URL(request.url)
  const projectId = url.searchParams.get("id")

  if (!projectId) {
    return new Response(
      JSON.stringify({ error: "Project ID required" }),
      { status: 400 }
    )
  }

  const headers = {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
  }

  // 1️⃣ تأكد أن المشروع تابع للعميل
  const projectRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}&client_id=eq.${clientId}&select=*`,
    { headers }
  )

  const projects = await projectRes.json()

  if (!Array.isArray(projects) || !projects.length) {
    return new Response(
      JSON.stringify({ error: "Project not found" }),
      { status: 404 }
    )
  }

  const project = projects[0]

  // 2️⃣ جلب الدفعات
  const paymentsRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/payments?project_id=eq.${projectId}&order=date.asc&select=*`,
    { headers }
  )
  const payments = await paymentsRes.json()

  // 3️⃣ جلب الملفات
  const documentsRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/documents?project_id=eq.${projectId}&order=uploaded_at.desc&select=*`,
    { headers }
  )
  const documents = await documentsRes.json()

  // 4️⃣ جلب التحديثات
  const updatesRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/updates?project_id=eq.${projectId}&order=created_at.desc&select=*`,
    { headers }
  )
  const updates = await updatesRes.json()

  // 5️⃣ جلب صور التحديثات
  const updatePhotosRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/update_photos?select=*`,
    { headers }
  )
  const updatePhotos = await updatePhotosRes.json()

  return new Response(
    JSON.stringify({
      project,
      payments: Array.isArray(payments) ? payments : [],
      documents: Array.isArray(documents) ? documents : [],
      updates: Array.isArray(updates) ? updates : [],
      update_photos: Array.isArray(updatePhotos) ? updatePhotos : []
    }),
    { status: 200 }
  )
}