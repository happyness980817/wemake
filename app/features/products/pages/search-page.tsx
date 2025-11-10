import type { Route } from "./+types/search-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Search - WeMake" }, { name: "description", content: "Search products" }];
}

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  return {
    query,
    results: [],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {
    success: true,
  };
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Search</h1>
      <div className="mb-6">{/* Search input form */}</div>
      <div className="grid gap-4">
        {loaderData.query && <p className="text-muted-foreground">Search results for &quot;{loaderData.query}&quot;</p>}
        {/* Search results list */}
      </div>
    </div>
  );
}
