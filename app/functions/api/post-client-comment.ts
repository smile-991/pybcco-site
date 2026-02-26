export const onRequest = async (context: any) => {
  const { request, env } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,x-client-token",
    "Content-Type": "application/json",
  };

  // Preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Allow POST only
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const clientToken = request.headers.get("x-client-token") || "";
    if (!clientToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    const body = await request.json().catch(() => ({}));
    const projectId = String(body.project_id || "").trim();
    const message = String(body.message || "").trim();

    if (!projectId || !message) {
      return new Response(
        JSON.stringify({ error: "project_id and message are required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 1) Find client by token
    const cRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/clients?access_token=eq.${encodeURIComponent(
        clientToken
      )}&select=id`,
      {
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    );

    const c = await cRes.json().catch(() => []);
    const clientId = c?.[0]?.id;
    if (!clientId) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    // 2) Verify project belongs to this client
    const pRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/projects?id=eq.${encodeURIComponent(
        projectId
      )}&client_id=eq.${encodeURIComponent(clientId)}&select=id`,
      {
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    );

    const p = await pRes.json().catch(() => []);
    if (!p?.[0]?.id) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: corsHeaders,
      });
    }

    // 3) Insert comment
    const ins = await fetch(`${env.SUPABASE_URL}/rest/v1/project_comments`, {
      method: "POST",
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        project_id: projectId,
        sender_role: "client",
        message,
      }),
    });

    const txt = await ins.text();
    const json = txt ? JSON.parse(txt) : null;

    if (!ins.ok) {
      return new Response(
        JSON.stringify({ error: "Insert failed", status: ins.status, details: json }),
        { status: 500, headers: corsHeaders }
      );
    }

    return new Response(JSON.stringify({ ok: true, item: json?.[0] || json }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: "Internal Server Error", message: e?.message || String(e) }),
      { status: 500, headers: corsHeaders }
    );
  }
};