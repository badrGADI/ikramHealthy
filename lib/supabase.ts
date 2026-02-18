import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Browser-safe client (anon key) — for reading products on the frontend
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client (service role key) — only used in API routes
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
