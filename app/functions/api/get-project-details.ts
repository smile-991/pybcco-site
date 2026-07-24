export async function onRequestGet(context: any) {
  const { request, env } = context
  const jsonHeaders = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  }

  try {
    const cookie = request.headers.get("cookie") || ""
    const isAdmin = cookie.includes("pybcco_admin=1")

    const clientMatch = cookie.match(/pybcco_client=([^;]+)/)
    const accessToken = clientMatch?.[1]
      ? decodeURIComponent(clientMatch[1]).trim()
      : ""

    if (!isAdmin && !accessToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: jsonHeaders,
      })
    }

    const url = new URL(request.url)
    const projectId = String(
      url.searchParams.get("project_id") || url.searchParams.get("id") || ""
    ).trim()

    if (!projectId) {
      return new Response(JSON.stringify({ error: "Project ID required" }), {
        status: 400,
        headers: jsonHeaders,
      })
    }

    const uuidOk =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        projectId
      )

    if (!uuidOk) {
      return new Response(JSON.stringify({ error: "Invalid project id" }), {
        status: 400,
        headers: jsonHeaders,
      })
    }

    const serviceHeaders = {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      Accept: "application/json",
    }

    let clientId = ""

    if (!isAdmin) {
      const clientRes = await fetch(
        `${env.SUPABASE_URL}/rest/v1/clients?access_token=eq.${encodeURIComponent(
          accessToken
        )}&select=id`,
        { headers: serviceHeaders }
      )

      const clients = await clientRes.json().catch(() => [])
      clientId = Array.isArray(clients)
        ? String(clients?.[0]?.id || "")
        : ""

      if (!clientRes.ok || !clientId) {
        return new Response(JSON.stringify({ error: "Invalid client session" }), {
          status: 401,
          headers: jsonHeaders,
        })
      }
    }

    const ownershipFilter = isAdmin
      ? ""
      : `&client_id=eq.${encodeURIComponent(clientId)}`

    const projectRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/projects?id=eq.${encodeURIComponent(
        projectId
      )}${ownershipFilter}&select=*`,
      { headers: serviceHeaders }
    )

    const projects = await projectRes.json().catch(() => null)

    if (!projectRes.ok) {
      return new Response(
        JSON.stringify({
          error: "Failed to load project",
          details: projects,
        }),
        { status: 502, headers: jsonHeaders }
      )
    }

    if (!Array.isArray(projects) || projects.length === 0) {
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
        headers: jsonHeaders,
      })
    }

    const project = projects[0]

    const [paymentsRes, documentsRes, updatesRes, milestonesRes] =
      await Promise.all([
        fetch(
          `${env.SUPABASE_URL}/rest/v1/payments?project_id=eq.${encodeURIComponent(
            projectId
          )}&order=created_at.desc&select=*`,
          { headers: serviceHeaders }
        ),
        fetch(
          `${env.SUPABASE_URL}/rest/v1/documents?project_id=eq.${encodeURIComponent(
            projectId
          )}&order=uploaded_at.desc&select=*`,
          { headers: serviceHeaders }
        ),
        fetch(
          `${env.SUPABASE_URL}/rest/v1/updates?project_id=eq.${encodeURIComponent(
            projectId
          )}&order=created_at.desc&select=*`,
          { headers: serviceHeaders }
        ),
        fetch(
          `${env.SUPABASE_URL}/rest/v1/project_milestones?project_id=eq.${encodeURIComponent(
            projectId
          )}&order=percentage.asc&select=*`,
          { headers: serviceHeaders }
        ),
      ])

    const [payments, documents, updates, milestones] = await Promise.all([
      paymentsRes.json().catch(() => []),
      documentsRes.json().catch(() => []),
      updatesRes.json().catch(() => []),
      milestonesRes.json().catch(() => []),
    ])

    const updateIds = Array.isArray(updates)
      ? updates.map((item: any) => item?.id).filter(Boolean)
      : []

    let updatePhotos: any[] = []

    if (updateIds.length > 0) {
      const inList = updateIds
        .map((value: string) => encodeURIComponent(value))
        .join(",")

      const photosRes = await fetch(
        `${env.SUPABASE_URL}/rest/v1/update_photos?update_id=in.(${inList})&select=*`,
        { headers: serviceHeaders }
      )

      const photos = await photosRes.json().catch(() => [])
      updatePhotos = Array.isArray(photos) ? photos : []
    }

    return new Response(
      JSON.stringify({
        project,
        payments: Array.isArray(payments) ? payments : [],
        documents: Array.isArray(documents) ? documents : [],
        updates: Array.isArray(updates) ? updates : [],
        update_photos: updatePhotos,
        milestones: Array.isArray(milestones) ? milestones : [],
      }),
      { status: 200, headers: jsonHeaders }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Server error",
        details: error?.message || String(error),
      }),
      { status: 500, headers: jsonHeaders }
    )
  }
}
