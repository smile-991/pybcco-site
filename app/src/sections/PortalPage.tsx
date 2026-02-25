import { useEffect, useState } from "react"

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
      const res = await fetch("/api/client-session", {
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

  const requestOtp = async () => {
    setMessage("")
    const res = await fetch("/api/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone })
    })

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.error)
      return
    }

    setStep("code")
    setMessage("Send LOGIN on WhatsApp. Enter code sent to you.")
  }

  const verifyOtp = async () => {
    setMessage("")
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ phone, code })
    })

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.error)
      return
    }

    setAuthorized(true)
  }

  if (authorized === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
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
                className="w-full bg-yellow-500 text-white py-3 rounded-xl"
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
                className="w-full bg-yellow-500 text-white py-3 rounded-xl"
              >
                Verify & Login
              </button>
            </>
          )}

          {message && (
            <p className="text-sm text-center mt-4 text-red-500">
              {message}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to Your Project Portal
        </h1>
        <p className="text-gray-600">
          Your projects will appear here soon.
        </p>
      </div>
    </div>
  )
}