import { useEffect, useState, useCallback } from "react"

type ClientRow = {
  id: string
  full_name: string
  phone: string
  access_token?: string | null
  created_at?: string
}

type ProjectRow = {
  id: string
  client_id: string
  project_code?: string
  title: string
  address?: string | null
  status?: string | null
  progress_percent?: number | null
  total_amount?: number | null
  start_date?: string | null
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

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const res = await fetch("/api/admin-session", {
        method: "GET",
        credentials: "include",
      })
      setAuthorized(res.ok)
    } catch {
      setAuthorized(false)
    }
  }

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
        setBusy(false)
        return
      }

      setAuthorized(true)
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
          <p className="text-gray-500 text-sm mt-1">Manage clients & projects for PYBCCO Portal</p>
        </div>

        <ClientsAndProjects onUnauthorized={() => setAuthorized(false)} />
      </div>
    </div>
  )
}

function ClientsAndProjects({ onUnauthorized }: { onUnauthorized: () => void }) {
  const [clients, setClients] = useState<ClientRow[]>([])
  const [clientsError, setClientsError] = useState("")
  const [loadingClients, setLoadingClients] = useState(false)

  const [selectedClientId, setSelectedClientId] = useState<string>("")
  const selectedClient = clients.find((c) => c.id === selectedClientId) || null

  const [projects, setProjects] = useState<ProjectRow[]>([])
  const [projectsError, setProjectsError] = useState("")
  const [loadingProjects, setLoadingProjects] = useState(false)

  const loadClients = useCallback(async () => {
    setClientsError("")
    setLoadingClients(true)

    try {
      const res = await fetch("/api/get-clients", { credentials: "include" })
      if (res.status === 401 || res.status === 403) {
        onUnauthorized()
        return
      }

      const data = await safeJson(res)

      if (!res.ok) {
        setClientsError(data?.error || "Failed to load clients")
        setClients([])
        return
      }

      const list = Array.isArray(data) ? data : Array.isArray(data?.clients) ? data.clients : []
      setClients(list)

      // auto select أول عميل إذا ما في اختيار
      if (!selectedClientId && list.length > 0) {
        setSelectedClientId(list[0].id)
      }
    } catch {
      setClientsError("Network error while loading clients")
      setClients([])
    } finally {
      setLoadingClients(false)
    }
  }, [onUnauthorized, selectedClientId])

  const loadProjects = useCallback(async (clientId: string) => {
    if (!clientId) return
    setProjectsError("")
    setLoadingProjects(true)

    try {
      const res = await fetch(`/api/get-projects-by-client?client_id=${encodeURIComponent(clientId)}`, {
        credentials: "include",
      })

      if (res.status === 401 || res.status === 403) {
        onUnauthorized()
        return
      }

      const data = await safeJson(res)

      if (!res.ok) {
        setProjectsError(data?.error || "Failed to load projects")
        setProjects([])
        return
      }

      setProjects(Array.isArray(data) ? data : [])
    } catch {
      setProjectsError("Network error while loading projects")
      setProjects([])
    } finally {
      setLoadingProjects(false)
    }
  }, [onUnauthorized])

  useEffect(() => {
    loadClients()
  }, [loadClients])

  useEffect(() => {
    if (selectedClientId) loadProjects(selectedClientId)
  }, [selectedClientId, loadProjects])

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

        {loadingClients && <div className="text-sm text-gray-500">Loading...</div>}

        {clientsError && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3 mb-4">
            {clientsError}
          </div>
        )}

        {!loadingClients && clients.length === 0 && !clientsError && (
          <div className="text-sm text-gray-500">No clients yet.</div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {clients.map((client) => (
            <button
              key={client.id}
              onClick={() => setSelectedClientId(client.id)}
              className={`text-left border rounded-xl p-4 shadow-sm transition ${
                selectedClientId === client.id ? "border-yellow-400 bg-yellow-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{client.full_name}</h3>
                  <p className="text-sm text-gray-500">{client.phone}</p>
                </div>
                <span className="text-xs text-gray-500">Select</span>
              </div>

              <div className="mt-3 bg-gray-100 rounded-lg p-2 text-xs break-all">
                {client.access_token || "—"}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold">Projects</h2>
          <button
            onClick={() => selectedClientId && loadProjects(selectedClientId)}
            className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50 text-sm"
            disabled={!selectedClientId}
          >
            Refresh
          </button>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-600">Selected Client</label>
          <div className="mt-1 text-sm font-medium text-gray-900">
            {selectedClient ? `${selectedClient.full_name} (${selectedClient.phone})` : "—"}
          </div>
        </div>

        <CreateProject
          clientId={selectedClientId}
          onCreated={() => selectedClientId && loadProjects(selectedClientId)}
        />

        {loadingProjects && <div className="text-sm text-gray-500 mt-4">Loading projects...</div>}

        {projectsError && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3 mt-4">
            {projectsError}
          </div>
        )}

        {!loadingProjects && projects.length === 0 && !projectsError && (
          <div className="text-sm text-gray-500 mt-4">No projects for this client yet.</div>
        )}

        {projects.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {projects.map((p) => (
              <div key={p.id} className="border rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {p.project_code || "Project"} — {p.title}
                    </h3>
                    <p className="text-sm text-gray-500">{p.address || "—"}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    {p.status || "—"}
                  </span>
                </div>

                <div className="mt-3 text-sm text-gray-700">
                  Progress: <b>{Number(p.progress_percent || 0)}%</b>
                </div>

                <div className="mt-2 text-sm text-gray-700">
                  Total: <b>{Number(p.total_amount || 0)} SAR</b>
                </div>
Total: <b>{Number(p.total_amount || 0)} SAR</b>
                <div className="mt-2 text-xs text-gray-400">
                  {p.created_at || ""}
                </div>
              </div>
            ))}
          </div>
        )}
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

function CreateProject({ clientId, onCreated }: { clientId: string; onCreated: () => void }) {
  const [title, setTitle] = useState("")
  const [address, setAddress] = useState("")
  const [totalAmount, setTotalAmount] = useState("")
  const [startDate, setStartDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  const handleCreate = async () => {
    setMsg("")
    if (!clientId) {
      setMsg("Select a client first.")
      return
    }
    if (!title.trim()) {
      setMsg("Project title required.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/create-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          client_id: clientId,
          title: title.trim(),
          address: address.trim() || null,
          total_amount: totalAmount ? Number(totalAmount) : 0,
          start_date: startDate || null,
          status: "active",
          progress_percent: 0,
        }),
      })

      const data = await safeJson(res)

      if (!res.ok) {
        setMsg(data?.error || "Failed to create project")
        return
      }

      setTitle("")
      setAddress("")
      setTotalAmount("")
      setStartDate("")
      setMsg("Project created ✅")
      onCreated()
    } catch {
      setMsg("Network error while creating project")
    } finally {
      setLoading(false)
    }
  }

  function AddPayment({ projectId, onAdded }: { projectId: string; onAdded: () => void }) {
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [method, setMethod] = useState("")
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  const handleCreate = async () => {
    setMsg("")
    if (!amount) {
      setMsg("Amount required")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          project_id: projectId,
          amount: Number(amount),
          date: date || null,
          method,
          note
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setMsg(data?.error || "Failed to create payment")
        return
      }

      setAmount("")
      setDate("")
      setMethod("")
      setNote("")
      setMsg("Payment added ✅")
      onAdded()
    } catch {
      setMsg("Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-semibold text-sm mb-2">Add Payment</h4>

      <div className="grid md:grid-cols-4 gap-2">
        <input
          className="border rounded px-3 py-2 text-sm"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="date"
          className="border rounded px-3 py-2 text-sm"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          className="border rounded px-3 py-2 text-sm"
          placeholder="Method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <input
          className="border rounded px-3 py-2 text-sm"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="mt-3 px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "Adding..." : "Add Payment"}
      </button>

      {msg && <p className="text-xs mt-2 text-gray-700">{msg}</p>}
    </div>
  )
}

  return (
    <div className="border rounded-2xl p-4">
      <h3 className="font-semibold text-gray-900">Create Project</h3>

      <div className="grid md:grid-cols-4 gap-3 mt-3">
        <input
          className="border rounded-xl px-4 py-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border rounded-xl px-4 py-3"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          className="border rounded-xl px-4 py-3"
          placeholder="Total Amount (SAR)"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
        />

        <input
          className="border rounded-xl px-4 py-3"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="mt-4 w-full md:w-auto px-6 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 text-white font-semibold rounded-xl transition"
      >
        {loading ? "Creating..." : "Create Project"}
      </button>

      {msg && <p className="text-sm mt-3 text-gray-700">{msg}</p>}
    </div>
  )
}