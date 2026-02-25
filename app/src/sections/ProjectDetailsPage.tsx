import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/get-project-details?id=${id}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!data?.project) {
    return <div className="min-h-screen flex items-center justify-center">Project not found</div>
  }

  const total = data.project.total_amount
  const paid = data.payments.reduce((sum: number, p: any) => sum + p.amount, 0)
  const remaining = total - paid

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-5xl mx-auto space-y-8">

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold">
            {data.project.title}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Status: {data.project.status}
          </p>

          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-yellow-500 h-3 rounded-full"
                style={{ width: `${data.project.progress_percent}%` }}
              />
            </div>
            <p className="text-xs mt-1">
              {data.project.progress_percent}% Complete
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Financial Summary</h2>

          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-500 text-sm">Total</p>
              <p className="font-bold">{total} SAR</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Paid</p>
              <p className="font-bold text-green-600">{paid} SAR</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Remaining</p>
              <p className="font-bold text-red-600">{remaining} SAR</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Payments</h2>

          {data.payments.length === 0 && (
            <p className="text-sm text-gray-500">No payments yet.</p>
          )}

          <div className="space-y-3">
            {data.payments.map((payment: any) => (
              <div
                key={payment.id}
                className="border rounded-lg p-3 flex justify-between text-sm"
              >
                <span>{payment.date}</span>
                <span>{payment.amount} SAR</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}