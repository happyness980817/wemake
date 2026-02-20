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
  const { count, error: countError } = await client
    .from("message_room_members")
    .select("*", { count: "exact", head: true })
    .eq("message_room_id", Number(messageRoomId))
    .eq("profile_id", userId);
  if (countError) throw countError;
  if (count === 0) {
    throw new Error("You are not a member of this message room");
  }
  const { data, error } = await client
    .from("messages")
    .select(
      `
      *,
      sender:profiles!sender_id!inner(
        name,
        avatar,
        profile_id
      )
    `,
    )
    .eq("message_room_id", Number(messageRoomId))
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
};

export const getRoomRecipient = async (
  client: SupabaseClient<Database>,
  { messageRoomId, userId }: { messageRoomId: string; userId: string },
) => {
  const { count, error: countError } = await client
    .from("message_room_members")
    .select("*", { count: "exact", head: true })
    .eq("message_room_id", +messageRoomId)
    .eq("profile_id", userId);
  if (countError) throw countError;
  if (count === 0) {
    throw new Error("You are not a member of this message room");
  }
  const { data, error } = await client
    .from("message_room_members")
    .select(
      `
      profile:profiles!profile_id!inner(
        name,
        avatar
      )
      `,
    )
    .eq("message_room_id", +messageRoomId)
    .neq("profile_id", userId)
    .single();
  if (error) throw error;
  return data;
};

export const sendMessageToRoom = async (
  client: SupabaseClient<Database>,
  {
    messageRoomId,
    message,
    userId,
  }: {
    messageRoomId: string;
    message: string;
    userId: string;
  },
) => {
  const { count, error: countError } = await client
    .from("message_room_members")
    .select("*", { count: "exact", head: true })
    .eq("message_room_id", Number(messageRoomId))
    .eq("profile_id", userId);
  if (countError) {
    throw countError;
  }
  if (count === 0) {
    throw new Error("Message room not found");
  }
  const { error } = await client.from("messages").insert({
    message_room_id: Number(messageRoomId),
    content: message,
    sender_id: userId,
  });
  if (error) throw error;
};
