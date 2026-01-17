import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const getIdeas = async (
  client: SupabaseClient<Database>,
  { limit }: { limit: number }
) => {
  const { data, error } = await client
    .from("ideas_view")
    .select("*")
    .limit(limit);
  if (error) throw error;
  return data;
};

export const getIdea = async (
  client: SupabaseClient<Database>,
  ideaId: string
) => {
  const { data, error } = await client
    .from("ideas_view")
    .select("*")
    .eq("idea_id", parseInt(ideaId))
    .single();
  if (error) throw error;
  return data;
};
