export const onRequestPost = async (context: any) => {
  try {
    const { request, env } = context

    // تحقق من جلسة الأدمن
    const cookie = request.headers.get("cookie") || ""
    if (!cookie.includes("pybcco_admin=1")) {
      return new Response("Unauthorized", { status: 401 })
    }

    const formData = await request.formData()

    const file = formData.get("file") as File
    const projectId = formData.get("project_id") as string
    const type = formData.get("type") as string // "document" | "update-photo"

    if (!file || !projectId || !type) {
      return new Response("Missing fields", { status: 400 })
    }

    const SUPABASE_URL = env.SUPABASE_URL
    const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY

    // إنشاء اسم عشوائي للملف
    const ext = file.name.split(".").pop()
    const fileName = crypto.randomUUID() + "." + ext

    let path = ""

    if (type === "document") {
      path = `projects/${projectId}/docs/${fileName}`
    } else if (type === "update-photo") {
      path = `projects/${projectId}/updates/${fileName}`
    } else {
      return new Response("Invalid type", { status: 400 })
    }

    const uploadRes = await fetch(
      `${SUPABASE_URL}/storage/v1/object/portal/${path}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SERVICE_KEY}`,
          "Content-Type": file.type
        },
        body: file
      }
    )

    if (!uploadRes.ok) {
      const errText = await uploadRes.text()
      return new Response(errText, { status: 500 })
    }

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/portal/${path}`

    return new Response(JSON.stringify({ url: publicUrl }), {
      headers: { "Content-Type": "application/json" }
    })

  } catch (err: any) {
    return new Response(err.message, { status: 500 })
  }
}