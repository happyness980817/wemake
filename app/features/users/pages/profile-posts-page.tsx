import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "./+types/profile-posts-page";
import { getUserPosts } from "../queries";
import { data } from "react-router";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Profile Posts | Wemake" }];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const posts = await getUserPosts(client, params.username);
  return data({ posts }, { headers });
};

export default function ProfilePostsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      {loaderData.posts.map((post) => (
        <PostCard
          key={post.post_id}
          id={post.post_id}
          title={post.title}
          authorName={post.author}
          authorAvatarURL={post.author_avatar}
          category={post.topic}
          timestamp={post.created_at}
          votesCount={post.upvotes}
          expanded
        />
      ))}
    </div>
  );
}
