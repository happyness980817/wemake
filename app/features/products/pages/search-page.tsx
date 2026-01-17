import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/search-page";
import { z } from "zod";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import { data, Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { getPagesBySearch, getProductsBySearch } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Search - WeMake" },
    { name: "description", content: "Search for products" },
  ];
};

const paramsSchema = z.object({
  query: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { serverSideClient: client, headers } = makeSSRClient(request);
  const url = new URL(request.url);
  // console.log(url);
  // console.log(Object.fromEntries(url.searchParams), url.searchParams);
  const { success, data: parsedData } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw new Error("Invalid parameters");
  }
  if (parsedData.query === "") {
    return data({ products: [], totalPages: 1 }, { headers });
  }
  const [products, totalPages] = await Promise.all([
    getProductsBySearch(client, {
      query: parsedData.query,
      page: parsedData.page,
    }),
    getPagesBySearch(client, { query: parsedData.query }),
  ]);
  return data({ products, totalPages }, { headers });
};

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="Search" subtitle="Search for products by title or tagline" />
      <Form className="flex justify-center max-w-screen-sm items-center mx-auto gap-2">
        <Input
          name="query"
          placeholder="Search for products"
          className="text-lg"
        />
        <Button type="submit">Search</Button>
      </Form>
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
