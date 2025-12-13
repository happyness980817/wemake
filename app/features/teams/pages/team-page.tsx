import type { Route } from "./+types/team-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Team | Wemake" }];
};

export default function TeamPage({}: Route.ComponentProps) {
  return <div></div>;
}
