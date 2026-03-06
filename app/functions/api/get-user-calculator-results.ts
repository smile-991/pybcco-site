export async function onRequestGet(context: any) {
  const { request, env } = context;

  try {
    const phone = String(request.headers.get("x-user-phone") || "").trim();

    if (!phone) {
      return new Response(
        JSON.stringify({ error: "Phone is required" }),
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
          user: null,
          results: [],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = users[0];
    const userId = user.id;

    // 2) اجلب نتائج الحاسبة الخاصة بالمستخدم
    const resultsRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/calculator_results?user_id=eq.${userId}&order=created_at.desc&select=*`,
      { headers }
    );

    const results = await resultsRes.json().catch(() => []);

    if (!resultsRes.ok) {
      return new Response(
        JSON.stringify({
          error: "Supabase error while loading calculator results",
          details: results,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        user,
        results: Array.isArray(results) ? results : [],
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