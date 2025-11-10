import type { Route } from "./+types/monthly-leaderboards-page";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.year}-${params.month} Leaderboard - WeMake` },
    { name: "description", content: `Top products of ${params.year}-${params.month}` },
  ];
}

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, month } = params;

  return {
    year,
    month,
    products: [],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {
    success: true,
  };
}

export default function MonthlyLeaderboardsPage({ loaderData, params }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">
        {loaderData.year}-{loaderData.month} Leaderboard
      </h1>
      <div className="grid gap-4">{/* Monthly leaderboard list */}</div>
    </div>
  );
}
