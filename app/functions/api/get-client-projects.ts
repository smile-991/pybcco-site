export async function onRequestGet(context: any) {
  const { request, env } = context
  const cookie = request.headers.get("cookie") || ""

  // ✅ لازم يكون في session للعميل
  const match = cookie.match(/pybcco_client=([^;]+)/)
  if (!match) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  const accessToken = match[1]

  // ✅ headers للـ RLS
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    return new Response(JSON.stringify({ error: "Missing Supabase env" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
    apikey: env.SUPABASE_ANON_KEY,
    Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
    "x-client-token": accessToken,
  }

  // ✅ رجّع مشاريع العميل فقط
  // (بوجود RLS الصحيح على projects رح يرجّع بس تبع العميل)
  const res = await fetch(
    `${env.SUPABASE_URL}/rest/v1/projects?select=*&order=created_at.desc`,
    { headers }
  )

  const text = await res.text()
  let data: any = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = null
  }

  if (!res.ok) {
    return new Response(
      JSON.stringify({
        error: "Supabase error (projects)",
        status: res.status,
        details: data,
      }),
      { status: res.status, headers: { "Content-Type": "application/json" } }
    )
  }

  // ✅ لازم يرجّع Array
  return new Response(JSON.stringify(Array.isArray(data) ? data : []), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}