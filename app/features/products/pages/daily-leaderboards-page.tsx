import type { Route } from "./+types/daily-leaderboards-page";

export function meta({ params }: Route.MetaArgs) {
  return [
    {
      title: `${params.month}/${params.day}/${params.year} Leaderboard | Wemake`,
    },
    {
      name: "description",
      content: `Top products of ${params.month}/${params.day}/${params.year}`,
    },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  return {
    year: params.year,
    month: params.month,
    day: params.day,
    products: [], // Add daily leaderboard logic
  };
}

export default function DailyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Top Products of {loaderData.month}/{loaderData.day}/{loaderData.year}
      </h1>
      {/* Add daily leaderboard content */}
    </div>
  );
}
