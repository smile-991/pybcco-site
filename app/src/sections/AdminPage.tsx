import { useState } from "react"

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || "Login failed")
        return
      }

      setMessage("Login success ✅")
    } catch (err) {
      setMessage("Server error")
    }
  }

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

      <p style={{ marginTop: 20 }}>{message}</p>
    </div>
  )
}