import { Image, Download, Eye, Clock, TrendingUp, Plus } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Total Screenshots', value: '1,284', icon: Image, change: '+12%' },
  { label: 'Total Downloads', value: '8,521', icon: Download, change: '+8%' },
  { label: 'Total Views', value: '24,892', icon: Eye, change: '+23%' },
  { label: 'Storage Used', value: '4.2 GB', icon: Clock, change: '+5%' },
]

const recentActivity = [
  { id: 1, title: 'Screenshot #1284', action: 'Uploaded', time: '2 minutes ago' },
  { id: 2, title: 'Screenshot #1283', action: 'Downloaded', time: '15 minutes ago' },
  { id: 3, title: 'Screenshot #1282', action: 'Viewed', time: '1 hour ago' },
  { id: 4, title: 'Screenshot #1281', action: 'Uploaded', time: '3 hours ago' },
  { id: 5, title: 'Screenshot #1280', action: 'Downloaded', time: '5 hours ago' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s an overview of your screenshots.
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                {stat.change}
              </div>
            </div>
            <div className="mt-4 text-2xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image className="h-4 w-4 text-primary" />
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

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="mt-4 grid gap-3">
            <Link
              href="/upload"
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <div className="flex items-center space-x-3">
                <Plus className="h-5 w-5 text-primary" />
                <span className="font-medium">Upload Screenshot</span>
              </div>
            </Link>
            <Link
              href="/library"
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <div className="flex items-center space-x-3">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image className="h-5 w-5 text-primary" />
                <span className="font-medium">View Library</span>
              </div>
            </Link>
            <Link
              href="/settings"
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <div className="flex items-center space-x-3">
                <Download className="h-5 w-5 text-primary" />
                <span className="font-medium">Export All</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
