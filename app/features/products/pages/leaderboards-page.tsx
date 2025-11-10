import type { Route } from "./+types/leaderboards-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Leaderboards - WeMake" }, { name: "description", content: "Top products leaderboards" }];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    leaderboards: [],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {
    success: true,
  };
}

export default function LeaderboardsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Leaderboards</h1>
      <div className="grid gap-4">{/* Leaderboards navigation */}</div>
    </div>
  );
}
