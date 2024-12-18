import { useMemo } from 'react';
import { env } from '../config/env';

export function useEnv() {
  return useMemo(() => ({
    supabase: {
      url: env.supabase.url,
      anonKey: env.supabase.anonKey,
    },
    app: {
      name: env.app.name,
      url: env.app.url,
    },
    features: {
      notifications: env.features.notifications,
      fileUpload: env.features.fileUpload,
    },
  }), []);
}