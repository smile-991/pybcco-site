export const onRequestPost = async ({ request, env }: any) => {
  try {
    const body = await request.json();

    const name = body.name || "";
    const phone = body.phone || "";
    const email = body.email || "";
    const service = body.service || "";
    const message = body.message || "";

    if (!name || !phone || !message) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing fields" }),
        { status: 400 }
      );
    }

    const text =
      `رسالة جديدة من موقع PYBCCO\n\n` +
      `الاسم: ${name}\n` +
      `الجوال: ${phone}\n` +
      `البريد: ${email || "-"}\n` +
      `نوع الخدمة: ${service || "-"}\n\n` +
      `الرسالة:\n${message}\n`;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `PYBCCO Website <${env.MAIL_FROM}>`,
        to: [env.MAIL_TO],
        subject: `رسالة جديدة من الموقع - ${name}`,
        reply_to: email || undefined,
        text,
      }),
    });

    if (!resp.ok) {
      return new Response(
        JSON.stringify({ ok: false }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false }),
      { status: 500 }
    );
  }
};
