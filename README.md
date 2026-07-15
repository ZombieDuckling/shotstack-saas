# ShotStack SaaS

A modern screenshot management platform built with Next.js, Tailwind CSS, and Supabase.

## Overview

ShotStack is a SaaS application that allows users to upload, organize, manage, and share screenshots. It provides features like dashboard analytics, library management, and quick actions for screenshot workflows.

## Features

- **Dashboard** - View analytics and recent activity
- **Upload** - Upload new screenshots with metadata
- **Library** - Browse and manage your screenshot collection
- **Dark Mode** - Automatic light/dark theme switching
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Authentication**: Supabase Auth

## Project Structure

```
shotstack-saas/
├── app/                    # Next.js App Router pages + API routes
│   ├── dashboard/          # Metrics + launch control center
│   ├── upload/             # Upload flow (Supabase + local fallback)
│   ├── library/            # Screenshot library with delete support
│   ├── pricing/            # Plan and checkout entrypoint
│   ├── auth/               # Supabase auth callback route
│   ├── api/                # Checkout + Stripe webhook scaffolding
│   ├── layout.tsx          # Root layout + nav shell
│   └── page.tsx            # Marketing/launch home
├── components/             # Shared UI components
│   ├── navbar.tsx          # Top navigation and auth state
│   ├── sidebar.tsx         # App navigation
│   └── theme-provider.tsx  # Theme handling
├── lib/
│   ├── supabase/           # Browser/server clients and helpers
│   ├── library/            # Screenshot data access layer
│   └── billing/            # Plan metadata + pricing utils
├── middleware.ts           # Auth guards for protected routes
├── docs/                   # Setup/deploy architecture docs
├── package.json            # Scripts and dependencies
└── tailwind.config.cjs     # Tailwind CSS configuration
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Supabase account (for production)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd shotstack-saas
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Configure your environment variables (see [Environment Variables](./docs/environment-variables.md))

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

See the [Deployment Runbook](./docs/deployment-runbook.md) for detailed instructions on deploying to Vercel with Supabase.

## Documentation

- [Setup Guide](./docs/setup-guide.md)
- [Architecture](./docs/architecture.md)
- [Environment Variables](./docs/environment-variables.md)
- [Deployment Runbook](./docs/deployment-runbook.md)

## Project status

This project is marked as **finished for now** as of March 4, 2026.
The core MVP flow is in place:

- `/`, `/dashboard`, `/upload`, `/pricing`, and `/library` routes are live
- Supabase integration is wired with setup docs
- Stripe checkout and webhook scaffolding are present
- `dev` branch is build-clean and ready to resume when needed

## Next steps

When work resumes, prioritize production hardening:

1. Add end-to-end tests for upload, auth, and checkout flows.
2. Connect real Stripe products, prices, and webhook secrets.
3. Add monitoring, error tracking, and backup/restore checks.
4. Complete release checklist and merge `dev` to `main`.

## License

MIT
