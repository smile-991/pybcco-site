export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const body = await request.json().catch(() => null);

    const phone = String(body?.phone || "").trim();
    const area = Number(body?.area || 0);
    const finishing_level = String(body?.finishing_level || "").trim();
    const estimated_cost = Number(body?.estimated_cost || 0);
    const work_type = String(body?.work_type || "").trim();
    const extras_total = Number(body?.extras_total || 0);
    const base_total = Number(body?.base_total || 0);

    if (!phone) {
      return new Response(
        JSON.stringify({ error: "Phone is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!area || area <= 0) {
      return new Response(
        JSON.stringify({ error: "Area must be greater than zero" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!finishing_level) {
      return new Response(
        JSON.stringify({ error: "finishing_level is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const headers = {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    // 1) ابحث عن المستخدم عبر رقم الجوال
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
        JSON.stringify({
          error: "No activated user found for this phone",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = users[0];
    const userId = user.id;

    // 2) احفظ النتيجة في calculator_results
    const insertPayload = {
      user_id: userId,
      area,
      finishing_level,
      estimated_cost,
      work_type,
      extras_total,
      base_total,
    };

    const insertRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/calculator_results`,
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
          error: "Supabase error while saving calculator result",
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
        message: "Calculator result saved successfully",
        user,
        result: Array.isArray(inserted) ? inserted[0] : inserted,
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