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

    const normalizedPhone = String(phone).trim();
    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedName = String(name).trim();

    const buildAndSendActivationEmail = async ({
      toEmail,
      toName,
      token,
      areaValue,
      finishingLevelValue,
      estimatedCostValue,
    }: {
      toEmail: string;
      toName: string;
      token: string;
      areaValue?: number | null;
      finishingLevelValue?: string | null;
      estimatedCostValue?: number | null;
    }) => {
      const activateUrl = `https://pybcco.com/activate-account?token=${encodeURIComponent(
        token
      )}`;

      const areaText =
        areaValue !== null && areaValue !== undefined
          ? `<p><strong>المساحة:</strong> ${areaValue} م²</p>`
          : "";

      const levelText = finishingLevelValue
        ? `<p><strong>مستوى التشطيب:</strong> ${finishingLevelValue}</p>`
        : "";

      const estimateText =
        estimatedCostValue !== null && estimatedCostValue !== undefined
          ? `<p><strong>التقدير التقريبي:</strong> ${Number(
              estimatedCostValue
            ).toLocaleString("en-US")} ريال</p>`
          : "";

      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: "فعّل حسابك الآن - PYBCCO",
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.8;color:#111">
            <h2>مرحبًا ${toName}</h2>
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

      return activateUrl;
    };

    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("id, email, name, phone")
      .eq("phone", normalizedPhone)
      .maybeSingle();

    if (existingUserError) {
      return new Response(
        JSON.stringify({ error: existingUserError.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { data: existingLead, error: existingLeadError } = await supabase
      .from("signup_leads")
      .select(
        "id, email, name, phone, source, area, finishing_level, estimated_cost, activated, consumed"
      )
      .eq("phone", normalizedPhone)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existingLeadError) {
      return new Response(
        JSON.stringify({ error: existingLeadError.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (existingUser || (existingLead && existingLead.activated === false)) {
      const activationToken = crypto.randomUUID();

      if (existingLead) {
        const { error: updateLeadError } = await supabase
          .from("signup_leads")
          .update({
            activation_token: activationToken,
            email: normalizedEmail,
            name: normalizedName,
            source,
            area,
            finishing_level,
            estimated_cost,
            consumed: false,
          })
          .eq("id", existingLead.id);

        if (updateLeadError) {
          return new Response(
            JSON.stringify({ error: updateLeadError.message }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      } else {
        const { error: insertLeadError } = await supabase
          .from("signup_leads")
          .insert({
            email: normalizedEmail,
            name: normalizedName,
            phone: normalizedPhone,
            source,
            area,
            finishing_level,
            estimated_cost,
            consumed: false,
            activated: false,
            activation_token: activationToken,
          });

        if (insertLeadError) {
          return new Response(
            JSON.stringify({ error: insertLeadError.message }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      }

      await buildAndSendActivationEmail({
        toEmail: normalizedEmail,
        toName: normalizedName,
        token: activationToken,
        areaValue: area,
        finishingLevelValue: finishing_level,
        estimatedCostValue: estimated_cost,
      });

      return new Response(
        JSON.stringify({
          success: false,
          alreadyRegistered: true,
          resendActivation: true,
          message:
            `رقم الجوال ${normalizedPhone} لديه حساب مسجل بالفعل. ` +
            `تم إرسال رابط تفعيل جديد إلى بريدك الإلكتروني.`,
        }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const activationToken = crypto.randomUUID();

    const { error: insertError } = await supabase.from("signup_leads").insert({
      email: normalizedEmail,
      name: normalizedName,
      phone: normalizedPhone,
      source,
      area,
      finishing_level,
      estimated_cost,
      consumed: false,
      activated: false,
      activation_token: activationToken,
    });

    if (insertError) {
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    await buildAndSendActivationEmail({
      toEmail: normalizedEmail,
      toName: normalizedName,
      token: activationToken,
      areaValue: area,
      finishingLevelValue: finishing_level,
      estimatedCostValue: estimated_cost,
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