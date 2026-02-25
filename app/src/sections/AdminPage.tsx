import { useEffect, useState, useCallback } from "react"

type ClientRow = {
  id: string
  full_name: string
  phone: string
  access_token?: string | null
  created_at?: string
}

async function safeJson(res: Response) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export default function AdminPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/admin-session", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      })
      setAuthorized(res.ok)
      return res.ok
    } catch {
      setAuthorized(false)
      return false
    }
  }, [])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  const handleLogin = async () => {
    setError("")
    setBusy(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        const data = await safeJson(res)
        setError(data?.error || "Invalid password")
        return
      }

      // ✅ بدل setAuthorized(true) مباشرة — نثبتها ب session check
      const ok = await checkSession()
      if (!ok) {
        setError("Login succeeded but session cookie not set. Please refresh and try again.")
      }
    } catch {
      setError("Server error")
    } finally {
      setBusy(false)
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
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-sm text-gray-500 mt-2">PYBCCO Client Portal</p>
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
              disabled={busy}
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 text-white font-semibold rounded-xl transition shadow-md"
            >
              {busy ? "Logging in..." : "Login"}
            </button>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard 🔐</h1>
          <p className="text-gray-500 text-sm mt-1">Manage clients for PYBCCO Portal</p>
        </div>

        <ClientsSection onUnauthorized={() => setAuthorized(false)} />
      </div>
    </div>
  )
}

function ClientsSection({ onUnauthorized }: { onUnauthorized: () => void }) {
  const [clients, setClients] = useState<ClientRow[]>([])
  const [listError, setListError] = useState("")
  const [loading, setLoading] = useState(false)

  const loadClients = useCallback(async () => {
    setListError("")
    setLoading(true)

    try {
      const res = await fetch("/api/get-clients", {
        credentials: "include",
        cache: "no-store",
      })

      if (res.status === 401 || res.status === 403) {
        onUnauthorized()
        return
      }

      const data = await safeJson(res)

      if (!res.ok) {
        setListError(data?.error || "Failed to load clients")
        setClients([])
        return
      }

      if (Array.isArray(data)) {
        setClients(data)
      } else if (Array.isArray(data?.clients)) {
        setClients(data.clients)
      } else {
        setClients([])
        setListError("Unexpected response format from /api/get-clients")
      }
    } catch {
      setListError("Network error while loading clients")
      setClients([])
    } finally {
      setLoading(false)
    }
  }, [onUnauthorized])

  useEffect(() => {
    loadClients()
  }, [loadClients])

  return (
    <>
      <CreateClient onCreated={loadClients} />

      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h2 className="text-lg font-semibold">Clients</h2>
          <button
            onClick={loadClients}
            className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50 text-sm"
          >
            Refresh
          </button>
        </div>

        {loading && <div className="text-sm text-gray-500">Loading...</div>}

        {listError && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3 mb-4">
            {listError}
          </div>
        )}

        {!loading && clients.length === 0 && !listError && (
          <div className="text-sm text-gray-500">No clients yet.</div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {clients.map((client) => (
            <div key={client.id} className="border rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900">{client.full_name}</h3>
              <p className="text-sm text-gray-500">{client.phone}</p>

              <div className="mt-3 bg-gray-100 rounded-lg p-2 text-xs break-all">
                {client.access_token || "—"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function CreateClient({ onCreated }: { onCreated: () => void }) {
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  const handleCreate = async () => {
    setMsg("")
    if (!fullName.trim() || !phone.trim()) {
      setMsg("Please enter full name and phone.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/create-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ full_name: fullName.trim(), phone: phone.trim() }),
      })

      const data = await safeJson(res)

      if (!res.ok) {
        setMsg(data?.error || "Failed to create client")
        return
      }

      setFullName("")
      setPhone("")
      setMsg("Client created ✅")
      onCreated()
    } catch {
      setMsg("Network error while creating client")
    } finally {
      setLoading(false)
    }
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
          className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 text-white font-semibold rounded-xl transition"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>

      {msg && <p className="text-sm mt-3 text-center text-gray-700">{msg}</p>}
    </div>
  )
}