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
-- Screenshots table
CREATE TABLE screenshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE screenshots ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own screenshots" ON screenshots
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own screenshots" ON screenshots
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own screenshots" ON screenshots
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own screenshots" ON screenshots
  FOR DELETE USING (auth.uid() = user_id);
```

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
