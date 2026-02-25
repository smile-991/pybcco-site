import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/get-project-details?id=${id}`, {
      credentials: "include"
    })
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!data?.project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
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

  const project = data.project
  const payments = Array.isArray(data.payments) ? data.payments : []
  const documents = Array.isArray(data.documents) ? data.documents : []
  const updates = Array.isArray(data.updates) ? data.updates : []
  const updatePhotos = Array.isArray(data.update_photos) ? data.update_photos : []

  const total = Number(project.total_amount) || 0
  const paid = payments.reduce(
    (sum: number, p: any) => sum + Number(p.amount || 0),
    0
  )
  const remaining = total - paid
  const paymentPercent =
    total > 0 ? Math.min((paid / total) * 100, 100) : 0

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                {project.project_code || project.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {project.title}
              </p>
            </div>

            <span
              className={`text-xs px-4 py-2 rounded-full ${
                project.status === "active"
                  ? "bg-green-100 text-green-600"
                  : project.status === "completed"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {project.status}
            </span>
          </div>

          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-yellow-500 h-3 rounded-full"
                style={{ width: `${project.progress_percent || 0}%` }}
              />
            </div>
            <p className="text-xs mt-2 text-gray-600">
              {project.progress_percent || 0}% Complete
            </p>
          </div>
        </div>

        {/* FINANCIAL SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h2 className="text-lg font-semibold mb-6">
            Financial Summary
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-gray-500 text-sm">Total</p>
              <p className="font-bold text-lg">{total} SAR</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Paid</p>
              <p className="font-bold text-lg text-green-600">
                {paid} SAR
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Remaining</p>
              <p className="font-bold text-lg text-red-600">
                {remaining} SAR
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Payment %</p>
              <p className="font-bold text-lg">
                {paymentPercent.toFixed(0)}%
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${paymentPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* PAYMENTS */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h2 className="text-lg font-semibold mb-6">Payments</h2>

          {payments.length === 0 && (
            <p className="text-sm text-gray-500">
              No payments recorded yet.
            </p>
          )}

          {payments.length > 0 && (
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
                    <tr key={payment.id} className="border-b">
                      <td className="py-2">{payment.date || "-"}</td>
                      <td className="py-2">{payment.amount} SAR</td>
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
            <p className="text-sm text-gray-500">
              No documents uploaded yet.
            </p>
          )}

          <div className="space-y-3">
            {documents.map((doc: any) => (
              <a
                key={doc.id}
                href={doc.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border p-3 rounded-lg hover:bg-gray-50 text-sm"
              >
                {doc.title || doc.type}
              </a>
            ))}
          </div>
        </div>

        {/* UPDATES */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h2 className="text-lg font-semibold mb-6">Project Updates</h2>

          {updates.length === 0 && (
            <p className="text-sm text-gray-500">
              No updates yet.
            </p>
          )}

          <div className="space-y-8">
            {updates.map((update: any) => {
              const photos = updatePhotos.filter(
                (photo: any) => photo.update_id === update.id
              )

              return (
                <div key={update.id} className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{update.title}</h3>
                    <p className="text-sm text-gray-500">
                      {update.note}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {update.created_at}
                    </p>
                  </div>

                  {photos.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {photos.map((photo: any) => (
                        <img
                          key={photo.id}
                          src={photo.photo_url}
                          alt="Update"
                          className="rounded-lg border object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}