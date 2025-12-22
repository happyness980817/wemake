import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/teams-page";
import { TeamCard } from "../components/team-card";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Teams | Wemake" }];
};

export default function TeamsPage({}: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero title="Teams" subtitle="Find a team looking for a new member" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 11 }).map((_, index) => (
          <TeamCard
            key={index}
            id={`teamId-${index}`}
            username="paul"
            avatarURL="https://github.com/happyness980817.png"
            skills={[
              "Full-stack",
              "Developer",
              "React",
              "TypeScript",
              "Node.js",
            ]}
            description="To build a platform"
          />
        ))}
      </div>
    </div>
  );
}
