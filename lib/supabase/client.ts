import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase browser client — pakai untuk OAuth / session di Client Components.
 * Prisma tetap dipakai sebagai ORM ke Postgres yang sama (short links, dll.).
 */
export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }
  return createBrowserClient(url, anonKey);
}
