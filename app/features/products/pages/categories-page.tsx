import type { Route } from "./+types/categories-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Categories - WeMake" }, { name: "description", content: "Browse product categories" }];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    categories: [],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {
    success: true,
  };
}

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Categories</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{/* Categories list */}</div>
    </div>
  );
}
