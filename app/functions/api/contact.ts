export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    const body = await request.json().catch(() => null);

    console.log("ENV CHECK:", {
      hasKey: !!env.RESEND_API_KEY,
      mailFrom: env.MAIL_FROM,
      mailTo: env.MAIL_TO,
    });

    if (!body) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { name, email, phone, service, message } = body;

    if (!env.RESEND_API_KEY || !env.MAIL_FROM || !env.MAIL_TO) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing env vars (RESEND_API_KEY/MAIL_FROM/MAIL_TO)" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const payload = {
      from: env.MAIL_FROM,
      to: [env.MAIL_TO],
      subject: `PYBCCO Contact: ${service || "General"} - ${name || "No Name"}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`,
    };

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const t = await r.text();
    console.log("RESEND RESPONSE:", r.status, t);

    if (!r.ok) {
      return new Response(JSON.stringify({ ok: false, error: "Resend failed", status: r.status, detail: t }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.log("FUNCTION ERROR:", e?.message || e);
    return new Response(JSON.stringify({ ok: false, error: e?.message || "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
