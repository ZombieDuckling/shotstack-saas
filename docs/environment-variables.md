# Environment Variables

This document details all environment variables used in the ShotStack application.

## Required Variables

### Supabase Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key (public) | Yes |

### Server-Side Only Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (secret) | Yes (production) |

## Where to Find These Values

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings** (gear icon) > **API**
4. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** secret → `SUPABASE_SERVICE_ROLE_KEY` (click "Reveal" to see)

## Example `.env.local`

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Variable Prefixes

### `NEXT_PUBLIC_` Prefix

Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Use these for:
- Supabase URL
- Public configuration

### Server-Only Variables

Variables without the `NEXT_PUBLIC_` prefix are only available server-side:
- `SUPABASE_SERVICE_ROLE_KEY` - Never expose to client

## Security Notes

1. **Never commit** `.env.local` or `.env.production` to version control
2. The `.gitignore` already excludes `.env*` files
3. Use different keys for development and production
4. Rotate keys periodically
5. Never log sensitive variables to console

## Vercel Environment Variables

When deploying to Vercel, add these in your project settings:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** > **Environment Variables**
4. Add each variable:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbG...` | All |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbG...` | Production |

## Local Development

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your values.

## Troubleshooting

### "Missing Supabase environment variables"

Make sure `.env.local` exists and contains valid values, then restart the dev server.

### "Failed to fetch"

Check that your Supabase URL is correct and your project is not paused.

### "JWT malformed"

Your `NEXT_PUBLIC_SUPABASE_ANON_KEY` may be incorrect or expired.
