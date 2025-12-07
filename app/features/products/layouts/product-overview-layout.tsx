import { NavLink, Outlet } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { StarIcon } from "lucide-react";
import { ChevronUpIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/product-overview-layout";

export default function ProductOverviewLayout({ params: { productId } }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary"></div>
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
        <NavLink
          className={({ isActive }) =>
            cn(buttonVariants({ variant: "outline" }), isActive && "bg-accent text-foreground")
          }
          to={`/products/${productId}/overview`}
        >
          Overview
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn(buttonVariants({ variant: "outline" }), isActive && "bg-accent text-foreground")
          }
          to={`/products/${productId}/reviews`}
        >
          Reviews
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
