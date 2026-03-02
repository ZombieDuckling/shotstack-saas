import { Upload, Image, FileImage, X, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function UploadPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Screenshots</h1>
        <p className="text-muted-foreground mt-1">
          Upload and organize your screenshots in one place.
        </p>
      </div>

      <div className="rounded-lg border-2 border-dashed border-border p-12 text-center transition-colors hover:border-primary/50">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">Drop screenshots here</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          or click to browse from your computer
        </p>
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Image className="h-4 w-4" />
            <span>PNG</span>
          </div>
          <div className="flex items-center gap-1">
            <FileImage className="h-4 w-4" />
            <span>JPG</span>
          </div>
          <div className="flex items-center gap-1">
            <FileImage className="h-4 w-4" />
            <span>GIF</span>
          </div>
          <div className="flex items-center gap-1">
            <FileImage className="h-4 w-4" />
            <span>WebP</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Upload Options</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="auto-organize"
              className="mt-1 h-4 w-4 rounded border-border"
              defaultChecked
            />
            <div>
              <label htmlFor="auto-organize" className="text-sm font-medium">
                Auto-organize by date
              </label>
              <p className="text-xs text-muted-foreground">
                Screenshots will be automatically sorted by capture date
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="remove-duplicates"
              className="mt-1 h-4 w-4 rounded border-border"
              defaultChecked
            />
            <div>
              <label htmlFor="remove-duplicates" className="text-sm font-medium">
                Remove duplicates
              </label>
              <p className="text-xs text-muted-foreground">
                Automatically detect and skip duplicate screenshots
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="compress"
              className="mt-1 h-4 w-4 rounded border-border"
            />
            <div>
              <label htmlFor="compress" className="text-sm font-medium">
                Compress images
              </label>
              <p className="text-xs text-muted-foreground">
                Optimize file size without losing quality
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/50 p-6">
        <h3 className="font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          Pro Tips
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• Drag and drop multiple files at once</li>
          <li>• Use keyboard shortcuts (Ctrl/Cmd + V) to paste screenshots</li>
          <li>• Screenshots up to 50MB are supported</li>
          <li>• Batch upload up to 100 screenshots at a time</li>
        </ul>
      </div>
    </div>
  )
}
