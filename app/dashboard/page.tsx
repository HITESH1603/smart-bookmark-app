"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const router = useRouter()

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push("/login")
      } else {
        setUser(data.user)
        fetchBookmarks()
      }
    }

    getUser()
  }, [])

  // Fetch bookmarks
  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) {
      setBookmarks(data)
    }
  }

  // Add bookmark
  const addBookmark = async () => {
    if (!title || !url) return

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ])

    setTitle("")
    setUrl("")
  }

  // Delete bookmark
  const deleteBookmark = async (id: number) => {
    await supabase.from("bookmarks").delete().eq("id", id)
  }

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("bookmarks-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => {
          fetchBookmarks()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }
return (
  <div className="min-h-screen bg-gray-100 flex justify-center p-6">
    <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Smart Bookmark Manager
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Add Bookmark Form */}
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Bookmark Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none p-3 rounded-lg"
        />
        <button
          onClick={addBookmark}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
        >
          Add Bookmark
        </button>
      </div>

      {/* Bookmark List */}
      <div className="space-y-4">
        {bookmarks.length === 0 && (
          <p className="text-gray-500 text-center">
            No bookmarks yet. Add your first one 🚀
          </p>
        )}

        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="border border-gray-200 bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:shadow-md transition"
          >
            <div className="max-w-[75%]">
              <p className="font-semibold text-gray-800 truncate">
                {bookmark.title}
              </p>
              <a
                href={bookmark.url}
                target="_blank"
                className="text-blue-600 text-sm break-all hover:underline"
              >
                {bookmark.url}
              </a>
            </div>

            <button
              onClick={() => deleteBookmark(bookmark.id)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
)
}