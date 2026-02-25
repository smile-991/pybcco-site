import { useEffect, useState } from "react"

export default function AdminPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const res = await fetch("/api/admin-session", {
        method: "GET",
        credentials: "include"
      })

      if (res.ok) {
        setAuthorized(true)
      } else {
        setAuthorized(false)
      }
    } catch {
      setAuthorized(false)
    }
  }

  const handleLogin = async () => {
    setError("")

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ password })
      })

      if (!res.ok) {
        setError("Invalid password")
        return
      }

      setAuthorized(true)
    } catch {
      setError("Server error")
    }
  }

  if (authorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-sm">Checking session...</div>
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Login
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              PYBCCO Client Portal
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
            />

            <button
              onClick={handleLogin}
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition shadow-md"
            >
              Login
            </button>

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Admin Dashboard 🔐
        </h1>
        <p className="text-gray-600">
          Welcome to PYBCCO Client Portal Admin.
        </p>
      </div>
    </div>
  )
}