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
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Dashboard page
│   ├── upload/             # Upload page
│   ├── library/            # Library page (redirects to library-ui)
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Home page (redirects to dashboard)
├── components/             # Shared React components
│   ├── navbar.tsx         # Navigation bar
│   └── sidebar.tsx        # Sidebar navigation
├── apps/
│   └── library-ui/        # Standalone Vite React app for library
├── public/                # Static assets
├── docs/                  # Documentation
├── package.json           # Root package config
├── next.config.js         # Next.js configuration
└── tailwind.config.js     # Tailwind CSS configuration
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

## License

MIT
