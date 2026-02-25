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
        Checking session...
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
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Dashboard 🔐
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage clients for PYBCCO Portal
          </p>
        </div>

        <CreateClient />
        <ClientsList />

      </div>
    </div>
  )
}

function CreateClient() {
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    if (!fullName || !phone) return

    setLoading(true)

    await fetch("/api/create-client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        full_name: fullName,
        phone
      })
    })

    setFullName("")
    setPhone("")
    setLoading(false)

    window.location.reload()
  }

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">Create New Client</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <input
          className="border rounded-xl px-4 py-3"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="border rounded-xl px-4 py-3"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handleCreate}
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  )
}

function ClientsList() {
  const [clients, setClients] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/get-clients", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setClients(data))
  }, [])

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
      <h2 className="text-lg font-semibold mb-6">Clients</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="border rounded-xl p-4 shadow-sm"
          >
            <h3 className="font-semibold text-gray-900">
              {client.full_name}
            </h3>

            <p className="text-sm text-gray-500">
              {client.phone}
            </p>

            <div className="mt-3 bg-gray-100 rounded-lg p-2 text-xs break-all">
              {client.access_token}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}