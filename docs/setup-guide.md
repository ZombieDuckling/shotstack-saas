# Setup Guide

This guide will help you set up the ShotStack SaaS application locally.

## Prerequisites

Ensure you have the following installed:

- **Node.js** 18.x or later (recommended: use [nvm](https://github.com/nvm-sh/nvm) for version management)
- **npm** 9.x or later (comes with Node.js) or **yarn** 1.22+
- **Git** for version control
- **Supabase CLI** (optional, for local development)

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd shotstack-saas
```

## Step 2: Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

## Step 3: Environment Configuration

### Create Environment File

Copy the example environment file:

```bash
cp .env.example .env.local
```

### Configure Environment Variables

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

See [Environment Variables](./environment-variables.md) for detailed configuration.

### Get Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or select an existing one
3. Navigate to **Settings** > **API**
4. Copy the **Project URL** and **anon public** key

## Step 4: Database Setup

### Using Supabase (Production)

1. Run migrations in Supabase dashboard or via CLI
2. Ensure tables are created with proper RLS policies

### Database Schema (Expected)

```sql
-- Core screenshot records (used by lib/library/screenshots.ts)
create table if not exists public.screenshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  url text not null,
  thumbnail text,
  size text,
  created_at timestamptz not null default now()
);

-- Optional tagging support
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

create table if not exists public.screenshot_tags (
  screenshot_id uuid references public.screenshots(id) on delete cascade,
  tag_id uuid references public.tags(id) on delete cascade,
  primary key (screenshot_id, tag_id)
);

alter table public.screenshots enable row level security;
alter table public.tags enable row level security;
alter table public.screenshot_tags enable row level security;

-- Minimal policies (adjust for your multi-tenant rules)
create policy "read screenshots" on public.screenshots
for select using (auth.uid() is not null);

create policy "insert screenshots" on public.screenshots
for insert with check (auth.uid() is not null);

create policy "delete screenshots" on public.screenshots
for delete using (auth.uid() is not null);
```

### Storage Bucket

Create a public bucket named `screenshots` in Supabase Storage.

- Path pattern used by app: `uploads/<timestamp>-<filename>`
- If storage/table setup is incomplete, app automatically falls back to local browser storage for dev previews.


## Step 5: Run Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Step 6: Verify Installation

1. Open browser to http://localhost:3000
2. You should be redirected to /dashboard
3. Verify the navbar and sidebar are rendering
4. Test dark/light mode toggle

## Troubleshooting

### Port Already in Use

If port 3000 is occupied:

```bash
npm run dev -- -p 3001
```

### Missing Dependencies

If you encounter missing dependency errors:

```bash
npm install
```

### Environment Variables Not Loading

Ensure `.env.local` is in the project root and restart the dev server:

```bash
npm run dev
```

## Next Steps

- Review the [Architecture](./architecture.md) documentation
- Set up [Deployment](./deployment-runbook.md) for production
