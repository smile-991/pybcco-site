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

    try {
  const requestRow = Array.isArray(inserted) ? inserted[0] : inserted;

  const safePhone = phone || "-";
  const safeArea = Number(result.area || 0);
  const safeWorkType = result.work_type || "-";
  const safeFinishingLevel = result.finishing_level || "-";
  const safeGrandTotal = Number(result.grand_total || result.estimated_cost || 0);
  const safeDistrict = district || "-";
  const safeFullName = full_name || user.name || "-";
  const safePreferredStart = preferred_start_date || "-";
  const safeHasDrawings = has_drawings ? "نعم" : "لا";
  const safeNotes = notes || "لا يوجد";

  const itemsHtml = Array.isArray(result.items_json) && result.items_json.length > 0
    ? `
      <table style="width:100%;border-collapse:collapse;margin-top:12px">
        <thead>
          <tr>
            <th style="border:1px solid #ddd;padding:8px;background:#f8f8f8">البند</th>
            <th style="border:1px solid #ddd;padding:8px;background:#f8f8f8">الكمية</th>
            <th style="border:1px solid #ddd;padding:8px;background:#f8f8f8">الوحدة</th>
            <th style="border:1px solid #ddd;padding:8px;background:#f8f8f8">الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          ${result.items_json
            .map(
              (item: any) => `
                <tr>
                  <td style="border:1px solid #ddd;padding:8px">${item?.title || "-"}</td>
                  <td style="border:1px solid #ddd;padding:8px">${Number(item?.quantity || 0)}</td>
                  <td style="border:1px solid #ddd;padding:8px">${item?.unit || "-"}</td>
                  <td style="border:1px solid #ddd;padding:8px">${Number(item?.total || 0)} ريال</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `
    : `<p>لا توجد بنود تفصيلية.</p>`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: [env.MAIL_TO],
      subject: "طلب مشروع جديد من موقع PYBCCO",
      html: `
        <div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.9;color:#111">
          <h2>تم إرسال طلب مشروع جديد من الموقع</h2>

          <p><strong>رقم الطلب:</strong> ${requestRow?.id || "-"}</p>
          <p><strong>الاسم:</strong> ${safeFullName}</p>
          <p><strong>رقم الجوال:</strong> ${safePhone}</p>
          <p><strong>الحي / الموقع:</strong> ${safeDistrict}</p>
          <p><strong>موعد التنفيذ المتوقع:</strong> ${safePreferredStart}</p>
          <p><strong>هل يوجد مخططات؟</strong> ${safeHasDrawings}</p>
          <p><strong>نوع العمل:</strong> ${safeWorkType}</p>
          <p><strong>مستوى التشطيب:</strong> ${safeFinishingLevel}</p>
          <p><strong>المساحة:</strong> ${safeArea} م²</p>
          <p><strong>الإجمالي التقديري:</strong> ${safeGrandTotal} ريال</p>
          <p><strong>الملاحظات:</strong> ${safeNotes}</p>

          <hr style="margin:20px 0" />

          <h3>البنود التفصيلية</h3>
          ${itemsHtml}

          <hr style="margin:20px 0" />

          <p>تم إرسال هذا الطلب من خلال صفحة طلب تنفيذ المشروع على موقع PYBCCO.</p>
        </div>
      `,
    }),
  });
} catch (mailError) {
  console.error("Resend email error:", mailError);
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