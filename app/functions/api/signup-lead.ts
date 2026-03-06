import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function onRequestPost(context: any) {
  try {
    const supabaseUrl = context.env?.SUPABASE_URL;
    const supabaseServiceRoleKey = context.env?.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = context.env?.RESEND_API_KEY;
    const fromEmail = context.env?.FROM_EMAIL;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return new Response(
        JSON.stringify({ error: "Missing Supabase environment variables." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!resendApiKey || !fromEmail) {
      return new Response(
        JSON.stringify({ error: "Missing email environment variables." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    const resend = new Resend(resendApiKey);

    const body = await context.request.json();

    const {
      email,
      name,
      phone,
      source,
      area,
      finishing_level,
      estimated_cost,
    } = body;

    if (!email || !name || !phone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const activationToken = crypto.randomUUID();
    const activateUrl = `https://pybcco.com/activate-account?token=${encodeURIComponent(
      activationToken
    )}`;

    const { error } = await supabase.from("signup_leads").insert({
      email,
      name,
      phone,
      source,
      area,
      finishing_level,
      estimated_cost,
      consumed: false,
      activated: false,
      activation_token: activationToken,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const areaText =
      area !== null && area !== undefined
        ? `<p><strong>المساحة:</strong> ${area} م²</p>`
        : "";

    const levelText = finishing_level
      ? `<p><strong>مستوى التشطيب:</strong> ${finishing_level}</p>`
      : "";

    const estimateText =
      estimated_cost !== null && estimated_cost !== undefined
        ? `<p><strong>التقدير التقريبي:</strong> ${Number(estimated_cost).toLocaleString(
            "en-US"
          )} ريال</p>`
        : "";

    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "فعّل حسابك الآن - PYBCCO",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.8;color:#111">
          <h2>مرحبًا ${name}</h2>
          <p>تم استلام طلب إنشاء الحساب بنجاح.</p>
          <p>اضغط الزر التالي لتفعيل حسابك:</p>

          <p style="margin:24px 0;">
            <a
              href="${activateUrl}"
              style="background:#eab308;color:#111;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;"
            >
              تفعيل الحساب
            </a>
          </p>

          ${areaText}
          ${levelText}
          ${estimateText}

          <hr style="margin:24px 0;border:none;border-top:1px solid #ddd" />

          <p><strong>مزايا الحساب:</strong></p>
          <ul>
            <li>خصم 2% على كامل عقد التشطيب</li>
            <li>ضمان إضافي 6 أشهر</li>
            <li>حفظ تقدير المشروع</li>
            <li>متابعة المشروع عبر بوابة العملاء</li>
          </ul>

          <p>بنيان الهرم للمقاولات - PYBCCO</p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Unknown error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}