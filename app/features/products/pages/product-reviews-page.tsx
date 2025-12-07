import type { Route } from "./+types/product-reviews-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "제품 리뷰 | Wemake" }, { name: "description", content: "제품에 대한 리뷰를 확인하세요." }];
};

export default function ProductReviewsPage() {
  return <div>Product Reviews Page</div>;
}
