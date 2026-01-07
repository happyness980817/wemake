import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/teams-page";
import { TeamCard } from "../components/team-card";
import { getTeams } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Teams | Wemake" }];
};

export const loader = async () => {
  const teams = await getTeams({ limit: 11 });
  return { teams };
};

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero title="Teams" subtitle="Find a team looking for a new member" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loaderData.teams.map((team) => (
          <TeamCard
            key={team.team_id}
            id={team.team_id}
            leaderUsername={team.team_leader.username}
            leaderAvatarURL={team.team_leader.avatar}
            roles={team.roles.split(",")}
            description={team.product_description}
          />
        ))}
      </div>
    </div>
  );
}
