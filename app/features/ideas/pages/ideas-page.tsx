import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/ideas-page";
import { IdeaCard } from "../components/idea-card";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Ideas | Wemake" }, { name: "description", content: "See all ideas from our community" }];
};

export default function IdeasPage({}: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero title="Business Ideas" subtitle="Buy and sell your brilliant Business/Startup ideas here." />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={index}
            id={`ideaId-${index}`}
            title="AI-driven marketplace that matches underutilized industrial equipment with startups, handles financing, and optimizes logistics to reduce downtime."
            viewCount={100}
            timestamp="12 hours ago"
            likeCount={100}
            claimed={false}
          />
        ))}
      </div>
    </div>
  );
}
