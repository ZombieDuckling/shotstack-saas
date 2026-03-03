'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  FileImage,
  Image,
  Loader2,
  Tag,
  Upload,
  X,
} from 'lucide-react'
import {
  getReadableSource,
  LibraryScreenshot,
  uploadLibraryScreenshot,
} from '@/lib/library/screenshots'
import { isSupabaseConfigured } from '@/lib/supabase/client'

const SUGGESTED_TAGS = ['Dashboard', 'Marketing', 'UI', 'Landing', 'Release', 'Feature']

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploaded, setUploaded] = useState<LibraryScreenshot[]>([])
  const [sourceLabel, setSourceLabel] = useState<'supabase' | 'local'>('local')
  const [statusMessage, setStatusMessage] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const totalBytes = useMemo(() => {
    return selectedFiles.reduce((sum, file) => sum + file.size, 0)
  }, [selectedFiles])

  const acceptedFileText = 'PNG, JPG, GIF, WebP up to 50MB each'

  function onFilesIncoming(files: FileList | null) {
    if (!files) return

    const next = Array.from(files).filter((file) => file.type.startsWith('image/'))
    if (next.length === 0) return

    setSelectedFiles((current) => [...current, ...next])
    setStatusMessage('')
  }

  function removeFile(index: number) {
    setSelectedFiles((current) => current.filter((_, currentIndex) => currentIndex !== index))
  }

  function addTag(tag: string) {
    const trimmed = tag.trim()
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags((prev) => [...prev, trimmed])
      setTagInput('')
    }
  }

  function removeTag(tag: string) {
    setSelectedTags((prev) => prev.filter((t) => t !== tag))
  }

  function handleTagKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      addTag(tagInput)
    }
  }

  async function handleUpload() {
    if (selectedFiles.length === 0 || isUploading) return

    setIsUploading(true)
    setStatusMessage('Uploading screenshots...')

    const uploadedItems: LibraryScreenshot[] = []
    let latestSource: 'supabase' | 'local' = 'local'

    for (const file of selectedFiles) {
      const result = await uploadLibraryScreenshot(file, selectedTags)
      uploadedItems.push(result.item)
      latestSource = result.source
    }

    setUploaded((current) => [...uploadedItems, ...current])
    setSourceLabel(latestSource)
    setSelectedFiles([])
    setSelectedTags([])
    setStatusMessage(`Uploaded ${uploadedItems.length} screenshot${uploadedItems.length === 1 ? '' : 's'}.`)
    setIsUploading(false)
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight">Upload Screenshots</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Upload and organize your screenshots in one place.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Runtime source: {isSupabaseConfigured ? 'Supabase enabled' : 'Supabase not configured'}
          </span>
          {!isSupabaseConfigured ? (
            <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              Using local fallback uploads
            </span>
          ) : null}
        </div>
      </section>

      <section
        className={`mt-6 rounded-2xl border-2 border-dashed bg-card p-10 text-center transition-colors ${
          isDragging ? 'border-primary/70 bg-primary/5' : 'border-border'
        }`}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={(event) => {
          event.preventDefault()
          setIsDragging(false)
        }}
        onDrop={(event) => {
          event.preventDefault()
          setIsDragging(false)
          onFilesIncoming(event.dataTransfer.files)
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(event) => onFilesIncoming(event.target.files)}
        />

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mt-4 text-lg font-semibold">Drop screenshots here</h2>
        <p className="mt-2 text-sm text-muted-foreground">or click to browse from your computer</p>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="mt-5 inline-flex items-center rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Choose Files
        </button>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Image className="h-4 w-4" /> PNG
          </span>
          <span className="inline-flex items-center gap-1">
            <FileImage className="h-4 w-4" /> JPG
          </span>
          <span className="inline-flex items-center gap-1">
            <FileImage className="h-4 w-4" /> GIF
          </span>
          <span className="inline-flex items-center gap-1">
            <FileImage className="h-4 w-4" /> WebP
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{acceptedFileText}</p>
      </section>

      <section className="mt-6 rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold">Upload Queue</h3>
          <div className="text-xs text-muted-foreground">
            {selectedFiles.length} files · {(totalBytes / (1024 * 1024)).toFixed(1)} MB
          </div>
        </div>

        {selectedFiles.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No files selected yet.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {selectedFiles.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5">
          <label className="text-sm font-medium">
            <Tag className="mr-1.5 inline h-4 w-4" />
            Tags (optional)
          </label>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add tags..."
                className="h-9 w-full rounded-md border bg-background px-3 pr-8 text-sm outline-none ring-primary/20 focus:ring-2"
              />
              {tagInput && (
                <button
                  type="button"
                  onClick={() => addTag(tagInput)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          {selectedTags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border bg-muted px-2.5 py-1 text-xs font-medium"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1.5 rounded-full p-0.5 hover:bg-muted-foreground/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground">Suggestions:</span>
            {SUGGESTED_TAGS.filter((t) => !selectedTags.includes(t)).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => addTag(tag)}
                className="rounded-full border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            disabled={selectedFiles.length === 0 || isUploading}
            onClick={handleUpload}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
            {isUploading ? 'Uploading...' : 'Upload Screenshots'}
          </button>

          <Link
            href="/library"
            className="inline-flex items-center rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Open Library
          </Link>
        </div>

        {statusMessage ? (
          <p className="mt-4 text-sm text-muted-foreground">
            {statusMessage} Latest destination: {getReadableSource(sourceLabel)}.
          </p>
        ) : null}
      </section>

      {uploaded.length > 0 ? (
        <section className="mt-6 rounded-2xl border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Recent Uploads</h3>
          <ul className="mt-4 space-y-2">
            {uploaded.slice(0, 6).map((item) => (
              <li key={item.id} className="flex items-center justify-between rounded-lg border bg-background px-3 py-2">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.size}</p>
                </div>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  )
}
