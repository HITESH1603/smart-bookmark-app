"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" })
    if (error) console.error("Google login error:", error.message)
  }

  // When user returns from Supabase OAuth, check session
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.push("/dashboard") // send logged-in user to dashboard
      }
    }
    checkSession()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">Smart Bookmark App</h1>
        <p className="text-gray-500 mb-8">Save and manage your bookmarks securely.</p>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md"
        >
          Sign in with Google
        </button>
        <p className="text-xs text-gray-400 mt-6">Secure login powered by Google OAuth</p>
      </div>
    </div>
  )
}
