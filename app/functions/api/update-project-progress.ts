export async function onRequestPost(context: any) {
  const { request, env } = context
  const body = await request.json()

  const { project_id, progress_percent } = body

  if (!project_id || progress_percent === undefined) {
    return new Response(
      JSON.stringify({ error: "Missing fields" }),
      { status: 400 }
    )
  }

  const percent = Number(progress_percent)

  if (Number.isNaN(percent) || percent < 0 || percent > 100) {
    return new Response(
      JSON.stringify({ error: "Progress must be between 0 and 100" }),
      { status: 400 }
    )
  }

  const res = await fetch(
    `${env.SUPABASE_URL}/rest/v1/projects?id=eq.${project_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({
        progress_percent: percent,
      }),
    }
  )

  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to update progress" }),
      { status: 500 }
    )
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 })
}