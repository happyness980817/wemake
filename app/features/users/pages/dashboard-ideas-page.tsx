import { IdeaCard } from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";
import { makeSSRClient } from "~/supa-client";
import { getClaimedIdeas } from "~/features/ideas/queries";
import { getLoggedInUserId } from "~/features/users/queries";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Dashboard Ideas | Wemake" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const ideas = await getClaimedIdeas(client, { userId });
  return { ideas };
};

export default function DashboardIdeasPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold mb-6">Your Claimed Ideas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.idea_id}
            id={idea.idea_id}
            title={idea.idea}
            claimed={true}
            owner={true}
          />
        ))}
      </div>
    </div>
  );
}
