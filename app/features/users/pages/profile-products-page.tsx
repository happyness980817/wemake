import { ProductCard } from "~/features/products/components/product-card";
import type { Route } from "./+types/profile-products-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Profile Products | Wemake" }];
};

export default function ProfileProductsPage() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <ProductCard
          key={index}
          id={index}
          name={`Product Name ${index}`}
          tagline={`Product Tagline ${index}`}
          reviewsCount="123"
          viewsCount="123"
          likesCount="123"
        />
      ))}
    </div>
  );
}
