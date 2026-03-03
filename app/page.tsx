import Link from 'next/link'
import { ArrowRight, Folder, LayoutDashboard, Upload } from 'lucide-react'

const highlights = [
  {
    title: 'Faster Review Cycles',
    description: 'Capture, upload, and share visual updates without friction.',
  },
  {
    title: 'Organized Library',
    description: 'Search and filter screenshots across projects and milestones.',
  },
  {
    title: 'Env-Safe Data Layer',
    description: 'Runs with Supabase or local fallbacks for reliable dev workflows.',
  },
]

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-3xl border bg-card p-8 shadow-sm sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">ShotStack SaaS</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Screenshot workflows that stay polished from upload to library.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          Keep product feedback visual, searchable, and consistent across your team.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Open Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/upload"
            className="inline-flex items-center rounded-md border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Try Upload Flow
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="rounded-2xl border bg-card p-5 shadow-sm">
            <h2 className="text-base font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <Link href="/dashboard" className="rounded-2xl border bg-card p-5 shadow-sm transition-colors hover:bg-muted/50">
          <LayoutDashboard className="h-5 w-5 text-primary" />
          <p className="mt-3 text-sm font-semibold">Dashboard</p>
          <p className="mt-1 text-xs text-muted-foreground">Overview, activity, and quick actions.</p>
        </Link>
        <Link href="/upload" className="rounded-2xl border bg-card p-5 shadow-sm transition-colors hover:bg-muted/50">
          <Upload className="h-5 w-5 text-primary" />
          <p className="mt-3 text-sm font-semibold">Upload</p>
          <p className="mt-1 text-xs text-muted-foreground">Drag-drop screenshots with fallback support.</p>
        </Link>
        <Link href="/library" className="rounded-2xl border bg-card p-5 shadow-sm transition-colors hover:bg-muted/50">
          <Folder className="h-5 w-5 text-primary" />
          <p className="mt-3 text-sm font-semibold">Library</p>
          <p className="mt-1 text-xs text-muted-foreground">Filter and browse all screenshots in one place.</p>
        </Link>
      </section>
    </main>
  )
}
