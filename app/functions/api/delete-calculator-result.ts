export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const body = await request.json().catch(() => null);

    const result_id = String(body?.result_id || "").trim();
    const phone = String(body?.phone || "").trim();

    if (!result_id) {
      return new Response(JSON.stringify({ error: "result_id is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!phone) {
      return new Response(JSON.stringify({ error: "phone is required" }), {
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

    // 1) ابحث عن المستخدم عبر الجوال
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

    // 2) تأكد أن التقدير يخص نفس المستخدم
    const resultRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/calculator_results?id=eq.${encodeURIComponent(
        result_id
      )}&user_id=eq.${user.id}&select=id`,
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

    const deleteRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/calculator_results?id=eq.${encodeURIComponent(
        result_id
      )}&user_id=eq.${user.id}`,
      {
        method: "DELETE",
        headers: {
          ...headers,
          Prefer: "return=representation",
        },
      }
    );

    const deleted = await deleteRes.json().catch(() => null);

    if (!deleteRes.ok) {
      return new Response(
        JSON.stringify({
          error: "Supabase error while deleting calculator result",
          details: deleted,
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
        message: "Calculator result deleted successfully",
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