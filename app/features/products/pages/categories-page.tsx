import { CategoryCard } from "../components/category-card";
import { getCategories } from "../queries";
import type { Route } from "./+types/categories-page";
import { Hero } from "~/common/components/hero";
import { data } from "react-router";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = ({}: Route.MetaArgs) => {
  return [
    { title: "Categories | Wemake" },
    { name: "description", content: "Browse product categories" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const categories = await getCategories(client);
  return data({ categories }, { headers });
};

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="Categories" subtitle="Browse products by categories" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {loaderData.categories.map((category) => (
          <CategoryCard
            key={category.category_id}
            id={category.category_id}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
    </div>
  );
}
