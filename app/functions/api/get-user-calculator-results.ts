export async function onRequestGet(context: any) {
  const { request, env } = context;

  try {
    const phone = String(request.headers.get("x-user-phone") || "").trim();

    if (!phone) {
      return new Response(JSON.stringify({ error: "Phone is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
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

    const normalizedResults = Array.isArray(results)
      ? results.map((row: any) => {
          const base_total = Number(row?.base_total || 0);
          const extras_total = Number(row?.extras_total || 0);
          const estimated_cost = Number(row?.estimated_cost || 0);
          const grand_total =
            Number(row?.grand_total || 0) > 0
              ? Number(row?.grand_total || 0)
              : estimated_cost > 0
              ? estimated_cost
              : base_total + extras_total;

          return {
            ...row,
            area: Number(row?.area || 0),
            estimated_cost,
            base_total,
            extras_total,
            grand_total,
            work_type: row?.work_type || "",
            items_json: Array.isArray(row?.items_json) ? row.items_json : [],
          };
        })
      : [];

    return new Response(
      JSON.stringify({
        user,
        results: normalizedResults,
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