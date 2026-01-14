import { IdeaCard } from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Dashboard Ideas | Wemake" }];
};

export default function DashboardIdeasPage({}: Route.ComponentProps) {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold mb-6">Your Claimed Ideas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={index}
            id={index + 1}
            title="AI-driven marketplace that matches underutilized industrial equipment with startups, handles financing, and optimizes logistics to reduce downtime."
            viewCount={100}
            timestamp="12 hours ago"
            likesCount={100}
            claimed={false}
          />
        ))}
      </div>
    </div>
  );
}
