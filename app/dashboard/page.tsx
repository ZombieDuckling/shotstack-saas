import { Camera, Download, Eye, Folder, Plus, TrendingUp, Upload } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Total Screenshots', value: '1,284', icon: Camera, change: '+12%' },
  { label: 'Total Downloads', value: '8,521', icon: Download, change: '+8%' },
  { label: 'Total Views', value: '24,892', icon: Eye, change: '+23%' },
  { label: 'Storage Used', value: '4.2 GB', icon: Folder, change: '+5%' },
]

const recentActivity = [
  { id: 1, title: 'Dashboard Release Candidate', action: 'Uploaded', time: '2 minutes ago' },
  { id: 2, title: 'Pricing Hero Refresh', action: 'Uploaded', time: '15 minutes ago' },
  { id: 3, title: 'Mobile Upload QA', action: 'Viewed', time: '1 hour ago' },
  { id: 4, title: 'Library Tagging Flow', action: 'Downloaded', time: '3 hours ago' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Launch-ready snapshot of uploads, engagement, and pipeline health.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/library" className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted">
              Open Library
            </Link>
            <Link
              href="/upload"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Upload
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                {stat.label}
              </div>
              <div className="flex items-center text-xs text-emerald-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                {stat.change}
              </div>
            </div>
            <p className="mt-4 text-2xl font-bold">{stat.value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Camera className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="mt-4 grid gap-3">
            <Link href="/upload" className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent">
              <Upload className="h-5 w-5 text-primary" />
              <span className="font-medium">Upload Screenshots</span>
            </Link>
            <Link href="/library" className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent">
              <Folder className="h-5 w-5 text-primary" />
              <span className="font-medium">Review Library</span>
            </Link>
            <Link href="/pricing" className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="font-medium">Manage Plan</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
