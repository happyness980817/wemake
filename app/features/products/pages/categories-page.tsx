import { CategoryCard } from "../components/category-card";
import type { Route } from "./+types/categories-page";
import { Hero } from "~/common/components/hero";

export const meta: Route.MetaFunction = ({}: Route.MetaArgs) => {
  return [{ title: "Categories - WeMake" }, { name: "description", content: "Browse product categories" }];
};

export default function CategoriesPage() {
  return (
    <div className="space-y-10">
      <Hero title="Categories" subtitle="Browse products by categories" />
      <div className="grid grid-cols-4 gap-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <CategoryCard
            key={index}
            id={`categoryId-${index}`}
            name={`Category Name ${index}`}
            description={`Category Description ${index}`}
          />
        ))}
      </div>
    </div>
  );
}
