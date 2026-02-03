import { data, NavLink, Outlet } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { StarIcon } from "lucide-react";
import { ChevronUpIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/product-overview-layout";
import { getProductById } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = ({ loaderData }: Route.MetaArgs) => {
  return [
    { title: `${loaderData.product.name} - Overview | Wemake` },
    { name: "description", content: "Product overview page" },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { productId } = params;
  const product = await getProductById(client, parseInt(productId));
  return data({ product }, { headers });
};

export default function ProductOverviewLayout({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl overflow-hidden shadow-xl bg-primary">
            <img
              src={loaderData.product.icon}
              alt={loaderData.product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold">{loaderData.product.name}</h1>
            <p className="text-2xl font-light">
              {loaderData.product.description}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-4 h-4"
                    fill={
                      i < Math.floor(loaderData.product.average_rating)
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {loaderData.product.reviews}{" "}
                {loaderData.product.reviews === "1" ? "Review" : "Reviews"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="lg" className="h-14 px-10 text-lg">
            View Product
          </Button>
          <Button size="lg" className="h-14 px-10 text-lg">
            <ChevronUpIcon className="w-4 h-4" />
            Upvote ({loaderData.product.upvotes})
          </Button>
        </div>
      </div>
      <div className="flex gap-2.5">
        <NavLink
          end
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "outline" }),
              isActive && "bg-accent text-foreground",
            )
          }
          to={`/products/${loaderData.product.product_id}/overview`}
        >
          Overview
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "outline" }),
              isActive && "bg-accent text-foreground",
            )
          }
          to={`/products/${loaderData.product.product_id}/reviews`}
        >
          Reviews
        </NavLink>
      </div>
      <div>
        <Outlet
          context={{
            product_id: loaderData.product.product_id,
            description: loaderData.product.description,
            how_it_works: loaderData.product.how_it_works,
            review_count: loaderData.product.reviews,
          }}
        />
        {/* product 데이터를 자식 컴포넌트에 전달 */}
      </div>
    </div>
  );
}
