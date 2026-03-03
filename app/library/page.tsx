import { Image as ImageIcon } from 'lucide-react'

const screenshots = [
  { id: 1, name: 'Screenshot #1284', tags: ['design'], time: '2 min ago' },
  { id: 2, name: 'Screenshot #1283', tags: ['ui'], time: '15 min ago' },
  { id: 3, name: 'Screenshot #1282', tags: ['prototype'], time: '1 hour ago' },
  { id: 4, name: 'Screenshot #1281', tags: ['mockup'], time: '3 hours ago' },
  { id: 5, name: 'Screenshot #1280', tags: ['design'], time: '5 hours ago' },
  { id: 6, name: 'Screenshot #1279', tags: ['ui'], time: '1 day ago' },
]

export default function LibraryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Library</h1>
        <p className="text-muted-foreground mt-1">
          Browse and manage all your screenshots.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {screenshots.map((screenshot) => (
          <div
            key={screenshot.id}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="aspect-video rounded-md bg-muted flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-3">
              <p className="font-medium">{screenshot.name}</p>
              <div className="mt-2 flex gap-2">
                {screenshot.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{screenshot.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
