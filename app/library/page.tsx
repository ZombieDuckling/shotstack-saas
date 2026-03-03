'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Eye,
  Filter,
  Grid3X3,
  List,
  RefreshCw,
  Search,
  Trash2,
  Upload,
  X,
} from 'lucide-react'
import {
  deleteLibraryScreenshot,
  getReadableSource,
  listLibraryScreenshots,
  LibraryScreenshot,
} from '@/lib/library/screenshots'

type ViewMode = 'grid' | 'list'

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function ImagePreviewModal({
  item,
  onClose,
}: {
  item: LibraryScreenshot
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto rounded-xl bg-card">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
        >
          <X className="h-5 w-5" />
        </button>
        <img
          src={item.url}
          alt={item.name}
          className="w-full h-auto rounded-xl"
        />
        <div className="p-4 border-t">
          <h3 className="font-semibold">{item.name}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span>{formatDate(item.createdAt)}</span>
            <span>{item.size}</span>
          </div>
          {item.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LibraryPage() {
  const [items, setItems] = useState<LibraryScreenshot[]>([])
  const [source, setSource] = useState<'supabase' | 'local'>('local')
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string>('All')
  const [view, setView] = useState<ViewMode>('grid')
  const [previewItem, setPreviewItem] = useState<LibraryScreenshot | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const result = await listLibraryScreenshots()
    setItems(result.items)
    setSource(result.source)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this screenshot?')) return
    
    setDeleting(id)
    await deleteLibraryScreenshot(id)
    setItems((prev) => prev.filter((item) => item.id !== id))
    setDeleting(null)
  }

  const tags = useMemo(() => {
    const allTags = new Set<string>()
    items.forEach((item) => item.tags.forEach((tag) => allTags.add(tag)))
    return ['All', ...Array.from(allTags)]
  }, [items])

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery =
        query.length === 0 ||
        item.name.toLowerCase().includes(query.toLowerCase())

      const matchesTag =
        activeTag === 'All' || item.tags.some((tag) => tag === activeTag)

      return matchesQuery && matchesTag
    })
  }, [activeTag, items, query])

  const totalSize = useMemo(() => {
    return `${filteredItems.length} assets`
  }, [filteredItems.length])

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Library</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">Screenshot Library</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Browse, filter, and review your uploaded screenshots in one place.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={load}
              disabled={loading}
              className="inline-flex items-center rounded-md border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <span className="rounded-full border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              Data source: {getReadableSource(source)}
            </span>
            <Link
              href="/upload"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload New
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search screenshots"
              className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none ring-primary/20 transition focus:ring-2"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-md border p-1">
              <button
                onClick={() => setView('grid')}
                className={`rounded px-2 py-1 text-xs font-medium ${
                  view === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`rounded px-2 py-1 text-xs font-medium ${
                  view === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            <span className="rounded-md border bg-muted px-2 py-1 text-xs text-muted-foreground">
              {totalSize}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Filter className="h-3.5 w-3.5" /> Tags
          </span>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeTag === tag
                  ? 'bg-primary text-primary-foreground'
                  : 'border bg-background text-muted-foreground hover:bg-muted'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <div className="mt-6 rounded-2xl border bg-card p-10 text-center text-sm text-muted-foreground">
          Loading your library...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="mt-6 rounded-2xl border bg-card p-10 text-center">
          <p className="text-lg font-semibold">No screenshots found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search or upload new screenshots.
          </p>
          <Link
            href="/upload"
            className="mt-4 inline-flex items-center text-sm font-medium text-primary"
          >
            Start uploading <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      ) : (
        <section
          className={`mt-6 ${
            view === 'grid'
              ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'
              : 'space-y-3'
          }`}
        >
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className={`group overflow-hidden rounded-xl border bg-card shadow-sm ${
                view === 'list' ? 'flex items-center gap-4 p-3' : ''
              }`}
            >
              <div 
                className={`relative ${view === 'grid' ? 'cursor-pointer' : ''}`}
                onClick={() => view === 'grid' && setPreviewItem(item)}
              >
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className={`object-cover ${
                    view === 'grid' ? 'h-48 w-full' : 'h-24 w-36 rounded-lg border'
                  }`}
                />
                {view === 'grid' && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
              <div className={view === 'grid' ? 'p-4' : 'min-w-0 flex-1'}>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="truncate text-sm font-semibold sm:text-base">{item.name}</h3>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deleting === item.id}
                    className="shrink-0 rounded p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    title="Delete screenshot"
                  >
                    {deleting === item.id ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>{formatDate(item.createdAt)}</span>
                  <span>{item.size}</span>
                </div>
                {item.tags.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={`${item.id}-${tag}`}
                        className="rounded-full border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </section>
      )}

      {previewItem && (
        <ImagePreviewModal item={previewItem} onClose={() => setPreviewItem(null)} />
      )}
    </main>
  )
}
