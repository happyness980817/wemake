import type { Route } from "./+types/category-page";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import {
  getCategory,
  getProductsByCategory,
  getCategoryPages,
} from "../queries";
import { z } from "zod";
import { data } from "react-router";
import { makeSSRClient } from "~/supa-client";

export const meta = ({ params }: Route.MetaArgs) => {
  return [
    { title: `Developer Tools | WeMake` },
    { name: "description", content: `Browse Developer Tools products` },
  ];
};

const categoryIdSchema = z.coerce.number().int();
const pageSchema = z.coerce.number().int().min(1).optional().default(1);

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const url = new URL(request.url);

  const { success: isCategoryIdValid, data: categoryId } =
    categoryIdSchema.safeParse(params.category);
  if (!isCategoryIdValid) throw new Error("Invalid Category ID");

  const { success: isPageValid, data: page } = pageSchema.safeParse(
    url.searchParams.get("page") ?? undefined
  );
  if (!isPageValid) throw new Error("Invalid page");

  const [category, products, totalPages] = await Promise.all([
    getCategory(client, categoryId),
    getProductsByCategory(client, { categoryId, page }),
    getCategoryPages(client, categoryId),
  ]);
  return data({ category, products, totalPages }, { headers });
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title={loaderData.category.name}
        subtitle={loaderData.category.description}
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
