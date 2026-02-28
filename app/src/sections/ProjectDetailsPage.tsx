import { useEffect, useMemo, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import ProjectCommentsClient from "@/sections/ProjectCommentsClient"

type AnyObj = Record<string, any>

function formatDate(value?: string) {
  if (!value) return "-"
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

function money(n: any) {
  const x = Number(n || 0)
  return new Intl.NumberFormat("ar-SA").format(x)
}

function toInt(n: any, fallback = 0) {
  const x = Number(n)
  return Number.isFinite(x) ? Math.trunc(x) : fallback
}

function clamp0to100(n: any) {
  const x = Number(n)
  if (!Number.isFinite(x)) return 0
  return Math.min(Math.max(x, 0), 100)
}

function badgeForMilestone(isDone: boolean) {
  return isDone ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
}

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState<AnyObj | null>(null)
  const [loading, setLoading] = useState(true)
  const [imgOpen, setImgOpen] = useState<string | null>(null)

  // ✅ token من localStorage (للتعليقات فقط)
  const [clientToken, setClientToken] = useState(
    localStorage.getItem("pybcco_client_token") || ""
  )

  // ✅ إذا ما في token، نحاول نجيبه من session بدل redirect
  useEffect(() => {
    if (clientToken) return

    fetch("/api/client-session", { credentials: "include" })
      .then(async (r) => (r.ok ? r.json().catch(() => null) : null))
      .then((sess) => {
        const t = String(sess?.client_token || sess?.access_token || "").trim()
        if (t) {
          localStorage.setItem("pybcco_client_token", t)
          setClientToken(t)
        }
      })
      .catch(() => {})
  }, [clientToken])

  useEffect(() => {
    if (!id) return

    setLoading(true)

    fetch(`/api/get-project-details?id=${id}`, {
      credentials: "include",
    })
      .then(async (res) => {
        // ✅ لو انتهت الجلسة/غير مصرح
        if (res.status === 401 || res.status === 403) {
          navigate("/portal", { replace: true })
          return null
        }

        if (!res.ok) return null
        return await res.json().catch(() => null)
      })
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch(() => {
        setData(null)
        setLoading(false)
      })
  }, [id, navigate])

  // ✅ KEEP HOOK ORDER STABLE
  const project = data?.project
  const payments = Array.isArray(data?.payments) ? data!.payments : []
  const documents = Array.isArray(data?.documents) ? data!.documents : []
  const updates = Array.isArray(data?.updates) ? data!.updates : []
  const updatePhotos = Array.isArray(data?.update_photos) ? data!.update_photos : []
  const milestones = Array.isArray(data?.milestones) ? data!.milestones : []

  const docsByType = useMemo(() => {
    const groups: Record<string, any[]> = {
      contract: [],
      offer: [],
      invoice: [],
      receipt: [],
      other: [],
    }

    for (const d of documents) {
      const t = String(d.type || "other").toLowerCase()
      if (groups[t]) groups[t].push(d)
      else groups.other.push(d)
    }

    return groups
  }, [documents])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        Loading...
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <p>Project not found</p>
        <button
          onClick={() => navigate("/portal")}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Back to Projects
        </button>
      </div>
    )
  }

  // ✅ Milestone-based progress (يحمي من خلاف "نسبة عشوائية")
  const normalizedMilestones = milestones
    .map((m: any) => ({
      ...m,
      percentage: toInt(m.percentage, 0),
      is_done: !!m.is_done,
    }))
    .sort((a: any, b: any) => a.percentage - b.percentage)

  const milestoneProgress = normalizedMilestones.reduce((max: number, m: any) => {
    if (m.is_done) return Math.max(max, toInt(m.percentage, 0))
    return max
  }, 0)

  const shownProgressRaw =
    normalizedMilestones.length > 0 ? milestoneProgress : toInt(project.progress_percent, 0)

  const shownProgress = clamp0to100(shownProgressRaw)

  const currentMilestone = normalizedMilestones.find((m: any) => !m.is_done) || null
  const nextMilestonePct = currentMilestone
    ? clamp0to100(toInt(currentMilestone.percentage, 0))
    : null

  // ✅ شريط أصفر يمثل "المرحلة القادمة" من نهاية الأخضر إلى نسبة المرحلة القادمة
  const yellowWidth =
    nextMilestonePct != null ? clamp0to100(Math.max(0, nextMilestonePct - shownProgress)) : 0

  const total = Number(project.total_amount) || 0
  const paid = payments.reduce((sum: number, p: any) => sum + Number(p.amount || 0), 0)
  const remaining = total - paid
  const paymentPercent = total > 0 ? Math.min((paid / total) * 100, 100) : 0

  const statusLabel =
    project.status === "active"
      ? "Active"
      : project.status === "completed"
      ? "Completed"
      : project.status === "on_hold"
      ? "On Hold"
      : String(project.status || "-")

  const statusBadge =
    project.status === "active"
      ? "bg-green-100 text-green-700"
      : project.status === "completed"
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-200 text-gray-700"

  // ✅ Next due payment (اختياري) من milestone الحالي إذا موجود
  const nextDueAmount =
    currentMilestone && currentMilestone.due_amount != null
      ? Number(currentMilestone.due_amount || 0)
      : null

  const nextDueDate =
    currentMilestone && currentMilestone.due_date ? String(currentMilestone.due_date) : null

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => navigate("/portal")}
            className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50 text-sm"
          >
            ← Back
          </button>

          <div className="text-xs text-gray-500">
            Last updated: {formatDate(project.updated_at || project.created_at)}
          </div>
        </div>

        {/* HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold">{project.project_code || project.title}</h1>
              <p className="text-sm text-gray-500 mt-1">{project.title}</p>
              {project.address && <p className="text-xs text-gray-400 mt-1">{project.address}</p>}
            </div>

            <span className={`text-xs px-4 py-2 rounded-full ${statusBadge}`}>{statusLabel}</span>
          </div>

          {/* ✅ Progress bar (RTL-safe) */}
          <div className="mt-6">
            {/* dir=rtl يخلي التعبئة من اليمين (مثل اللي عندك بالصورة) */}
            <div dir="rtl" className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
              {/* ✅ done (green) */}
              <div
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${shownProgress}%` }}
              />

              {/* ✅ القادم (yellow) يبدأ من نهاية الأخضر دائماً (من اليمين بسبب RTL) */}
              {yellowWidth > 0 && shownProgress < 100 && (
                <div
                  className="absolute top-0 h-3 rounded-full overflow-hidden"
                  style={{
                    // في RTL: النهاية عند "يمين"، فنثبت الأصفر بعد الأخضر باستخدام right
                    right: `${shownProgress}%`,
                    width: `${Math.min(yellowWidth, 100 - shownProgress)}%`,
                  }}
                />
              )}
            </div>

            <p className="text-xs mt-2 text-gray-600">{shownProgress}% Complete</p>

            {/* ✅ Milestones (B) تحت progress bar */}
            {normalizedMilestones.length > 0 && (
              <div className="mt-4 border rounded-2xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <h2 className="text-sm font-semibold text-gray-900">
                    مراحل الإنجاز (تعريف واضح للنسبة)
                  </h2>
                  {currentMilestone && (
                    <div className="text-xs text-gray-600">
                      المرحلة الحالية:{" "}
                      <span className="font-semibold text-gray-900">
                        {toInt(currentMilestone.percentage, 0)}% — {currentMilestone.title}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-3 space-y-2">
                  {normalizedMilestones.map((m: any) => (
                    <div
                      key={m.id}
                      className="bg-white border rounded-xl p-3 flex items-start justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-xs px-3 py-1 rounded-full ${badgeForMilestone(
                              m.is_done
                            )}`}
                          >
                            {m.is_done ? "✔ مكتملة" : "غير مكتملة"}
                          </span>

                          <div className="text-sm font-semibold text-gray-900">
                            {toInt(m.percentage, 0)}% — {m.title}
                          </div>
                        </div>

                        {m.note && <div className="text-sm text-gray-600 mt-1">{m.note}</div>}

                        {(m.due_amount != null || m.due_date) && !m.is_done && (
                          <div className="text-sm text-gray-700 mt-2">
                            {m.due_amount != null ? `دفعة متوقعة: ${money(m.due_amount)} SAR` : ""}
                            {m.due_amount != null && m.due_date ? " — " : ""}
                            {m.due_date ? `استحقاق: ${formatDate(m.due_date)}` : ""}
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-gray-400 shrink-0">
                        {m.is_done && (m.done_at ? `تم: ${formatDate(m.done_at)}` : "تم")}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ✅ Current milestone summary + next due (اختياري) */}
                {currentMilestone && (
                  <div className="mt-4 text-sm">
                    {(nextDueAmount != null || nextDueDate) && (
                      <div className="p-3 rounded-xl border bg-white">
                        <div className="font-semibold text-gray-900">
                          الدفعة القادمة (تهيئة للسداد)
                        </div>
                        <div className="text-gray-700 mt-1">
                          {nextDueAmount != null ? `المبلغ: ${money(nextDueAmount)} SAR` : ""}
                          {nextDueAmount != null && nextDueDate ? " — " : ""}
                          {nextDueDate ? `تاريخ الاستحقاق: ${formatDate(nextDueDate)}` : ""}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          * يتم توثيق المراحل والدفعات لضمان الشفافية للطرفين.
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* إذا ما في milestones بعد، نعرض بطاقة صغيرة تشرح السبب */}
            {normalizedMilestones.length === 0 && (
              <div className="mt-4 text-xs text-gray-500">
                * نسبة الإنجاز تُعرض كنسبة عامة. (عند تفعيل “مراحل الإنجاز” من الأدمن، تصبح النسبة مرتبطة بمراحل واضحة).
              </div>
            )}
          </div>
        </div>

        {/* ✅ COMMENTS (client) */}
        <ProjectCommentsClient projectId={project.id} clientToken={clientToken} />

        {/* FINANCIAL SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h2 className="text-lg font-semibold mb-6">Financial Summary</h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-gray-500 text-sm">Total</p>
              <p className="font-bold text-lg">{money(total)} SAR</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Paid</p>
              <p className="font-bold text-lg text-green-600">{money(paid)} SAR</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Remaining</p>
              <p className="font-bold text-lg text-red-600">{money(remaining)} SAR</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Payment %</p>
              <p className="font-bold text-lg">{paymentPercent.toFixed(0)}%</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${paymentPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* PAYMENTS */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h2 className="text-lg font-semibold mb-6">Payments</h2>

          {payments.length === 0 ? (
            <p className="text-sm text-gray-500">No payments recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table dir="rtl" className="w-full text-sm">
                <thead>
                  <tr className="border-b text-right">
                    <th className="py-2">التاريخ</th>
                    <th className="py-2">المبلغ</th>
                    <th className="py-2">الطريقة</th>
                    <th className="py-2">ملاحظة</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment: any) => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50 text-right">
                      <td className="py-2">{formatDate(payment.date)}</td>
                      <td className="py-2 font-medium">{money(payment.amount)} SAR</td>
                      <td className="py-2">{payment.method || "-"}</td>
                      <td className="py-2">{payment.note || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* DOCUMENTS */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h2 className="text-lg font-semibold mb-6">Documents</h2>

          {documents.length === 0 && <p className="text-sm text-gray-500">No documents uploaded yet.</p>}

          {documents.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              <DocGroup title="Contract" items={docsByType.contract} />
              <DocGroup title="Offers" items={docsByType.offer} />
              <DocGroup title="Invoices" items={docsByType.invoice} />
              <DocGroup title="Receipts" items={docsByType.receipt} />
              <DocGroup title="Other" items={docsByType.other} />
            </div>
          )}
        </div>

        {/* UPDATES */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h2 className="text-lg font-semibold mb-6">Project Updates</h2>

          {updates.length === 0 ? (
            <p className="text-sm text-gray-500">No updates yet.</p>
          ) : (
            <div className="space-y-6">
              {updates.map((update: any) => {
                const photos = updatePhotos.filter((p: any) => p.update_id === update.id)

                return (
                  <div key={update.id} className="border rounded-2xl p-5 bg-white">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{update.title || "Update"}</h3>
                        {update.note && <p className="text-sm text-gray-600 mt-1">{update.note}</p>}
                      </div>

                      <div className="text-xs text-gray-400">{formatDate(update.created_at)}</div>
                    </div>

                    {photos.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {photos.map((photo: any) => (
                          <button
                            key={photo.id}
                            type="button"
                            onClick={() => setImgOpen(photo.photo_url)}
                            className="group relative overflow-hidden rounded-xl border bg-gray-50"
                          >
                            <img
                              src={photo.photo_url}
                              alt="Update"
                              className="w-full h-36 md:h-40 object-cover group-hover:scale-[1.02] transition"
                              loading="lazy"
                              onError={(e) => {
                                ;(e.currentTarget as HTMLImageElement).style.display = "none"
                              }}
                            />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/10" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {imgOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setImgOpen(null)}
        >
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end mb-3">
              <button
                onClick={() => setImgOpen(null)}
                className="px-3 py-2 rounded-lg bg-white text-sm"
              >
                Close ✕
              </button>
            </div>
            <div className="bg-black rounded-2xl overflow-hidden border border-white/10">
              <img src={imgOpen} alt="Preview" className="w-full max-h-[80vh] object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DocGroup({ title, items }: { title: string; items: any[] }) {
  return (
    <div className="border rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">{title}</h3>
        <span className="text-xs text-gray-400">{items.length}</span>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-gray-500">—</p>
      ) : (
        <div className="space-y-2">
          {items.map((doc: any) => (
            <a
              key={doc.id}
              href={doc.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border rounded-xl p-3 hover:bg-gray-50 text-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium">{doc.title || doc.type}</span>
                <span className="text-xs text-gray-400">
                  {doc.uploaded_at ? formatDate(doc.uploaded_at) : ""}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}