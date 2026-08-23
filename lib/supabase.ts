import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://gfudwnuzcyhwojrzomex.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_zsNCufb8zxf3yoB78C34vA_1Fjjs-KU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export const publicSupabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
