"use client"

import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
    redirectTo: "https://smart-bookmark-8mfcm403a-hitesh-mahtos-projects-a7c8483a.vercel.app/",
  },
    })

    if (error) {
      console.log("Error:", error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Smart Bookmark App
        </h1>

        <p className="text-gray-500 mb-8">
          Save and manage your bookmarks securely.
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold shadow-md"
        >
          Sign in with Google
        </button>

        <p className="text-xs text-gray-400 mt-6">
          Secure login powered by Google OAuth
        </p>
      </div>
    </div>
  )
}
