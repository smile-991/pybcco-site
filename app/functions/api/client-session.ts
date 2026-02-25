export async function onRequestGet(context: any) {
  const { request } = context
  const cookie = request.headers.get("cookie") || ""

  const match = cookie.match(/pybcco_client=([^;]+)/)

  if (!match) {
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