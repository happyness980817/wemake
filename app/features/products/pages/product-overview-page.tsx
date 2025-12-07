import type { Route } from "./+types/product-overview-page";
import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Product Overview | Wemake" }, { name: "description", content: "Product overview page" }];
};

export default function ProductOverviewPage({ params: { productId } }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
          <div>
            <h1 className="text-5xl font-bold">Product Name</h1>
            <p className="text-2xl font-light">Product Description</p>
            <div className="mt-5 flex items-center gap-2">
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} className="w-4 h-4" />
                ))}
              </div>
              <span className="text-muted-foreground">100 reviews</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="lg" className="text-lg h-14 px-10">
            View Product
          </Button>
          <Button size="lg" className="text-lg h-12 px-10">
            <ChevronUpIcon className="w-4 h-4" />
            Upvote (100)
          </Button>
        </div>
      </div>
      <div className="flex gap-2.5">
        <Button variant={"outline"} asChild>
          <Link to={`/products/${productId}/overview`}>Overview</Link>
        </Button>
        <Button variant={"outline"} asChild>
          <Link to={`/products/${productId}/reviews`}>Reviews</Link>
        </Button>
      </div>
      <div className="space-y-10">
        <div className="space-y-1">
          <h3 className="text-lg font-bold">What is this product?</h3>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold">How does this product work?</h3>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>
      </div>
    </div>
  );
}
