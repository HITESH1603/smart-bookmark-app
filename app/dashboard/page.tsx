"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Bookmark = {
  id: number
  title: string
  url: string
}

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const fetchBookmarks = async () => {
    const { data, error } = await supabase.from("bookmarks").select("*").order('id', { ascending: false })
    if (error) console.error(error)
    else setBookmarks(data as Bookmark[])
  }

  useEffect(() => {
    fetchBookmarks()
  }, [])

  const addBookmark = async () => {
    if (!title || !url) return
    const { data, error } = await supabase
      .from("bookmarks")
      .insert([{ title, url }])
      .select()
    if (error) console.error(error)
    else setBookmarks(prev => [...prev, ...(data as Bookmark[])])
    setTitle("")
    setUrl("")
  }

  const deleteBookmark = async (id: number) => {
    const { error } = await supabase.from("bookmarks").delete().eq("id", id)
    if (error) console.error(error)
    else setBookmarks(prev => prev.filter(b => b.id !== id))
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Bookmarks</h1>

      <div className="mb-4 flex gap-2">
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          className="border p-2 rounded"
        />
        <input 
          type="text" 
          placeholder="URL" 
          value={url} 
          onChange={e => setUrl(e.target.value)} 
          className="border p-2 rounded"
        />
        <button onClick={addBookmark} className="bg-blue-600 text-white p-2 rounded">
          Add Bookmark
        </button>
      </div>

      <ul>
        {bookmarks.map(b => (
          <li key={b.id} className="flex justify-between items-center border-b py-2">
            <a href={b.url} target="_blank" className="text-blue-500">{b.title}</a>
            <button onClick={() => deleteBookmark(b.id)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
