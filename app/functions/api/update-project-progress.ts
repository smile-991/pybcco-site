export async function onRequestOptions() {
  // عادةً مش ضروري بنفس الدومين، بس منخليه آمن لأي preflight
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PATCH,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

// ✅ نخلي نفس اللوجيك يشتغل للـ PATCH و POST
export const onRequestPatch = (context: any) => handle(context)
export const onRequestPost = (context: any) => handle(context)

async function handle(context: any) {
  const { request, env } = context

  try {
    // ✅ حماية الأدمن (نفس منطق ملفات create-update / create-project ...)
    const cookie = request.headers.get("cookie") || ""
    if (!cookie.includes("pybcco_admin=1")) {
      return json({ error: "Unauthorized" }, 401)
    }

    // ✅ Body
    const body = await request.json().catch(() => null)
    const project_id = body?.project_id || body?.id
    const progress_percent_raw = body?.progress_percent

    if (!project_id) {
      return json({ error: "project_id required" }, 400)
    }

    // ✅ sanitize progress
    let progress = Number(progress_percent_raw)
    if (!Number.isFinite(progress)) progress = 0
    progress = Math.max(0, Math.min(100, Math.round(progress)))

    // ✅ Supabase REST update
    const res = await fetch(
      `${env.SUPABASE_URL}/rest/v1/projects?id=eq.${encodeURIComponent(project_id)}`,
      {
        method: "PATCH",
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          progress_percent: progress,
          updated_at: new Date().toISOString(),
        }),
      }
    )

    const text = await res.text()
    let data: any = null
    try {
      data = text ? JSON.parse(text) : null
    } catch {
      data = text
    }

    if (!res.ok) {
      return json(
        {
          error: "Failed to update progress",
          status: res.status,
          details: data,
        },
        500
      )
    }

    // Supabase بيرجع array
    const updated = Array.isArray(data) ? data[0] : data

    return json(
      {
        ok: true,
        project_id,
        progress_percent: progress,
        project: updated || null,
      },
      200
    )
  } catch (err: any) {
    return json({ error: err?.message || "Server error" }, 500)
  }
}

function json(payload: any, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      // إذا بدك تضل strict نفس الدومين، فيك تشيل CORS headers
      "Access-Control-Allow-Origin": "*",
    },
  })
}