import type { Route } from "./+types/product-reviews-page";
import { Button } from "~/common/components/ui/button";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import { ReviewCard } from "~/features/products/components/review-card";
import CreateReviewDialog from "~/features/products/components/create-review-dialog";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Product Reviews | Wemake" }, { name: "description", content: "Product reviews page" }];
};

export default function ProductReviewsPage() {
  return (
    <Dialog>
      <div className="space-y-10 max-w-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">10 reviews</h2>
          <DialogTrigger>
            <Button variant="secondary">Write a review</Button>
          </DialogTrigger>
        </div>
        <div className="space-y-20">
          {Array.from({ length: 10 }).map((_, index) => (
            <ReviewCard
              key={index}
              authorName="John Doe"
              username="@johndoe"
              avatarFallback="JD"
              avatarURL="https://github.com/facebook.png"
              rating={4}
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
              timestamp="10 hours ago"
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}
