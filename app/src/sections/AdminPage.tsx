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
    return <div style={{ padding: 40 }}>Checking session...</div>
  }

  if (!authorized) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Admin Login</h1>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, marginRight: 10 }}
        />

        <button onClick={handleLogin} style={{ padding: 10 }}>
          Login
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    )
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard 🔐</h1>
      <p>You are logged in.</p>
    </div>
  )
}