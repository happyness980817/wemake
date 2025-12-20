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
          id={`productId-${index}`}
          name={`Product Name ${index}`}
          description={`Product Description ${index}`}
          commentCount={123}
          viewCount={123}
          likesCount={123}
        />
      ))}
    </div>
  );
}
