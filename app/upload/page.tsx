'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, FileImage, Loader2, UploadCloud } from 'lucide-react'
import { getReadableSource, uploadLibraryScreenshot } from '@/lib/library/screenshots'

type UploadResult = {
  id: string
  name: string
  source: string
}

export default function UploadPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [results, setResults] = useState<UploadResult[]>([])

  const onPickFiles = () => inputRef.current?.click()

  const onFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setIsUploading(true)
    setStatus(null)

    const nextResults: UploadResult[] = []

    try {
      for (const file of Array.from(files)) {
        const { item, source } = await uploadLibraryScreenshot(file)
        nextResults.push({ id: item.id, name: item.name, source: getReadableSource(source) })
      }

      setResults((prev) => [...nextResults, ...prev].slice(0, 10))
      const sourceSummary = Array.from(new Set(nextResults.map((r) => r.source))).join(' + ')
      setStatus(`Uploaded ${nextResults.length} screenshot${nextResults.length > 1 ? 's' : ''} via ${sourceSummary}.`)
    } catch {
      setStatus('Upload failed. Please retry.')
    } finally {
      setIsUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Upload Screenshots</h1>
        <p className="text-muted-foreground">Push new screenshots to your library. Supabase is used when configured, with local fallback in dev.</p>
      </div>

      <button
        type="button"
        onClick={onPickFiles}
        className="w-full rounded-2xl border-2 border-dashed border-border bg-card p-12 text-center transition hover:border-primary/50 hover:bg-muted/40"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <UploadCloud className="h-7 w-7 text-primary" />
        </div>
        <h2 className="mt-4 text-lg font-semibold">Drop screenshots here or click to upload</h2>
        <p className="mt-2 text-sm text-muted-foreground">PNG, JPG, GIF, WEBP • up to 50MB per file</p>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
        multiple
        className="hidden"
        onChange={(event) => onFilesSelected(event.target.files)}
      />

      <div className="rounded-2xl border bg-card p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Upload status</h3>
        <div className="mt-3 flex items-center gap-2 text-sm">
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span>Uploading...</span>
            </>
          ) : status ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>{status}</span>
            </>
          ) : (
            <span className="text-muted-foreground">No uploads yet in this session.</span>
          )}
        </div>

        {results.length > 0 && (
          <ul className="mt-4 space-y-2">
            {results.map((result) => (
              <li key={result.id} className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2 text-sm">
                <span className="truncate">{result.name}</span>
                <span className="ml-3 text-xs text-muted-foreground">{result.source}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl border bg-muted/40 p-5">
        <h3 className="flex items-center gap-2 font-semibold">
          <FileImage className="h-4 w-4 text-primary" />
          Launch checklist
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• Confirm Supabase bucket <code>screenshots</code> exists</li>
          <li>• Verify table writes in <code>screenshots</code> after upload</li>
          <li>• Spot-check library render and delete action</li>
        </ul>
        <Link href="/library" className="mt-4 inline-flex text-sm font-medium text-primary hover:underline">
          Open library verification →
        </Link>
      </div>
    </div>
  )
}
