'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Loader2, Trash2 } from 'lucide-react'
import { deleteLibraryScreenshot, getReadableSource, listLibraryScreenshots, type LibraryScreenshot } from '@/lib/library/screenshots'

export default function LibraryPage() {
  const [items, setItems] = useState<LibraryScreenshot[]>([])
  const [source, setSource] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setLoading(true)
      const result = await listLibraryScreenshots()
      if (!mounted) return
      setItems(result.items)
      setSource(getReadableSource(result.source))
      setLoading(false)
    }

    load()

    return () => {
      mounted = false
    }
  }, [])

  const onDelete = async (id: string) => {
    setDeleting(id)
    const result = await deleteLibraryScreenshot(id)
    setItems((prev) => prev.filter((item) => item.id !== id))
    setSource(getReadableSource(result.source))
    setDeleting(null)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Library</h1>
        <p className="text-muted-foreground">Browse and manage uploaded screenshots.</p>
        <p className="text-xs text-muted-foreground">Data source: <span className="font-medium text-foreground">{source || 'Loading...'}</span></p>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center rounded-2xl border bg-card">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border bg-card p-8 text-center text-muted-foreground">
          No screenshots found yet.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-xl border bg-card shadow-sm">
              <div className="relative aspect-video bg-muted">
                <Image src={item.thumbnail || item.url} alt={item.name} fill className="object-cover" unoptimized />
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <p className="line-clamp-1 font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()} • {item.size}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">{tag}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <a href={item.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:underline">
                    Open
                  </a>
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    disabled={deleting === item.id}
                    className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-60"
                  >
                    {deleting === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
