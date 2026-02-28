export const onRequest = async (context: any) => {
  const { request, env } = context

  const origin = request.headers.get("Origin") || "https://pybcco.com"
  const allowOrigin = origin.includes("pybcco.com") ? origin : "https://pybcco.com"

  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json",
    Vary: "Origin",
  }

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders })
  if (request.method !== "POST")
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers: corsHeaders })

  try {
    // ✅ تأكد إنه أدمن (من الكوكي)
    const cookie = request.headers.get("cookie") || ""
    const isAdmin = cookie.includes("pybcco_admin=1")
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders })
    }

    const body = await request.json().catch(() => null)
    const client_id = String(body?.client_id || "").trim()
    if (!client_id) {
      return new Response(JSON.stringify({ error: "client_id required" }), { status: 400, headers: corsHeaders })
    }

    const SUPABASE_URL = env.SUPABASE_URL
    const SERVICE_ROLE = env.SUPABASE_SERVICE_ROLE_KEY

    if (!SUPABASE_URL || !SERVICE_ROLE) {
      return new Response(JSON.stringify({ error: "Missing Supabase env" }), { status: 500, headers: corsHeaders })
    }

    // Helper: Supabase REST request
    const sb = async (path: string, init: RequestInit = {}) => {
      const url = `${SUPABASE_URL}/rest/v1/${path}`
      const headers: Record<string, string> = {
        apikey: SERVICE_ROLE,
        Authorization: `Bearer ${SERVICE_ROLE}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
        ...(init.headers as any),
      }
      const res = await fetch(url, { ...init, headers })
      if (!res.ok) {
        const txt = await res.text().catch(() => "")
        throw new Error(`${path} failed: ${res.status} ${txt}`)
      }
      return res
    }

    // 1) جيب كل مشاريع العميل
    const projectsRes = await fetch(
      `${SUPABASE_URL}/rest/v1/projects?select=id&client_id=eq.${encodeURIComponent(client_id)}`,
      {
        headers: {
          apikey: SERVICE_ROLE,
          Authorization: `Bearer ${SERVICE_ROLE}`,
        },
      }
    )
    if (!projectsRes.ok) {
      const t = await projectsRes.text().catch(() => "")
      throw new Error(`get projects failed: ${projectsRes.status} ${t}`)
    }
    const projects = (await projectsRes.json().catch(() => [])) as Array<{ id: string }>
    const projectIds = projects.map((p) => p.id)

    // 2) احذف كل الجداول التابعة لكل مشروع (manual cascade)
    // ملاحظة: استخدمت in.(...) — إذا ما في مشاريع نتجاوز
    if (projectIds.length > 0) {
      const inList = `in.(${projectIds.map((x) => `"${x}"`).join(",")})`

      // update_photos (by update_id) — نجيب updates IDs أولاً
      const updatesRes = await fetch(
        `${SUPABASE_URL}/rest/v1/updates?select=id&project_id=${inList}`,
        { headers: { apikey: SERVICE_ROLE, Authorization: `Bearer ${SERVICE_ROLE}` } }
      )
      if (!updatesRes.ok) {
        const t = await updatesRes.text().catch(() => "")
        throw new Error(`get updates failed: ${updatesRes.status} ${t}`)
      }
      const updates = (await updatesRes.json().catch(() => [])) as Array<{ id: string }>
      const updateIds = updates.map((u) => u.id)

      if (updateIds.length > 0) {
        const updIn = `in.(${updateIds.map((x) => `"${x}"`).join(",")})`
        await sb(`update_photos?update_id=${updIn}`, { method: "DELETE" })
      }

      // باقي التوابع حسب project_id
      await sb(`project_comments?project_id=${inList}`, { method: "DELETE" }).catch(() => {})
      await sb(`project_milestones?project_id=${inList}`, { method: "DELETE" }).catch(() => {})
      await sb(`documents?project_id=${inList}`, { method: "DELETE" }).catch(() => {})
      await sb(`payments?project_id=${inList}`, { method: "DELETE" }).catch(() => {})
      await sb(`updates?project_id=${inList}`, { method: "DELETE" }).catch(() => {})

      // وأخيراً المشاريع نفسها
      await sb(`projects?id=${inList}`, { method: "DELETE" })
    }

    // 3) احذف otp_tokens الخاصة بالعميل (إذا عندك)
    await sb(`otp_tokens?client_id=eq.${encodeURIComponent(client_id)}`, { method: "DELETE" }).catch(() => {})

    // 4) احذف العميل
    await sb(`clients?id=eq.${encodeURIComponent(client_id)}`, { method: "DELETE" })

    return new Response(JSON.stringify({ ok: true, deleted_projects: projectIds.length }), {
      status: 200,
      headers: corsHeaders,
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Unknown error" }), {
      status: 500,
      headers: corsHeaders,
    })
  }
}