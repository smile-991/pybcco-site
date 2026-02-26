export const onRequest = async (context: any) => {
  const { request, env } = context

  // ---------- Shared headers ----------
  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  }

  // ---------- CORS / Preflight ----------
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    })
  }

  // ---------- Allow PATCH (and POST fallback) ----------
  const method = request.method.toUpperCase()
  if (method !== "PATCH" && method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: corsHeaders,
    })
  }

  try {
    // ---------- Admin auth ----------
    const cookie = request.headers.get("cookie") || ""
    if (!cookie.includes("pybcco_admin=1")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: corsHeaders,
      })
    }

    // ---------- Read body safely ----------
    const rawText = await request.text()
    let body: any = {}
    if (rawText) {
      try {
        body = JSON.parse(rawText)
      } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
          status: 400,
          headers: corsHeaders,
        })
      }
    }

    // Accept multiple naming styles
    const projectId = String(body.project_id || body.id || "").trim()
    const progressRaw = body.progress_percent ?? body.progress ?? body.value

    if (!projectId) {
      return new Response(JSON.stringify({ error: "project_id is required" }), {
        status: 400,
        headers: corsHeaders,
      })
    }

    // ---------- Normalize progress ----------
    let progress = Number(progressRaw)
    if (Number.isNaN(progress)) progress = 0
    progress = Math.max(0, Math.min(100, Math.round(progress)))

    // ---------- Supabase REST update ----------
    // ⚠️ IMPORTANT: table name here assumed "projects"
    // إذا جدولك اسمه غير هيك (مثلاً portal_projects) غيّره هون.
    const url =
      `${env.SUPABASE_URL}/rest/v1/projects` +
      `?id=eq.${encodeURIComponent(projectId)}`

    const supaRes = await fetch(url, {
      method: "PATCH",
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        progress_percent: progress,
        // ✅ removed updated_at لأن العمود غير موجود بجدول projects
      }),
    })

    const supaText = await supaRes.text()
    let supaJson: any = null
    try {
      supaJson = supaText ? JSON.parse(supaText) : null
    } catch {
      supaJson = supaText
    }

    if (!supaRes.ok) {
      // رجّع سبب الخطأ الحقيقي بدل 500 مبهم
      return new Response(
        JSON.stringify({
          error: "Supabase update failed",
          status: supaRes.status,
          details: supaJson,
        }),
        {
          status: 500,
          headers: corsHeaders,
        }
      )
    }

    // Success
    return new Response(
      JSON.stringify({
        ok: true,
        project_id: projectId,
        progress_percent: progress,
        data: supaJson,
      }),
      {
        status: 200,
        headers: corsHeaders,
      }
    )
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: err?.message || String(err),
      }),
      { status: 500, headers: corsHeaders }
    )
  }
}