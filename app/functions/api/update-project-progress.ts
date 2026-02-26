export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    // ✅ 1) Check Admin Session Cookie
    const cookie = request.headers.get("cookie") || "";

    if (!cookie.includes("pybcco_admin=1")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      );
    }

    // ✅ 2) Parse Body
    let body: any = null;

    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400 }
      );
    }

    const project_id = body?.project_id;
    const progress_raw = body?.progress_percent;

    if (!project_id) {
      return new Response(
        JSON.stringify({ error: "project_id required" }),
        { status: 400 }
      );
    }

    // ✅ 3) Normalize Progress 0–100
    const progress_percent = Math.max(
      0,
      Math.min(100, Math.round(Number(progress_raw)))
    );

    if (Number.isNaN(progress_percent)) {
      return new Response(
        JSON.stringify({ error: "progress_percent must be number" }),
        { status: 400 }
      );
    }

    // ✅ 4) Update Supabase (Service Role Required)
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
        body: JSON.stringify({ progress_percent }),
      }
    );

    const text = await supaRes.text();
    let data: any = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!supaRes.ok) {
      return new Response(
        JSON.stringify({
          error: "Supabase update failed",
          status: supaRes.status,
          details: data,
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        progress_percent,
        data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: "Server error",
        details: err?.message || err,
      }),
      { status: 500 }
    );
  }
}