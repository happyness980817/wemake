import type { Route } from "./+types/monthly-leaderboards-page";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.month}/${params.year} Leaderboard | Wemake` },
    { name: "description", content: `Top products of ${params.month}/${params.year}` },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
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

export default function MonthlyLeaderboardsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">
        Top Products of {loaderData.month}/{loaderData.year}
      </h1>
      <div className="grid gap-4">{/* Monthly leaderboard list */}</div>
    </div>
  );
}
