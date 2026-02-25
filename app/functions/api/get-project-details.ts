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

  // جلب المشروع (وتأكد أنه تابع لنفس العميل)
  const projectRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}&client_id=eq.${clientId}&select=*`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    }
  )

  const projects = await projectRes.json()

  if (!projects.length) {
    return new Response(
      JSON.stringify({ error: "Project not found" }),
      { status: 404 }
    )
  }

  const project = projects[0]

  // جلب الدفعات
  const paymentsRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/payments?project_id=eq.${projectId}&select=*`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    }
  )

  const payments = await paymentsRes.json()

  return new Response(
    JSON.stringify({
      project,
      payments
    }),
    { status: 200 }
  )
}