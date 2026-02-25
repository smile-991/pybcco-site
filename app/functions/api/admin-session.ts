export async function onRequestGet(context: any) {
  const { request } = context
  const cookie = request.headers.get("cookie") || ""

  if (!cookie.includes("pybcco_admin=1")) {
    return new Response(
      JSON.stringify({ authorized: false }),
      { status: 401 }
    )
  }

  return new Response(
    JSON.stringify({ authorized: true }),
    { status: 200 }
  )
}