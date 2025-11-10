import type { Route } from "./+types/products-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Products - WeMake" }, { name: "description", content: "Browse all products" }];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    products: [],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {
    success: true,
  };
}

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Products</h1>
      <div className="grid gap-4">{/* Products list component */}</div>
    </div>
  );
}
