import { productColumns } from "../products/queries";
import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "react-router";
import type { Database } from "~/supa-client";

export const getUserById = async (
  client: SupabaseClient<Database>,
  { id }: { id: string },
) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
      profile_id,
      name,
      username,
      avatar,
      bio,
      headline,
      role
      `,
    )
    .eq("profile_id", id)
    .single();
  if (error) throw error;
  return data;
};

export const getUserProfile = async (
  client: SupabaseClient<Database>,
  { username }: { username: string },
) => {
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
      `,
    )
    .eq("username", username)
    .single();
  if (error) throw error;
  return data;
};

export const getUserProducts = async (
  client: SupabaseClient<Database>,
  { username }: { username: string },
) => {
  const { data, error } = await client
    .from("products")
    .select(
      `
      ${productColumns},
      profiles!products_profile_id_profiles_profile_id_fk!inner (
        profile_id
      )
      `,
    )
    .eq("profiles.username", username)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const getUserPosts = async (
  client: SupabaseClient<Database>,
  { username }: { username: string },
) => {
  const { data, error } = await client
    .from("community_post_list_view")
    .select("*")
    .eq("author_username", username)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const getLoggedInUserId = async (client: SupabaseClient<Database>) => {
  const { data, error } = await client.auth.getUser();
  if (error || data.user == null) throw redirect("/auth/login");
  return data.user.id;
};

export const getNotifications = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string },
) => {
  const { data, error } = await client
    .from("notifications")
    .select(
      `
      notification_id,
      type,
      profiles!source_id(
        profile_id,
        name,
        avatar
      ),
      product:products!product_id(
        product_id,
        name
      ),
      post:posts!post_id(
        post_id,
        title,
        content
      ),
      seen,
      created_at
      `,
    )
    .eq("target_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const countNotifications = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string },
) => {
  const { count, error } = await client
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("seen", false)
    .eq("target_id", userId);
  if (error) throw error;
  return count ?? 0;
};

export const getMessages = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string },
) => {
  const { data, error } = await client
    .from("messages_view")
    .select("*")
    .eq("profile_id", userId);
  if (error) throw error;
  return data;
};

export const getMessagesByRoomId = async (
  client: SupabaseClient<Database>,
  { messageRoomId, userId }: { messageRoomId: string; userId: string },
) => {
  const { data, error } = await client
    .from("messages_view")
    .select("*")
    .eq("message_room_id", Number(messageRoomId))
    .eq("profile_id", userId);
  if (error) throw error;
  return data;
};
