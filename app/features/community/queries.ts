import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";
import { DateTime } from "luxon";

export const getTopics = async (client: SupabaseClient<Database>) => {
  const { data, error } = await client.from("topics").select("name, slug");
  if (error) throw error;
  return data;
};

export const getPosts = async (
  client: SupabaseClient<Database>,
  {
    limit,
    sorting,
    period = "all-time",
    keyword,
    topic,
  }: {
    limit: number;
    sorting: "newest" | "popular";
    period?: "all-time" | "today" | "weekly" | "monthly" | "yearly";
    keyword?: string;
    topic?: string;
  },
) => {
  const baseQuery = client
    .from("community_post_list_view")
    .select(`*`)
    .limit(limit);
  if (sorting === "newest") {
    baseQuery.order("created_at", { ascending: false });
  } else {
    if (period === "all-time") {
      baseQuery.order("upvotes", { ascending: false });
    } else {
      const today = DateTime.now().startOf("day");
      if (period === "today") {
        baseQuery.gte("created_at", today.startOf("day").toISO());
      } else if (period === "weekly") {
        baseQuery.gte("created_at", today.startOf("week").toISO());
      } else if (period === "monthly") {
        baseQuery.gte("created_at", today.startOf("month").toISO());
      } else if (period === "yearly") {
        baseQuery.gte("created_at", today.startOf("year").toISO());
      }
      baseQuery.order("upvotes", { ascending: false });
    }
  }

  if (keyword) {
    baseQuery.ilike("title", `%${keyword}%`); // '%{}%': keyword 를 검색하되, 문자의 위치는 상관없다
  }

  if (topic) {
    baseQuery.eq("topic_slug", topic);
  }

  const { data, error } = await baseQuery;
  if (error) throw error;
  return data;
};

export const getPostById = async (
  client: SupabaseClient<Database>,
  postId: number,
) => {
  const { data, error } = await client
    .from("community_post_detail")
    .select("*")
    .eq("post_id", postId)
    .single();
  if (error) throw error;
  return data;
};

export const getReplies = async (
  client: SupabaseClient<Database>,
  postId: number,
) => {
  const replyQuery = `
  post_reply_id,
  reply,
  created_at,
  user:profiles (
  name,
  avatar,
  username
  )
  `;
  const { data, error } = await client
    .from("post_replies")
    .select(
      `
      ${replyQuery},
      post_replies (
      ${replyQuery}
      )
      `,
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};
