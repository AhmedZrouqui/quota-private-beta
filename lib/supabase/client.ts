import { createClient } from '@supabase/supabase-js';

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isBrowserSupabaseConfigured = () => !!NEXT_PUBLIC_SUPABASE_URL && !!NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createBrowserSupabase = () => {
  if (!isBrowserSupabaseConfigured()) return null;
  return createClient(NEXT_PUBLIC_SUPABASE_URL!, NEXT_PUBLIC_SUPABASE_ANON_KEY!);
};

export const isServerSupabaseConfigured = () => !!SUPABASE_URL && !!SUPABASE_SERVICE_ROLE_KEY;

export const createServerSupabase = () => {
  if (!isServerSupabaseConfigured()) return null;
  return createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
};