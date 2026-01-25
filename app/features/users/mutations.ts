import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const updateUser = async (
  client: SupabaseClient<Database>,
  {
    id,
    name,
    role,
    headline,
    bio,
  }: {
    id: string;
    name: string;
    role: "developer" | "designer" | "salesperson" | "other";
    headline: string;
    bio: string;
  },
) => {
  const { data, error } = await client
    .from("profiles")
    .update({ name, role, headline, bio })
    .eq("profile_id", id);
  if (error) throw error;
};
