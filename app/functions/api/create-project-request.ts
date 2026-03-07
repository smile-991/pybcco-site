export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const body = await request.json().catch(() => null);

    const calculator_result_id = String(body?.calculator_result_id || "").trim();
    const phone = String(body?.phone || "").trim();
    const full_name = String(body?.full_name || "").trim();
    const district = String(body?.district || "").trim();
    const preferred_start_date = String(body?.preferred_start_date || "").trim();
    const has_drawings = Boolean(body?.has_drawings);
    const notes = String(body?.notes || "").trim();

    if (!calculator_result_id) {
      return new Response(
        JSON.stringify({ error: "calculator_result_id is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!phone) {
      return new Response(JSON.stringify({ error: "phone is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!district) {
      return new Response(JSON.stringify({ error: "district is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const headers = {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    // 1) ابحث عن المستخدم
    const userRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/users?phone=eq.${encodeURIComponent(
        phone
      )}&select=id,name,email,phone&limit=1`,
      { headers }
    );

    const users = await userRes.json().catch(() => null);

    if (!userRes.ok) {
      return new Response(
        JSON.stringify({
          error: "Supabase error while loading user",
          details: users,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!Array.isArray(users) || users.length === 0) {
      return new Response(
        JSON.stringify({ error: "No activated user found for this phone" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = users[0];

    // 2) اجلب التقدير المطلوب
    const resultRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/calculator_results?id=eq.${encodeURIComponent(
        calculator_result_id
      )}&user_id=eq.${user.id}&select=*`,
      { headers }
    );

    const results = await resultRes.json().catch(() => null);

    if (!resultRes.ok) {
      return new Response(
        JSON.stringify({
          error: "Supabase error while loading calculator result",
          details: results,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!Array.isArray(results) || results.length === 0) {
      return new Response(
        JSON.stringify({
          error: "Calculator result not found or does not belong to this user",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = results[0];

    const insertPayload = {
      user_id: user.id,
      calculator_result_id: result.id,
      full_name: full_name || user.name || null,
      phone,
      district,
      preferred_start_date: preferred_start_date || null,
      has_drawings,
      notes: notes || null,
      work_type: result.work_type || null,
      finishing_level: result.finishing_level || null,
      area: Number(result.area || 0),
      items_json: Array.isArray(result.items_json) ? result.items_json : [],
      grand_total: Number(result.grand_total || result.estimated_cost || 0),
      status: "new",
    };

    const insertRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/project_requests`,
      {
        method: "POST",
        headers: {
          ...headers,
          Prefer: "return=representation",
        },
        body: JSON.stringify(insertPayload),
      }
    );

    const inserted = await insertRes.json().catch(() => null);

    if (!insertRes.ok) {
      return new Response(
        JSON.stringify({
          error: "Supabase error while creating project request",
          details: inserted,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Project request created successfully",
        request: Array.isArray(inserted) ? inserted[0] : inserted,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error?.message || "Unexpected server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}