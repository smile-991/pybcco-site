export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const body = await request.json().catch(() => null);

    const result_id = String(body?.result_id || "").trim();
    const phone = String(body?.phone || "").trim();
    const item_index = Number(body?.item_index);

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

    if (!Number.isInteger(item_index) || item_index < 0) {
      return new Response(JSON.stringify({ error: "Valid item_index is required" }), {
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

    // 2) اجلب التقدير وتأكد أنه يخص نفس المستخدم
    const resultRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/calculator_results?id=eq.${encodeURIComponent(
        result_id
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
    const oldItems = Array.isArray(result?.items_json) ? result.items_json : [];

    if (item_index >= oldItems.length) {
      return new Response(JSON.stringify({ error: "item_index out of range" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newItems = oldItems.filter((_: any, index: number) => index !== item_index);

    const newExtrasTotal = newItems.reduce((sum: number, item: any) => {
      return sum + Number(item?.total || 0);
    }, 0);

    const baseTotal = Number(result?.base_total || 0);
    const newGrandTotal = baseTotal + newExtrasTotal;

    const updatePayload = {
      items_json: newItems,
      extras_total: newExtrasTotal,
      grand_total: newGrandTotal,
      estimated_cost: newGrandTotal,
    };

    const updateRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/calculator_results?id=eq.${encodeURIComponent(
        result_id
      )}&user_id=eq.${user.id}`,
      {
        method: "PATCH",
        headers: {
          ...headers,
          Prefer: "return=representation",
        },
        body: JSON.stringify(updatePayload),
      }
    );

    const updated = await updateRes.json().catch(() => null);

    if (!updateRes.ok) {
      return new Response(
        JSON.stringify({
          error: "Supabase error while updating calculator result",
          details: updated,
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
        message: "Calculator result updated successfully",
        result: Array.isArray(updated) ? updated[0] : updated,
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