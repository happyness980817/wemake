import { DateTime } from "luxon";
import type { Route } from "./+types/yearly-leaderboards-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";
import {
  getProductsByDateRange,
  getProductsPagesByDateRange,
} from "../queries";
import { PAGE_SIZE } from "../constants";
import { makeSSRClient } from "~/supa-client";

const paramsSchema = z.object({
  year: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
  })
    .setZone("Asia/Seoul")
    .setLocale("ko-KR");
  return [
    {
      title: `Best products of ${date.setLocale("en").toLocaleString({ year: "numeric" })} | Wemake`,
    },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data(
      {
        error_code: "INVALID_PARAMS",
        message: "Invalid parameters",
      },
      {
        status: 400,
      }
    );
  }

  const date = DateTime.fromObject({
    year: parsedData.year,
  }).setZone("Asia/Seoul");
  if (!date.isValid) {
    throw data(
      {
        error_code: "INVALID_DATE",
        message: "Invalid date",
      },
      {
        status: 400,
      }
    );
  }

  const today = DateTime.now().setZone("Asia/Seoul").startOf("year");
  if (date > today) {
    throw data(
      {
        error_code: "FUTURE_DATE",
        message: "You cannot view the leaderboards for a future date",
      },
      {
        status: 400,
      }
    );
  }

  const url = new URL(request.url);
  const products = await getProductsByDateRange(client, {
    startDate: date.startOf("year"),
    endDate: date.endOf("year"),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get("page")) || 1,
  });
  const totalPages = await getProductsPagesByDateRange(client, {
    startDate: date.startOf("year"),
    endDate: date.endOf("year"),
  });
  return data({ products, totalPages, ...parsedData }, { headers });
};

export default function YearlyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
  });
  const previousYear = urlDate.minus({ years: 1 });
  const nextYear = urlDate.plus({ years: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("year"));
  return (
    <div className="space-y-10">
      <Hero
        title="Yearly Leaderboards"
        subtitle={`The best products of ${urlDate.setLocale("en").toLocaleString({ year: "numeric" })}`}
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
            &larr;{" "}
            {previousYear.setLocale("en").toLocaleString({ year: "numeric" })}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
              {nextYear.setLocale("en").toLocaleString({ year: "numeric" })}{" "}
              &rarr;
            </Link>
          </Button>
        ) : null}
      </div>
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
