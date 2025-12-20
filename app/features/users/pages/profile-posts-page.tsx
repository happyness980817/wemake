import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "./+types/profile-posts-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Profile Posts | Wemake" }];
};

export default function ProfilePostsPage() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <PostCard
          key={index}
          id={`postId-${index}`}
          title="What is the best way to learn React?"
          authorName="John Doe"
          authorAvatarURL="https://github.com/shadcn.png"
          category="Productivity"
          timestamp="12 hours ago"
          likesCount={123}
          expanded
        />
      ))}
    </div>
  );
}
