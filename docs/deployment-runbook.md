# Deployment Runbook

This runbook covers deploying ShotStack to Vercel with Supabase as the backend.

## Prerequisites

- Vercel account
- Supabase account
- Git repository hosted on GitHub/GitLab/Bitbucket

## Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Browser   │─────▶│   Vercel    │─────▶│  Supabase   │
│   (User)    │◀─────│  (Server)   │◀─────│ (Database)  │
└─────────────┘      └─────────────┘      └─────────────┘
                                              │
                                              ▼
                                        ┌─────────────┐
                                        │  Storage    │
                                        │ (Screenshots)│
                                        └─────────────┘
```

## Step 1: Prepare Supabase

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New Project**
3. Enter project details:
   - **Name**: `shotstack-production`
   - **Database Password**: Generate a strong password
   - **Region**: Select closest to your users
4. Click **Create new project** and wait for setup

### Configure Database

1. In Supabase dashboard, go to **SQL Editor**
2. Run the following SQL to create tables:

```sql
-- Create screenshots table
CREATE TABLE IF NOT EXISTS screenshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
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

-- Enable Row Level Security
ALTER TABLE screenshots ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own screenshots"
  ON screenshots FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own screenshots"
  ON screenshots FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own screenshots"
  ON screenshots FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own screenshots"
  ON screenshots FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_screenshots_user_id ON screenshots(user_id);
CREATE INDEX IF NOT EXISTS idx_screenshots_created_at ON screenshots(created_at DESC);
```

### Configure Storage

1. Go to **Storage** in Supabase sidebar
2. Click **New bucket**
3. Configure:
   - **Name**: `screenshots`
   - **Public bucket**: Enable (toggle on)
   - **File size limit**: 10MB
   - **Allowed file types**: Images (jpg, png, gif, webp)
4. Click **Create bucket**

5. Add storage policies:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'screenshots' AND
    auth.role() = 'authenticated'
  );

-- Allow users to view public files
CREATE POLICY "Allow public view"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'screenshots');

-- Allow users to delete own files
CREATE POLICY "Allow authenticated delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'screenshots' AND
    auth.role() = 'authenticated'
  );
```

### Get API Keys

1. Go to **Settings** > **API**
2. Copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key (click Reveal)

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New...** > **Project**
3. Import your Git repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build` (default)
   - **Output Directory**: `.next` (default)
5. Click **Deploy**

### Option B: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

## Step 3: Configure Environment Variables

### In Vercel Dashboard

1. Go to your project in Vercel
2. Navigate to **Settings** > **Environment Variables**
3. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIs...` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIs...` | Production |

4. Click **Save**

### Trigger Redeploy

After adding environment variables, Vercel should automatically redeploy. If not:

1. Go to **Deployments**
2. Click **...** on latest deployment
3. Select **Redeploy**

## Step 4: Configure Redirects (Optional)

If using the library-ui as a separate app, add redirects in `vercel.json` or Next.js config:

```json
{
  "rewrites": [
    {
      "source": "/library/:path*",
      "destination": "/library-ui/:path*"
    }
  ]
}
```

## Step 5: Verify Deployment

1. Open your Vercel project URL
2. Verify:
   - [ ] Homepage loads and redirects to dashboard
   - [ ] Dashboard displays stats
   - [ ] Dark/light mode toggle works
   - [ ] Navigation links work

## Common Issues

### Build Fails

- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (use 18.x)

### 500 Error on Load

- Check Supabase credentials in environment variables
- Verify database tables exist
- Check Vercel function logs

### Images Not Loading

- Verify Supabase Storage bucket exists
- Check storage policies
- Ensure bucket is public

## Rollback Procedure

1. Go to **Deployments** in Vercel
2. Find the last working deployment
3. Click **...** > **Promote to Production**

## Monitoring

### Vercel Analytics

1. Go to **Analytics** in Vercel dashboard
2. Enable web vitals tracking

### Supabase Logs

1. Go to **Logs** in Supabase dashboard
2. Filter by table or time range

## Scaling

- **Vercel Pro**: For higher limits
- **Supabase Pro**: For larger database/storage
- Consider image optimization service for heavy loads

## Backup & Recovery

### Database Backups

Supabase provides automatic daily backups on Pro plans. For manual backups:

```bash
# Export using pg_dump
pg_dump "postgres://postgres:[password]@db.[project].supabase.co:5432/postgres" > backup.sql
```

### Restore

```bash
# Restore from backup
psql "postgres://postgres:[password]@db.[project].supabase.co:5432/postgres" < backup.sql
```
