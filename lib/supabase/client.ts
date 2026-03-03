import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createBrowserClient(supabaseUrl!, supabaseAnonKey!)
  : null

function createNoopClient() {
  const message =
    'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'

  return {
    auth: {
      async signInWithPassword() {
        return { data: null, error: { message } }
      },
      async signUp() {
        return { data: null, error: { message } }
      },
      async signOut() {
        return { error: null }
      },
      async getUser() {
        return { data: { user: null }, error: { message } }
      },
      onAuthStateChange() {
        return { data: { subscription: { unsubscribe() {} } } }
      },
    },
  }
}

export function createClient() {
  return supabase ?? createNoopClient()
}
