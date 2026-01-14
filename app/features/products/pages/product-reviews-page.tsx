import type { Route } from "./+types/product-reviews-page";
import { Button } from "~/common/components/ui/button";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import { ReviewCard } from "~/features/products/components/review-card";
import CreateReviewDialog from "~/features/products/components/create-review-dialog";
import { useOutletContext } from "react-router";
import { getReviews } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Reviews | Wemake" },
    { name: "description", content: "Product reviews page" },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const reviews = await getReviews(Number(params.productId));
  return { reviews };
};

export default function ProductReviewsPage({
  loaderData,
}: Route.ComponentProps) {
  const { review_count } = useOutletContext<{ review_count: string }>();
  return (
    <Dialog>
      <div className="space-y-10 max-w-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {review_count} {review_count === "1" ? "Review" : "Reviews"}
          </h2>
          <DialogTrigger>
            <Button variant="secondary">Write a review</Button>
          </DialogTrigger>
        </div>
        <div className="space-y-20">
          {loaderData.reviews.map((review) => (
            <ReviewCard
              key={review.review_id}
              authorName={review.user.name}
              username={review.user.username}
              avatarURL={review.user.avatar}
              rating={review.rating}
              content={review.review}
              timestamp={review.created_at}
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}
