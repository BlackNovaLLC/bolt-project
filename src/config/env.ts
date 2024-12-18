import { z } from 'zod';

const envSchema = z.object({
  supabase: z.object({
    url: z.string().min(1, 'Supabase URL is required'),
    anonKey: z.string().min(1, 'Supabase anonymous key is required'),
  }),
  app: z.object({
    name: z.string().default('Task Manager'),
    url: z.string().default('http://localhost:5173'),
  }),
  features: z.object({
    notifications: z.boolean().default(true),
    fileUpload: z.boolean().default(true),
  }),
});

function validateEnv() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase credentials. Please check your .env file and ensure both VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
    );
  }

  return envSchema.parse({
    supabase: {
      url: supabaseUrl,
      anonKey: supabaseAnonKey,
    },
    app: {
      name: import.meta.env.VITE_APP_NAME || 'Task Manager',
      url: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
    },
    features: {
      notifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS !== 'false',
      fileUpload: import.meta.env.VITE_ENABLE_FILE_UPLOAD !== 'false',
    },
  });
}

export const env = validateEnv();