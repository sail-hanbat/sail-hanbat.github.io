import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gfudwnuzcyhwojrzomex.supabase.co';
const supabasePublishableKey = 'sb_publishable_zsNCufb8zxf3yoB78C34vA_1Fjjs-KU';

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
