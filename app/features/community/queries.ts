// import db from "~/db";
// import { posts, postUpvotes, topics } from "./schema";
// import { profiles } from "../users/schema";
// import { count, desc, eq } from "drizzle-orm";

// export const getTopics = async () => {
//   const allTopics = await db
//     .select({
//       name: topics.name,
//       slug: topics.slug,
//     })
//     .from(topics);
//   return allTopics;
// };

// export const getPosts = async () => {
//   const allPosts = await db
//     .select({
//       id: posts.post_id,
//       title: posts.title,
//       createdAt: posts.created_at,
//       topic: topics.name,
//       authorName: profiles.name,
//       authorAvatarURL: profiles.avatar,
//       username: profiles.username,
//       upvotes: count(postUpvotes.post_id),
//     })
//     .from(posts)
//     .innerJoin(topics, eq(posts.topic_id, topics.topic_id))
//     .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
//     .leftJoin(postUpvotes, eq(posts.post_id, postUpvotes.post_id))
//     .groupBy(
//       posts.post_id,
//       profiles.name,
//       profiles.avatar,
//       profiles.username,
//       topics.name
//     )
//     .orderBy(desc(posts.created_at));
//   return allPosts;
// };

import client from "~/supa-client";
import { DateTime } from "luxon";

export const getTopics = async () => {
  const { data, error } = await client.from("topics").select("name, slug");
  if (error) throw Error(error.message);
  return data;
};

export const getPosts = async ({
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
}) => {
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
  if (error) throw Error(error.message);
  return data;
};

export const getPostById = async (postId: number) => {
  const { data, error } = await client
    .from("community_post_detail")
    .select("*")
    .eq("post_id", postId)
    .single();
  if (error) throw Error(error.message);
  return data;
};
