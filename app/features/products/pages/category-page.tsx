import type { Route } from "./+types/category-page";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";

export const meta = ({ params }: Route.MetaArgs) => {
  return [{ title: `Developer Tools | WeMake` }, { name: "description", content: `Browse Developer Tools products` }];
};

export default function CategoryPage() {
  return (
    <div className="space-y-10">
      <Hero title="Developer Tools" subtitle="Tools for developers" />
      <div className="space-y-5 w-full max-w-3xl mx-auto">
        {Array.from({ length: 11 }).map((_, index) => (
          <ProductCard
            key={index}
            id={`productId-${index}`}
            name={`Product Name ${index}`}
            description={`Product Description ${index}`}
            commentCount={123}
            viewCount={123}
            likeCount={123}
          />
        ))}
      </div>
      <ProductPagination totalPages={10} />
    </div>
  );
}
