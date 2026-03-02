# Architecture

## System Overview

ShotStack is a modern web application built on the Next.js framework with a serverless architecture. It uses a decoupled frontend/backend approach with Supabase providing backend-as-a-service functionality.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐   │
│  │   Next.js App    │     │  Library UI      │     │   Mobile Web      │   │
│  │   (Dashboard)    │     │  (Vite React)    │     │   (Responsive)    │   │
│  └────────┬─────────┘     └────────┬─────────┘     └────────┬─────────┘   │
│           │                        │                        │              │
│           └────────────────────────┼────────────────────────┘              │
│                                    │                                         │
│                                    ▼                                         │
│                         ┌─────────────────────┐                             │
│                         │   Vercel Edge Network │                            │
│                         │   (CDN + Caching)    │                             │
│                         └──────────┬────────────┘                             │
│                                    │                                         │
└────────────────────────────────────┼─────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              API LAYER                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                      Next.js API Routes                               │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │  /api/auth  │  │ /api/upload │  │/api/screens │  │ /api/stats  │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                    Supabase Client (REST/GraphQL)                    │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
└────────────────────────────────────┼─────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DATA LAYER                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────┐          ┌────────────────────────────────────┐    │
│  │   Supabase Auth     │          │        Supabase Database          │    │
│  │   ─────────────     │          │        ──────────────────         │    │
│  │   • User signup     │          │   ┌────────────────────────────┐   │    │
│  │   • Login/logout    │          │   │      screenshots           │   │    │
│  │   • Session mgmt    │          │   │      ─────────────         │   │    │
│  │   • OAuth providers │          │   │   id: UUID (PK)            │   │    │
│  └─────────────────────┘          │   │   user_id: UUID (FK)        │   │    │
│                                    │   │   title: TEXT              │   │    │
│  ┌─────────────────────┐          │   │   image_url: TEXT          │   │    │
│  │   Supabase Storage  │          │   │   created_at: TIMESTAMP   │   │    │
│  │   ─────────────     │          │   │   ...                     │   │    │
│  │   • Screenshot blobs│          │   └────────────────────────────┘   │    │
│  │   • Thumbnails      │          └────────────────────────────────────┘    │
│  │   • CDN delivery    │                                                   │
│  └─────────────────────┘                                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Components

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout + ThemeProvider
│   ├── page.tsx                 # Home (redirects to dashboard)
│   ├── dashboard/
│   │   ├── page.tsx             # Dashboard with stats + activity
│   │   └── layout.tsx           # Dashboard layout with sidebar
│   ├── upload/
│   │   └── page.tsx             # Upload page
│   └── library/
│       └── page.tsx             # Library redirect
│
├── components/
│   ├── navbar.tsx               # Top navigation bar
│   │   ├── Logo + Links
│   │   ├── Theme toggle (dark/light)
│   │   └── Mobile menu
│   │
│   └── sidebar.tsx              # Side navigation
│       ├── Main nav items
│       └── Bottom nav items
│
└── apps/library-ui/             # Standalone Vite React app
    └── src/
        ├── components/
        │   ├── ScreenshotCard
        │   ├── ScreenshotGrid
        │   ├── SearchFilter
        │   ├── UploadForm
        │   └── ViewToggle
        ├── data/mockData.ts
        ├── types/index.ts
        └── App.tsx
```

## Data Flow

### User Upload Flow

```
1. User selects image file
       │
       ▼
2. Frontend validates file (type, size)
       │
       ▼
3. Upload to Supabase Storage
       │
       ▼
4. Get public URL of uploaded file
       │
       ▼
5. Create database record (screenshot metadata)
       │
       ▼
6. Update UI with new screenshot
```

### Dashboard Data Flow

```
1. Dashboard loads
       │
       ▼
2. Fetch user stats (total screenshots, downloads, views)
       │
       ▼
3. Fetch recent activity
       │
       ▼
4. Render stats cards + activity list
```

## Technology Stack Details

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend Framework | Next.js 14 | React SSR, routing, API routes |
| UI Library | React 18 | Component-based UI |
| Styling | Tailwind CSS | Utility-first CSS |
| Icons | Lucide React | Consistent icon set |
| Theme | next-themes | Dark/light mode |
| Backend | Supabase | Database, Auth, Storage |
| Deployment | Vercel | Serverless hosting, CDN |
| Database | PostgreSQL | Relational data |
| Storage | Supabase Storage | File storage |

## Security

- **Row Level Security (RLS)** - Database-level access control
- **Environment Variables** - Secrets never exposed to client
- **Supabase Anon Key** - Limited permissions for frontend
- **Service Role Key** - Server-side only operations

## Scaling Considerations

- **Vercel Edge Network** - Global CDN for static assets
- **Supabase Connection Pooling** - Efficient database connections
- **Image Optimization** - Next.js Image component for optimization
- **Code Splitting** - Automatic by Next.js
