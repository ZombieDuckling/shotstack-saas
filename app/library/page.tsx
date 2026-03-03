'use client'

import { useState } from 'react'
import { Upload, Search, Tag, Grid, List, Image as ImageIcon, X } from 'lucide-react'

const mockScreenshots = [
  { id: '1', name: 'Dashboard Screenshot', tags: ['dashboard', 'ui'], createdAt: '2 hours ago', size: '245 KB' },
  { id: '2', name: 'Landing Page Design', tags: ['design', 'marketing'], createdAt: '5 hours ago', size: '1.2 MB' },
  { id: '3', name: 'API Documentation', tags: ['docs', 'api'], createdAt: '1 day ago', size: '89 KB' },
  { id: '4', name: 'User Profile', tags: ['profile', 'ui'], createdAt: '2 days ago', size: '156 KB' },
  { id: '5', name: 'Settings Panel', tags: ['settings', 'ui'], createdAt: '3 days ago', size: '203 KB' },
  { id: '6', name: 'Mobile App Preview', tags: ['mobile', 'app'], createdAt: '4 days ago', size: '890 KB' },
]

const allTags = ['dashboard', 'ui', 'design', 'marketing', 'docs', 'api', 'profile', 'settings', 'mobile', 'app']

export default function LibraryPage() {
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const filteredScreenshots = mockScreenshots.filter((screenshot) => {
    const matchesSearch =
      search === '' || screenshot.name.toLowerCase().includes(search.toLowerCase())
    const matchesTags =
      selectedTags.length === 0 || selectedTags.some((tag) => screenshot.tags.includes(tag))
    return matchesSearch && matchesTags
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library</h1>
          <p className="text-muted-foreground mt-1">
            Browse and manage your screenshots
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search screenshots..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${
              viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${
              viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
              selectedTags.includes(tag)
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <Tag className="h-3 w-3" />
            {tag}
          </button>
        ))}
        {selectedTags.length > 0 && (
          <button
            onClick={() => setSelectedTags([])}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      {filteredScreenshots.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No screenshots found</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredScreenshots.map((screenshot) => (
            <div
              key={screenshot.id}
              className="group rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium truncate">{screenshot.name}</h3>
              <div className="flex flex-wrap gap-1 mt-2">
                {screenshot.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {screenshot.createdAt} · {screenshot.size}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredScreenshots.map((screenshot) => (
            <div
              key={screenshot.id}
              className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm"
            >
              <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{screenshot.name}</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {screenshot.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground flex-shrink-0">
                {screenshot.createdAt} · {screenshot.size}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
