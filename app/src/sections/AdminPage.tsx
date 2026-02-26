import { useEffect, useMemo, useState, useCallback } from "react"

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

type PaymentRow = {
  id: string
  amount?: number | string | null
  date?: string | null
  method?: string | null
  note?: string | null
  created_at?: string | null
}

type DocumentRow = {
  id: string
  title?: string | null
  file_url?: string | null
  created_at?: string | null
}

type UpdateRow = {
  id: string
  title?: string | null
  note?: string | null
  created_at?: string | null
}

type UpdatePhotoRow = {
  id: string
  update_id: string
  photo_url?: string | null
  created_at?: string | null
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

const clamp01to100 = (n: number) => {
  if (Number.isNaN(n)) return 0
  return Math.max(0, Math.min(100, n))
}

/** ✅ NEW: Project Comments types + helper */
type CommentRow = {
  id: string
  project_id: string
  sender_role: "client" | "admin"
  message: string
  created_at: string
}

function formatDate(ts: string) {
  try {
    return new Date(ts).toLocaleString("ar-SA", {
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
          <p className="text-gray-500 text-sm mt-1">
            Manage clients & projects for PYBCCO Portal
          </p>
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

  const loadProjects = useCallback(
    async (clientId: string) => {
      if (!clientId) return
      setProjectsError("")
      setLoadingProjects(true)

      try {
        const res = await fetch(
          `/api/get-projects-by-client?client_id=${encodeURIComponent(clientId)}`,
          { credentials: "include" }
        )

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
    },
    [onUnauthorized]
  )

  useEffect(() => {
    loadClients()
  }, [loadClients])

  useEffect(() => {
    if (selectedClientId) loadProjects(selectedClientId)
  }, [selectedClientId, loadProjects])

  return (
    <>
      <CreateClient onCreated={loadClients} />

      {/* CLIENTS */}
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
                selectedClientId === client.id
                  ? "border-yellow-400 bg-yellow-50"
                  : "hover:bg-gray-50"
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

      {/* PROJECTS */}
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

        {loadingProjects && (
          <div className="text-sm text-gray-500 mt-4">Loading projects...</div>
        )}

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
              <ProjectCard key={p.id} project={p} />
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

/** ✅ AddPayment Component */
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
          method: method || null,
          note: note || null,
        }),
      })

      const data = await safeJson(res)

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

/** ✅ ProjectCard */
function ProjectCard({ project }: { project: ProjectRow }) {
  const [tab, setTab] = useState<"overview" | "payments" | "documents" | "updates">("overview")

  // ✅ progress edit states
  const [progressEdit, setProgressEdit] = useState<number>(Number(project.progress_percent || 0))
  const [savingProgress, setSavingProgress] = useState(false)
  const [progressMsg, setProgressMsg] = useState("")

  // ✅ sync if project changes / refresh
  useEffect(() => {
    setProgressEdit(Number(project.progress_percent || 0))
  }, [project.id, project.progress_percent])

  // ✅ unified details states
  const [payments, setPayments] = useState<PaymentRow[]>([])
  const [documents, setDocuments] = useState<DocumentRow[]>([])
  const [updates, setUpdates] = useState<UpdateRow[]>([])
  const [updatePhotos, setUpdatePhotos] = useState<UpdatePhotoRow[]>([])
  const [loadingDetails, setLoadingDetails] = useState(false)

  // ✅ NEW: comments states
  const [comments, setComments] = useState<CommentRow[]>([])
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [commentsError, setCommentsError] = useState("")
  const [reply, setReply] = useState("")
  const [replying, setReplying] = useState(false)
  const canReply = useMemo(() => reply.trim().length >= 2, [reply])

  const loadDetails = async () => {
    setLoadingDetails(true)
    try {
      const res = await fetch(
        `/api/get-project-details?project_id=${encodeURIComponent(project.id)}&id=${encodeURIComponent(
          project.id
        )}`,
        { credentials: "include" }
      )

      const data = await safeJson(res)

      if (!res.ok) {
        setPayments([])
        setDocuments([])
        setUpdates([])
        setUpdatePhotos([])
        return
      }

      setPayments(Array.isArray(data?.payments) ? data.payments : [])
      setDocuments(Array.isArray(data?.documents) ? data.documents : [])
      setUpdates(Array.isArray(data?.updates) ? data.updates : [])
      setUpdatePhotos(Array.isArray(data?.update_photos) ? data.update_photos : [])
    } catch {
      setPayments([])
      setDocuments([])
      setUpdates([])
      setUpdatePhotos([])
    } finally {
      setLoadingDetails(false)
    }
  }

  const loadComments = async () => {
    setCommentsLoading(true)
    setCommentsError("")
    try {
      const res = await fetch("/api/get-project-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ project_id: project.id }),
      })

      const json = await safeJson(res)

      if (!res.ok) {
        setCommentsError(json?.error || "تعذر تحميل التعليقات")
        setComments([])
        return
      }

      const items = Array.isArray(json?.items) ? (json.items as CommentRow[]) : []
      setComments(items)
    } catch (e: any) {
      setCommentsError(e?.message || "خطأ غير متوقع")
    } finally {
      setCommentsLoading(false)
    }
  }

  const sendReply = async () => {
    if (!canReply) return
    setReplying(true)
    setCommentsError("")
    try {
      const res = await fetch("/api/post-admin-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ project_id: project.id, message: reply.trim() }),
      })

      const json = await safeJson(res)

      if (!res.ok) {
        setCommentsError(json?.error || "تعذر إرسال الرد")
        return
      }

      const newItem = json?.item as CommentRow | undefined
      if (newItem?.id) setComments((prev) => [...prev, newItem])

      setReply("")
    } catch (e: any) {
      setCommentsError(e?.message || "خطأ غير متوقع")
    } finally {
      setReplying(false)
    }
  }

  // ✅ update progress
  const saveProgress = async () => {
    setProgressMsg("")
    setSavingProgress(true)
    try {
      const res = await fetch("/api/update-project-progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          project_id: project.id,
          progress_percent: clamp01to100(progressEdit),
        }),
      })

      const data = await safeJson(res)
      if (!res.ok) {
        setProgressMsg(data?.error || "Failed to update progress")
        return
      }

      setProgressMsg("Progress updated ✅")
    } catch {
      setProgressMsg("Network error")
    } finally {
      setSavingProgress(false)
    }
  }

  // ✅ load details when needed based on tab
  useEffect(() => {
    if (tab === "payments" || tab === "documents" || tab === "updates") {
      loadDetails()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, project.id])

  // ✅ NEW: load comments on overview
  useEffect(() => {
    if (tab === "overview") {
      loadComments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, project.id])

  const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0)
  const remaining = Number(project.total_amount || 0) - totalPaid

  return (
    <div className="border rounded-xl p-5 shadow-sm bg-white">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {project.project_code || "Project"} — {project.title}
          </h3>
          <p className="text-sm text-gray-500">{project.address || "—"}</p>
        </div>

        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
          {project.status || "active"}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mt-4 border-b pb-2 text-sm">
        <button
          onClick={() => setTab("overview")}
          className={tab === "overview" ? "font-semibold text-yellow-600" : "text-gray-600"}
        >
          Overview
        </button>

        <button
          onClick={() => setTab("payments")}
          className={tab === "payments" ? "font-semibold text-yellow-600" : "text-gray-600"}
        >
          Payments
        </button>

        <button
          onClick={() => setTab("documents")}
          className={tab === "documents" ? "font-semibold text-yellow-600" : "text-gray-600"}
        >
          Documents
        </button>

        <button
          onClick={() => setTab("updates")}
          className={tab === "updates" ? "font-semibold text-yellow-600" : "text-gray-600"}
        >
          Updates
        </button>
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <div className="mt-4 space-y-2 text-sm">
          <div>
            Progress: <b>{project.progress_percent || 0}%</b>
          </div>

          {/* ✅ edit + slider + save */}
          <div className="mt-3 border-t pt-3">
            <div className="flex items-center gap-3 flex-wrap">
              <label className="text-sm text-gray-700">Progress %</label>

              <input
                type="number"
                min={0}
                max={100}
                value={progressEdit}
                onChange={(e) => setProgressEdit(clamp01to100(Number(e.target.value)))}
                className="w-24 border rounded-lg px-3 py-2 text-sm"
              />

              <input
                type="range"
                min={0}
                max={100}
                value={progressEdit}
                onChange={(e) => setProgressEdit(clamp01to100(Number(e.target.value)))}
                className="w-56"
              />

              <button
                onClick={saveProgress}
                disabled={savingProgress}
                className="px-4 py-2 rounded-lg bg-black text-white text-sm disabled:opacity-60"
              >
                {savingProgress ? "Saving..." : "Save"}
              </button>
            </div>

            {progressMsg && <div className="text-xs mt-2 text-gray-600">{progressMsg}</div>}
          </div>

          {/* ✅ NEW: Comments + Admin Reply UI (under Progress) */}
          <div className="mt-4 rounded-2xl border bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">💬 تعليقات العميل</div>

              <button
                type="button"
                onClick={loadComments}
                disabled={commentsLoading}
                className="rounded-lg border px-3 py-1 text-xs hover:bg-gray-50 disabled:opacity-50"
              >
                {commentsLoading ? "جارِ التحديث..." : "تحديث"}
              </button>
            </div>

            {commentsError ? (
              <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-2 text-xs text-red-700">
                {commentsError}
              </div>
            ) : null}

            <div className="max-h-56 overflow-auto rounded-xl border bg-gray-50 p-3">
              {comments.length === 0 ? (
                <div className="text-xs text-gray-500">لا توجد تعليقات بعد.</div>
              ) : (
                <div className="space-y-2">
                  {comments.map((c) => {
                    const isClient = c.sender_role === "client"
                    return (
                      <div
                        key={c.id}
                        className={`flex ${isClient ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                            isClient
                              ? "bg-white border"
                              : "bg-yellow-100 border border-yellow-200"
                          }`}
                        >
                          <div className="whitespace-pre-wrap leading-relaxed">{c.message}</div>
                          <div className="mt-1 text-[11px] text-gray-500">
                            {isClient ? "العميل" : "أنت"} • {formatDate(c.created_at)}
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
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="اكتب ردّك للعميل…"
                className="min-h-[42px] w-full resize-none rounded-xl border p-2 text-sm outline-none focus:ring-2 focus:ring-yellow-200"
              />
              <button
                type="button"
                onClick={sendReply}
                disabled={!canReply || replying}
                className="rounded-xl bg-yellow-500 px-4 text-sm font-semibold text-black hover:bg-yellow-600 disabled:opacity-50"
              >
                {replying ? "إرسال..." : "إرسال"}
              </button>
            </div>

            <div className="mt-2 text-[11px] text-gray-500">
              * الرد يظهر للعميل تحت نسبة إنجاز المشروع.
            </div>
          </div>

          <div>
            Total: <b>{project.total_amount || 0} SAR</b>
          </div>

          <div>
            Paid: <b>{totalPaid} SAR</b>
          </div>

          <div>
            Remaining:{" "}
            <b className={remaining > 0 ? "text-red-600" : "text-green-600"}>
              {remaining} SAR
            </b>
          </div>
        </div>
      )}

      {/* PAYMENTS */}
      {tab === "payments" && (
        <div className="mt-4">
          <AddPayment projectId={project.id} onAdded={loadDetails} />

          {loadingDetails && <div className="text-sm text-gray-500 mt-3">Loading payments...</div>}

          {payments.length > 0 && (
            <div className="mt-4 space-y-2">
              {payments.map((p) => (
                <div key={p.id} className="border rounded-lg p-3 text-sm flex justify-between">
                  <div>
                    <div>{p.date || "—"}</div>
                    <div className="text-gray-500 text-xs">
                      {p.method || "—"} {p.note ? `— ${p.note}` : ""}
                    </div>
                  </div>

                  <div className="font-semibold">{Number(p.amount || 0)} SAR</div>
                </div>
              ))}
            </div>
          )}

          {payments.length === 0 && !loadingDetails && (
            <div className="text-sm text-gray-500 mt-3">No payments yet.</div>
          )}
        </div>
      )}

      {/* DOCUMENTS */}
      {tab === "documents" && (
        <div className="mt-4">
          <AddDocument projectId={project.id} onAdded={loadDetails} />

          {loadingDetails && <div className="text-sm text-gray-500 mt-3">Loading documents...</div>}

          {!loadingDetails && documents.length === 0 && (
            <div className="text-sm text-gray-500 mt-3">No documents yet.</div>
          )}

          {documents.length > 0 && (
            <div className="mt-4 space-y-2">
              {documents.map((d) => (
                <a
                  key={d.id}
                  href={d.file_url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="block border rounded-lg p-3 text-sm hover:bg-gray-50"
                >
                  <div className="font-semibold">{d.title || "Document"}</div>
                  <div className="text-xs text-gray-500 mt-1">{d.created_at || ""}</div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* UPDATES */}
      {tab === "updates" && (
        <div className="mt-4">
          <AddUpdate projectId={project.id} onAdded={loadDetails} />

          {loadingDetails && <div className="text-sm text-gray-500 mt-3">Loading updates...</div>}

          {!loadingDetails && updates.length === 0 && (
            <div className="text-sm text-gray-500 mt-3">No updates yet.</div>
          )}

          {updates.length > 0 && (
            <div className="mt-4 space-y-3">
              {updates.map((u) => {
                const photos = updatePhotos.filter((p) => p.update_id === u.id)

                return (
                  <div key={u.id} className="border rounded-lg p-3">
                    <div className="font-semibold text-sm">{u.title || "Update"}</div>

                    {u.note && <div className="text-sm text-gray-600 mt-1">{u.note}</div>}

                    <div className="text-xs text-gray-400 mt-2">{u.created_at || ""}</div>

                    {photos.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {photos.map((ph) => (
                          <a
                            key={ph.id}
                            href={ph.photo_url || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="block"
                          >
                            <img
                              src={ph.photo_url || ""}
                              alt="update"
                              className="w-full h-32 object-cover rounded"
                              loading="lazy"
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/** ✅ AddDocument */
function AddDocument({
  projectId,
  onAdded,
}: {
  projectId: string
  onAdded?: () => void
}) {
  const [title, setTitle] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  const handleUpload = async () => {
    setMsg("")
    if (!file || !title.trim()) {
      setMsg("Title and file required")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("project_id", projectId)
      formData.append("type", "document")

      const uploadRes = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
        credentials: "include",
      })

      const uploadData = await safeJson(uploadRes)

      if (!uploadRes.ok || !uploadData?.url) {
        setMsg(uploadData?.error || "Upload failed")
        return
      }

      const saveRes = await fetch("/api/create-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          project_id: projectId,
          title: title.trim(),
          file_url: uploadData.url,
        }),
      })

      const saveData = await safeJson(saveRes)

      if (!saveRes.ok) {
        setMsg(saveData?.error || "Save failed")
        return
      }

      setTitle("")
      setFile(null)
      setMsg("Document uploaded ✅")
      onAdded?.()
    } catch {
      setMsg("Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-semibold text-sm mb-2">Add Document</h4>

      <div className="grid md:grid-cols-3 gap-2">
        <input
          className="border rounded px-3 py-2 text-sm"
          placeholder="Document Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          className="border rounded px-3 py-2 text-sm"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white rounded px-3 py-2 text-sm hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {msg && <p className="text-xs mt-2 text-gray-700">{msg}</p>}
    </div>
  )
}

/** ✅ AddUpdate + optional photo */
function AddUpdate({
  projectId,
  onAdded,
}: {
  projectId: string
  onAdded?: () => void
}) {
  const [title, setTitle] = useState("")
  const [note, setNote] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  const handleCreate = async () => {
    setMsg("")
    if (!title.trim()) {
      setMsg("Title required")
      return
    }

    setLoading(true)

    try {
      // 1) create update
      const updateRes = await fetch("/api/create-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          project_id: projectId,
          title: title.trim(),
          note: note || null,
        }),
      })

      const updateData = await safeJson(updateRes)

      if (!updateRes.ok) {
        setMsg(updateData?.error || "Failed to create update")
        return
      }

      const updateId = updateData?.[0]?.id || updateData?.id
      if (!updateId) {
        setMsg("Update created but no updateId returned")
        return
      }

      // 2) optional photo
      if (file) {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("project_id", projectId)
        formData.append("type", "update-photo")

        const uploadRes = await fetch("/api/upload-file", {
          method: "POST",
          body: formData,
          credentials: "include",
        })

        const uploadData = await safeJson(uploadRes)

        if (uploadRes.ok && uploadData?.url) {
          await fetch("/api/create-update-photo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              update_id: updateId,
              photo_url: uploadData.url,
            }),
          })
        }
      }

      setTitle("")
      setNote("")
      setFile(null)
      setMsg("Update created ✅")
      onAdded?.()
    } catch {
      setMsg("Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-semibold text-sm mb-2">Add Update</h4>

      <div className="grid md:grid-cols-4 gap-2">
        <input
          className="border rounded px-3 py-2 text-sm"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border rounded px-3 py-2 text-sm"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <input
          type="file"
          className="border rounded px-3 py-2 text-sm"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={handleCreate}
          disabled={loading}
          className="bg-purple-600 text-white rounded px-3 py-2 text-sm hover:bg-purple-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Create"}
        </button>
      </div>

      {msg && <p className="text-xs mt-2 text-gray-700">{msg}</p>}
    </div>
  )
}