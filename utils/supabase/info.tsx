/* Supabase config – use env vars so no secrets in repo (GitGuardian / security) */

export const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? ""
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ""