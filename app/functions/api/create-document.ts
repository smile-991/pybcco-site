export const onRequest = async (context: any) => {
  const { request, env } = context

  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,x-client-token",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json",
    Vary: "Origin",
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: corsHeaders,
    })
  }

  // safe json helper
  const safeJson = async (res: Response) => {
    const t = await res.text()
    if (!t) return null
    try {
      return JSON.parse(t)
    } catch {
      return { raw: t }
    }
  }

  try {
    const body = await request.json().catch(() => ({}))

    const project_id = String(body.project_id || "").trim()
    const title = String(body.title || "").trim()
    const file_url = String(body.file_url || "").trim()

    // ✅ type validation (accept type or doc_type)
    const allowed = new Set(["contract", "invoices", "receipts", "offers", "other"])
    const rawType = String(body.type ?? body.doc_type ?? "other")
      .trim()
      .toLowerCase()

    const type = allowed.has(rawType) ? rawType : "other"

    if (!project_id || !file_url) {
      return new Response(JSON.stringify({ error: "project_id and file_url are required" }), {
        status: 400,
        headers: corsHeaders,
      })
    }

    const ins = await fetch(`${env.SUPABASE_URL}/rest/v1/documents`, {
      method: "POST",
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        project_id,
        title: title || type,
        type,     // ✅ will be contract/invoices/receipts/offers/other
        file_url,
      }),
    })

    const json = await safeJson(ins)

    if (!ins.ok) {
      return new Response(
        JSON.stringify({
          error: "Insert failed",
          status: ins.status,
          details: json,
        }),
        { status: 500, headers: corsHeaders }
      )
    }

    return new Response(JSON.stringify({ ok: true, item: (json as any)?.[0] || json }), {
      status: 200,
      headers: corsHeaders,
    })
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: e?.message || String(e),
      }),
      { status: 500, headers: corsHeaders }
    )
  }
}