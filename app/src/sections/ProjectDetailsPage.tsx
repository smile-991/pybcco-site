import { useEffect, useMemo, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

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

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState<AnyObj | null>(null)
  const [loading, setLoading] = useState(true)
  const [imgOpen, setImgOpen] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/get-project-details?id=${id}`, { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) return null
        return await res.json()
      })
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch(() => {
        setData(null)
        setLoading(false)
      })
  }, [id])

  // ✅ KEEP HOOK ORDER STABLE: derive lists + useMemo before early returns
  const project = data?.project
  const payments = Array.isArray(data?.payments) ? data!.payments : []
  const documents = Array.isArray(data?.documents) ? data!.documents : []
  const updates = Array.isArray(data?.updates) ? data!.updates : []
  const updatePhotos = Array.isArray(data?.update_photos) ? data!.update_photos : []

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
              {project.address && (
                <p className="text-xs text-gray-400 mt-1">{project.address}</p>
              )}
            </div>

            <span className={`text-xs px-4 py-2 rounded-full ${statusBadge}`}>{statusLabel}</span>
          </div>

          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-yellow-500 h-3 rounded-full transition-all"
                style={{ width: `${project.progress_percent || 0}%` }}
              />
            </div>
            <p className="text-xs mt-2 text-gray-600">{project.progress_percent || 0}% Complete</p>
          </div>
        </div>

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
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">Date</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Method</th>
                    <th className="py-2">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment: any) => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50">
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

          {documents.length === 0 && (
            <p className="text-sm text-gray-500">No documents uploaded yet.</p>
          )}

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