import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const claimIdea = async (
  client: SupabaseClient<Database>,
  ideaId: number,
  userId: string,
) => {
  const { error } = await client
    .from("ideas")
    .update({ claimed_by: userId, claimed_at: new Date().toISOString() })
    .eq("idea_id", ideaId)
    .single();
  if (error) throw error;
};
