import type { Route } from "./+types/new-product-review-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "제품 리뷰 작성 | Wemake" }, { name: "description", content: "제품에 대한 리뷰를 작성하세요." }];
};

export default function NewProductReviewPage() {
  return <div>New Product Review Page</div>;
}
