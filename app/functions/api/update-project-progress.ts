export async function onRequestPost(context: any) {
  try {
    const { request, env } = context

    // ✅ تأكيد admin session
    const cookie = request.headers.get("cookie") || ""
    if (!cookie.includes("pybcco_admin=1")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const project_id = body?.project_id
    const progress_percent_raw = body?.progress_percent

    if (!project_id) {
      return new Response(JSON.stringify({ error: "project_id required" }), { status: 400 })
    }

    const progress_percent = Number(progress_percent_raw)
    if (!Number.isFinite(progress_percent)) {
      return new Response(JSON.stringify({ error: "progress_percent must be a number" }), { status: 400 })
    }

    const clamped = Math.max(0, Math.min(100, Math.round(progress_percent)))

    // ✅ تحديث المشروع (Service Role لتجاوز RLS)
    const supaRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/projects?id=eq.${encodeURIComponent(project_id)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          progress_percent: clamped,
          updated_at: new Date().toISOString(),
        }),
      }
    )

    const text = await supaRes.text()
    let data: any = null
    try { data = text ? JSON.parse(text) : null } catch { data = text }

    if (!supaRes.ok) {
      return new Response(
        JSON.stringify({ error: "Supabase update failed", details: data }),
        { status: 500 }
      )
    }

    return new Response(JSON.stringify({ success: true, project: data?.[0] || data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "Server error" }), { status: 500 })
  }
}