import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/search-page";
import z from "zod";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Search - WeMake" }, { name: "description", content: "Search for products" }];
};

const paramsSchema = z.object({
  query: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});

export const loader = ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  // console.log(url);
  // console.log(Object.fromEntries(url.searchParams), url.searchParams);
  const { success, data: parsedData } = paramsSchema.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {
    throw new Error("Invalid parameters");
  }
  console.log(parsedData);
};

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="Search" subtitle="Search for products by title or description" />
      <Form className="flex justify-center max-w-screen-sm items-center mx-auto gap-2">
        <Input name="query" placeholder="Search for products" className="text-lg" />
        <Button type="submit">Search</Button>
      </Form>
      <div className="space-y-5 w-full max-w-3xl mx-auto">
        {Array.from({ length: 11 }).map((_, index) => (
          <ProductCard
            key={index}
            id={`productId-${index}`}
            name={`Product Name ${index}`}
            description={`Product Description ${index}`}
            commentCount={123}
            viewCount={123}
            likeCount={123}
          />
        ))}
      </div>
      <ProductPagination totalPages={10} />
    </div>
  );
}
