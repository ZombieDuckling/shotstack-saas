'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Folder,
  Image,
  Library,
  Plus,
  TrendingUp,
  Upload,
} from 'lucide-react'
import { listLibraryScreenshots, LibraryScreenshot } from '@/lib/library/screenshots'

function fromNow(value: string) {
  const ms = Date.now() - new Date(value).getTime()
  const minutes = Math.floor(ms / (1000 * 60))
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

function isToday(value: string) {
  const date = new Date(value)
  const now = new Date()
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  )
}

export default function DashboardPage() {
  const [items, setItems] = useState<LibraryScreenshot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const result = await listLibraryScreenshots()
      setItems(result.items)
      setLoading(false)
    }

    load()
  }, [])

  const stats = useMemo(() => {
    return [
      { label: 'Library Assets', value: String(items.length), icon: Library },
      { label: 'Uploaded This Week', value: String(items.slice(0, 7).length), icon: Upload },
      { label: 'Tagged Items', value: String(items.filter((item) => item.tags.length > 0).length), icon: Folder },
      { label: 'New Today', value: String(items.filter((item) => isToday(item.createdAt)).length), icon: Image },
    ]
  }, [items])

  const recentActivity = useMemo(() => {
    return items.slice(0, 5)
  }, [items])

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Dashboard</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">Team Screenshot Workspace</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Monitor your latest uploads and jump into the library quickly.
            </p>
          </div>
          <Link
            href="/upload"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Screenshot
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
              <TrendingUp className="h-3.5 w-3.5 text-green-600" />
            </div>
            <p className="mt-4 text-2xl font-bold">{loading ? '-' : stat.value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          {loading ? (
            <p className="mt-4 text-sm text-muted-foreground">Loading activity...</p>
          ) : recentActivity.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No screenshots yet. Upload your first screenshot.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border bg-background px-3 py-2">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Uploaded</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{fromNow(item.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="mt-4 grid gap-3">
            <Link href="/upload" className="rounded-lg border p-4 transition-colors hover:bg-accent">
              <p className="text-sm font-medium">Upload Screenshot</p>
              <p className="mt-1 text-xs text-muted-foreground">Add new product captures to your workspace.</p>
            </Link>
            <Link href="/library" className="rounded-lg border p-4 transition-colors hover:bg-accent">
              <p className="text-sm font-medium">Browse Library</p>
              <p className="mt-1 text-xs text-muted-foreground">Search and filter screenshots by tags and titles.</p>
            </Link>
            <Link href="/pricing" className="rounded-lg border p-4 transition-colors hover:bg-accent">
              <p className="text-sm font-medium">View Plans</p>
              <p className="mt-1 text-xs text-muted-foreground">Compare usage limits and subscription options.</p>
            </Link>
          </div>
        </article>
      </section>
    </div>
  )
}
