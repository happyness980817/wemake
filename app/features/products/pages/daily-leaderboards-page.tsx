import type { Route } from "./+types/daily-leaderboards-page";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.year}-${params.month}-${params.day} Leaderboard - WeMake` },
    { name: "description", content: `Top products of ${params.year}-${params.month}-${params.day}` },
  ];
}

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, month, day } = params;

  return {
    year,
    month,
    day,
    products: [],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {
    success: true,
  };
}

export default function DailyLeaderboardsPage({ loaderData, params }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">
        {loaderData.year}-{loaderData.month}-{loaderData.day} Leaderboard
      </h1>
      <div className="grid gap-4">{/* Daily leaderboard list */}</div>
    </div>
  );
}
