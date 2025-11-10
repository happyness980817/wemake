import type { Route } from "./+types/yearly-leaderboards-page";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.year} Leaderboard - WeMake` },
    { name: "description", content: `Top products of ${params.year}` },
  ];
}

export function loader({ request, params }: Route.LoaderArgs) {
  const { year } = params;

  return {
    year,
    products: [],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {
    success: true,
  };
}

export default function YearlyLeaderboardsPage({ loaderData, params }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{loaderData.year} Leaderboard</h1>
      <div className="grid gap-4">{/* Yearly leaderboard list */}</div>
    </div>
  );
}
