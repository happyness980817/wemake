import { productColumns } from "../products/queries";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const getUserProfile = async (client: SupabaseClient<Database>,username: string) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
      profile_id,
      name,
      username,
      avatar,
      role,
      headline,
      bio
      `
    )
    .eq("username", username)
    .single();
  if (error) throw error;
  return data;
};

export const getUserProducts = async (client: SupabaseClient<Database>,username: string) => {
  const { data, error } = await client
    .from("products")
    .select(
      `
      ${productColumns},
      profiles!products_profile_id_profiles_profile_id_fk!inner (
        profile_id
      )
      `
    )
    .eq("profiles.username", username)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const getUserPosts = async (client: SupabaseClient<Database>,username: string) => {
  const { data, error } = await client
    .from("community_post_list_view")
    .select("*")
    .eq("author_username", username)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};
