import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const createPost = async (
  client: SupabaseClient<Database>,
  {
    title,
    content,
    category,
    userId,
  }: {
    title: string;
    content: string;
    category: string;
    userId: string;
  },
) => {
  const { data: categoryData, error: categoryError } = await client
    .from("topics")
    .select("topic_id")
    .eq("slug", category)
    .single();
  if (categoryError) {
    throw categoryError;
  }
  const { data, error } = await client
    .from("posts")
    .insert({
      title,
      content,
      topic_id: categoryData.topic_id,
      profile_id: userId,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data;
};
