import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function PortalPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null)
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [step, setStep] = useState<"phone" | "code">("phone")
  const [message, setMessage] = useState("")

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const res = await fetch("/api/client-session", { credentials: "include" })
      setAuthorized(res.ok)
    } catch {
      setAuthorized(false)
    }
  }

  const requestOtp = async () => {
    setMessage("")
    try {
      const res = await fetch("/api/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        setMessage(data?.error || "Failed to request code")
        return
      }

      setStep("code")
      setMessage("Send LOGIN on WhatsApp and enter the code sent to you.")
    } catch {
      setMessage("Network error")
    }
  }

  const verifyOtp = async () => {
  setMessage("")
  try {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ phone, code }),
    })

    const data = await res.json().catch(() => null)

    if (!res.ok) {
      setMessage(data?.error || "Invalid code")
      return
    }

    // ✅ خزّن توكن العميل (ضروري للتعليقات)
    const token = String(data?.client_token || data?.access_token || "").trim()
    if (token) localStorage.setItem("pybcco_client_token", token)

    setAuthorized(true)
  } catch {
    setMessage("Network error")
  }
}

  if (authorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border">
          <h1 className="text-2xl font-bold text-center mb-6">
            Track Your Project
          </h1>

          {step === "phone" && (
            <>
              <input
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 mb-4"
              />
              <button
                onClick={requestOtp}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl transition"
              >
                Request Code
              </button>
            </>
          )}

          {step === "code" && (
            <>
              <input
                type="text"
                placeholder="Enter OTP code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 mb-4"
              />
              <button
                onClick={verifyOtp}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl transition"
              >
                Verify & Login
              </button>
            </>
          )}

          {message && (
            <p className="text-sm text-center mt-4 text-red-500">{message}</p>
          )}
        </div>
      </div>
    )
  }

  return <ClientProjects onLogout={() => setAuthorized(false)} />
}

function ClientProjects({ onLogout }: { onLogout: () => void }) {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      setErr("")
      try {
        const res = await fetch("/api/get-client-projects", {
          credentials: "include",
        })

        if (res.status === 401 || res.status === 403) {
          onLogout()
          return
        }

        const data = await res.json().catch(() => null)
        if (!Array.isArray(data)) {
  setErr(data?.error || "Unexpected response from server")
  setProjects([])
} else {
  setProjects(data)
}
      } catch {
        setErr("Network error while loading projects")
        setProjects([])
      } finally {
        setLoading(false)
      }
    })()
  }, [onLogout])

  const handleLogout = async () => {
  await fetch("/api/client-logout", {
    method: "POST",
    credentials: "include",
  }).catch(() => {})

  // ✅ امسح التوكن
  localStorage.removeItem("pybcco_client_token")

  onLogout()
  window.location.href = "/portal"
}

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading projects...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white shadow-xl rounded-2xl p-6 border flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Your Projects</h1>
            <p className="text-sm text-gray-500 mt-1">
              Track progress and payments in real-time.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-black text-white text-sm hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>

        {err && (
          <div className="bg-red-50 border border-red-100 text-red-700 rounded-xl p-4 text-sm">
            {err}
          </div>
        )}

        {projects.length === 0 && !err && (
          <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-500">
            No projects assigned yet.
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-md rounded-xl p-6 border"
            >
              <h2 className="text-lg font-semibold">{project.title}</h2>

              <p className="text-sm text-gray-500 mt-1">
                Status: {project.status}
              </p>

              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-yellow-500 h-3 rounded-full transition-all"
                    style={{ width: `${project.progress_percent || 0}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {project.progress_percent || 0}% Complete
                </p>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                Total: {project.total_amount} SAR
              </div>

              <button
                onClick={() => navigate(`/portal/projects/${project.id}`)}
                className="mt-4 w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}