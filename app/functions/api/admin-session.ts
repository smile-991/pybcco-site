export async function onRequestGet(context: any) {
  const { request } = context
  const cookie = request.headers.get("cookie") || ""

  const isAuthed = cookie.includes("pybcco_admin=1")

  return new Response(JSON.stringify({ authorized: isAuthed }), {
    status: isAuthed ? 200 : 401,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  })
}