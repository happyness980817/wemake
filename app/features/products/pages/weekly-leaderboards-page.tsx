import type { Route } from "./+types/weekly-leaderboards-page";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.year} Week ${params.week} Leaderboard - WeMake` },
    { name: "description", content: `Top products of week ${params.week}, ${params.year}` },
  ];
}

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, week } = params;

  return {
    year,
    week,
    products: [],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {
    success: true,
  };
}

export default function WeeklyLeaderboardsPage({ loaderData, params }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">
        {loaderData.year} Week {loaderData.week} Leaderboard
      </h1>
      <div className="grid gap-4">{/* Weekly leaderboard list */}</div>
    </div>
  );
}
