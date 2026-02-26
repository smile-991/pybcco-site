import { useEffect, useMemo, useState } from "react"

type CommentRow = {
  id: string
  project_id: string
  sender_role: "client" | "admin"
  message: string
  created_at: string
}

function formatDate(ts: string) {
  try {
    const d = new Date(ts)
    return d.toLocaleString("ar-SA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return ts
  }
}

export default function ProjectCommentsClient({
  projectId,
  clientToken,
}: {
  projectId: string
  clientToken: string
}) {
  const [items, setItems] = useState<CommentRow[]>([])
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const canSend = useMemo(() => message.trim().length >= 2, [message])

  async function load() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/get-project-comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-token": clientToken,
        },
        body: JSON.stringify({ project_id: projectId }),
      })
      const json = await res.json().catch(() => null)

      if (!res.ok) {
        setError(json?.error || "تعذر تحميل التعليقات")
        setItems([])
        return
      }

      setItems(Array.isArray(json?.items) ? json.items : [])
    } catch (e: any) {
      setError(e?.message || "خطأ غير متوقع")
    } finally {
      setLoading(false)
    }
  }

  async function send() {
    if (!canSend) return
    setSending(true)
    setError("")
    try {
      const res = await fetch("/api/post-client-comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-token": clientToken,
        },
        body: JSON.stringify({
          project_id: projectId,
          message: message.trim(),
        }),
      })
      const json = await res.json().catch(() => null)

      if (!res.ok) {
        setError(json?.error || "تعذر إرسال التعليق")
        return
      }

      // optimistic append
      const newItem: CommentRow | undefined = json?.item
      if (newItem?.id) setItems((prev) => [...prev, newItem])
      setMessage("")
    } catch (e: any) {
      setError(e?.message || "خطأ غير متوقع")
    } finally {
      setSending(false)
    }
  }

  useEffect(() => {
    if (projectId && clientToken) load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, clientToken])

  return (
    <div className="mt-4 rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold">💬 تعليقات على المشروع</div>
        <button
          onClick={load}
          className="text-xs rounded-lg border px-3 py-1 hover:bg-gray-50"
          disabled={loading}
          type="button"
        >
          {loading ? "جارِ التحديث..." : "تحديث"}
        </button>
      </div>

      {error ? (
        <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-2 text-xs text-red-700">
          {error}
        </div>
      ) : null}

      <div className="max-h-56 overflow-auto rounded-xl border bg-gray-50 p-3">
        {items.length === 0 ? (
          <div className="text-xs text-gray-500">
            لا توجد تعليقات بعد. اكتب ملاحظتك هنا وسنرد عليك.
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((c) => {
              const isClient = c.sender_role === "client"
              return (
                <div
                  key={c.id}
                  className={`flex ${isClient ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                      isClient
                        ? "bg-yellow-100 border border-yellow-200"
                        : "bg-white border"
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {c.message}
                    </div>
                    <div className="mt-1 text-[11px] text-gray-500">
                      {isClient ? "أنت" : "إدارة بنيان الهرم"} • {formatDate(c.created_at)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="اكتب تعليقك هنا…"
          className="min-h-[42px] w-full resize-none rounded-xl border p-2 text-sm outline-none focus:ring-2 focus:ring-yellow-200"
        />
        <button
          onClick={send}
          disabled={!canSend || sending}
          className="rounded-xl bg-yellow-500 px-4 text-sm font-semibold text-black hover:bg-yellow-600 disabled:opacity-50"
          type="button"
        >
          {sending ? "إرسال..." : "إرسال"}
        </button>
      </div>

      <div className="mt-2 text-[11px] text-gray-500">
        * يُسمح بالتعليقات النصية فقط، وسيتم الرد من لوحة الإدارة.
      </div>
    </div>
  )
}