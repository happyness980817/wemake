import type { Route } from "./+types/category-page";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.category} - WeMake` },
    { name: "description", content: `Products in ${params.category} category` },
  ];
}

export function loader({ request, params }: Route.LoaderArgs) {
  const { category } = params;

  return {
    category,
    products: [],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {
    success: true,
  };
}

export default function CategoryPage({ loaderData, params }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{loaderData.category}</h1>
      <div className="grid gap-4">{/* Category products list */}</div>
    </div>
  );
}
