import type { Route } from "./+types/all-leaderboards-page";
import { data, isRouteErrorResponse } from "react-router";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import { getAllTimeProductsByLikes, getAllTimeProductsPages } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "All time leaderboards | Wemake",
    },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { serverSideClient: client, headers } = makeSSRClient(request);
  const limit = 10;
  const url = new URL(request.url);
  const products = await getAllTimeProductsByLikes(client, {
    limit,
    page: Number(url.searchParams.get("page")) || 1,
  });
  const totalPages = await getAllTimeProductsPages(client, { limit });
  return data({ products, totalPages }, { headers });
};

export default function AllLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title="All-Time Leaderboards"
        subtitle="See all products inside Wemake"
      />
      <div className="space-y-5 w-full max-w-3xl mx-auto">
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            tagline={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            likesCount={product.likes}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.data.message} / {error.data.error_code}
      </div>
    );
  }
  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }
  return <div>Unknown error</div>;
}
