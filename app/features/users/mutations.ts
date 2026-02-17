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

export const updateUserAvatar = async (
  client: SupabaseClient<Database>,
  {
    id,
    avatarUrl,
  }: {
    id: string;
    avatarUrl: string;
  },
) => {
  const { error } = await client
    .from("profiles")
    .update({ avatar: avatarUrl })
    .eq("profile_id", id);
  if (error) throw error;
};

export const checkNotification = async (
  client: SupabaseClient<Database>,
  { userId, notificationId }: { userId: string; notificationId: number },
) => {
  const { data, error } = await client
    .from("notifications")
    .update({ seen: true })
    .eq("notification_id", notificationId)
    .eq("target_id", userId);
  if (error) throw error;
};

export const sendMessage = async (
  client: SupabaseClient<Database>,
  {
    fromUserId,
    toUserId,
    content,
  }: { fromUserId: string; toUserId: string; content: string },
) => {
  const { data, error } = await client
    .rpc("get_room", {
      from_user_id: fromUserId,
      to_user_id: toUserId,
    })
    .maybeSingle();
  if (error) throw error;
  if (data?.message_room_id) {
    await client.from("messages").insert({
      message_room_id: data.message_room_id,
      sender_id: fromUserId,
      content,
    }); // 사용자가 이미 message room에 참여한 경우
    return data.message_room_id;
  } else {
    const { data: roomData, error: roomError } = await client
      .from("message_rooms")
      .insert({})
      .select("message_room_id")
      .single(); // 새 room 생성
    if (roomError) {
      throw roomError;
    }
    await client.from("message_room_members").insert([
      {
        message_room_id: roomData.message_room_id,
        profile_id: fromUserId,
      },
      {
        message_room_id: roomData.message_room_id,
        profile_id: toUserId,
      },
    ]);
    await client.from("messages").insert({
      message_room_id: roomData.message_room_id,
      sender_id: fromUserId,
      content,
    });
    return roomData.message_room_id;
  }
};
