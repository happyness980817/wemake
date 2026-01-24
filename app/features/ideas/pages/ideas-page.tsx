import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/ideas-page";
import { IdeaCard } from "../components/idea-card";
import { getIdeas } from "../queries";
import { data } from "react-router";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Ideas | Wemake" },
    { name: "description", content: "See all ideas from our community" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const ideas = await getIdeas(client, { limit: 10 });
  const userId = await getLoggedInUserId(client);
  return data({ ideas, userId }, { headers });
};

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero
        title="Business Ideas"
        subtitle="Buy and sell your brilliant Business/Startup ideas here."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loaderData.ideas.map((idea) => {
          const isOwner = idea.claimed_by === loaderData.userId;
          return (
            <IdeaCard
              key={idea.idea_id}
              id={idea.idea_id}
              title={isOwner ? "Check this idea in your dashboard" : idea.idea}
              viewCount={idea.views}
              timestamp={idea.created_at}
              likesCount={idea.likes}
              claimed={idea.claimed}
              owner={isOwner}
            />
          );
        })}
      </div>
    </div>
  );
}
