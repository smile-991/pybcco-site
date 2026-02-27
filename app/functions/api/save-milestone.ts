// app/functions/api/save-milestone.ts
// Cloudflare Pages Function: POST /api/save-milestone
// Admin-only: inserts a milestone row into Supabase table `project_milestones` (or `project_milestones` per your SQL).

function json(status: number, body: any, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  })
}

function isUuid(v: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v)
}

// Accepts:
// - "YYYY-MM-DD" (kept as-is)
// - "DD/MM" or "D/M"  -> uses current year
// - "DD/MM/YYYY"      -> converted to YYYY-MM-DD
// - empty             -> null
function normalizeDate(input: any): string | null {
  const s = String(input || "").trim()
  if (!s) return null

  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s

  // DD/MM/YYYY or D/M/YYYY
  let m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/)
  if (m) {
    const dd = m[1].padStart(2, "0")
    const mm = m[2].padStart(2, "0")
    const yyyy = m[3]
    return `${yyyy}-${mm}-${dd}`
  }

  // DD/MM or D/M (assume day/month)
  m = s.match(/^(\d{1,2})[\/\-](\d{1,2})$/)
  if (m) {
    const dd = m[1].padStart(2, "0")
    const mm = m[2].padStart(2, "0")
    const yyyy = String(new Date().getFullYear())
    return `${yyyy}-${mm}-${dd}`
  }

  return null
}

function toInt(v: any, fallback = 0) {
  const n = Number(v)
  return Number.isFinite(n) ? Math.trunc(n) : fallback
}

function toNumOrNull(v: any): number | null {
  if (v === null || v === undefined) return null
  const s = String(v).trim()
  if (!s) return null
  const n = Number(s)
  return Number.isFinite(n) ? n : null
}

export async function onRequestOptions() {
  // same-origin usually, but keep permissive preflight for safety
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-store",
    },
  })
}

export async function onRequestPost(context: any) {
  try {
    const { request, env } = context
    const cookie = request.headers.get("cookie") || ""

    // Admin-only cookie (same logic as /api/admin-session)
    const isAdmin = cookie.includes("pybcco_admin=1")
    if (!isAdmin) return json(401, { error: "Unauthorized" })

    if (!env.SUPABASE_URL) return json(500, { error: "Missing SUPABASE_URL" })
    if (!env.SUPABASE_SERVICE_ROLE_KEY) return json(500, { error: "Missing SUPABASE_SERVICE_ROLE_KEY" })

    const body = await request.json().catch(() => null)
    if (!body) return json(400, { error: "Invalid JSON body" })

    const project_id = String(body.project_id || "").trim()
    const title = String(body.title || "").trim()
    const percentage = toInt(body.percentage, -1)
    const note = String(body.note || "").trim() || null
    const due_amount = toNumOrNull(body.due_amount)
    const due_date = normalizeDate(body.due_date)

    if (!project_id || !isUuid(project_id)) return json(400, { error: "Invalid project_id" })
    if (!title) return json(400, { error: "title required" })
    if (percentage < 0 || percentage > 100) return json(400, { error: "percentage must be 0..100" })

    // Prepare insert row (match your SQL columns)
    // Expected columns per your script: project_id, percentage, title, note, due_amount, due_date, is_done, done_at, sort_order, created_at
    const row: Record<string, any> = {
      project_id,
      percentage,
      title,
      note,
      due_amount,
      due_date,
      // is_done defaults false in DB
    }

    // Insert
    const sbHeaders: Record<string, string> = {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }

    const insertRes = await fetch(`${env.SUPABASE_URL}/rest/v1/project_milestones`, {
      method: "POST",
      headers: sbHeaders,
      body: JSON.stringify(row),
    })

    const txt = await insertRes.text()
    let data: any = null
    try {
      data = txt ? JSON.parse(txt) : null
    } catch {
      data = txt || null
    }

    if (!insertRes.ok) {
      return json(insertRes.status, {
        error: "Supabase insert failed",
        status: insertRes.status,
        details: data,
        sent: row,
      })
    }

    return json(200, { ok: true, milestone: Array.isArray(data) ? data[0] : data })
  } catch (e: any) {
    return json(500, { error: "Server error", details: String(e?.message || e) })
  }
}
