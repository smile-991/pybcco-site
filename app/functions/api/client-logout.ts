export async function onRequestPost() {
  // نمسح الكوكي فوراً
  const cookie = [
    "pybcco_client=",
    "HttpOnly",
    "Secure",
    "Path=/",
    "SameSite=Strict",
    "Max-Age=0",
  ].join("; ")

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookie,
    },
  })
}