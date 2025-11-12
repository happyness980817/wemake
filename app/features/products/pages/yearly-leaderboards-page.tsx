import type { Route } from "./+types/yearly-leaderboards-page";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.year} Leaderboard | Wemake` },
    { name: "description", content: `Top products of ${params.year}` },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  return {
    year: params.year,
    products: [], // Add yearly leaderboard logic
  };
}

export default function YearlyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Top Products of {loaderData.year}</h1>
      {/* Add yearly leaderboard content */}
    </div>
  );
}
