import { createClient } from '@supabase/supabase-js';
import type { Database } from '../lib/database.types';
import { env } from './env';

export const supabase = createClient<Database>(
  env.supabase.url,
  env.supabase.anonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      storageKey: 'taskmanager.auth.token',
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
);