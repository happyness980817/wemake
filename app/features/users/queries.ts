import client from "~/supa-client";
import { productColumns } from "../products/queries";

export const getUserProfile = async (username: string) => {
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

export const getUserProducts = async (username: string) => {
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

export const getUserPosts = async (username: string) => {
  const { data, error } = await client
    .from("posts")
    .select("*")
    .eq("username", username)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};
