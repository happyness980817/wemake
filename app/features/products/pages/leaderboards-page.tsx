import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import type { Route } from "./+types/leaderboards-page";
import { Hero } from "~/common/components/hero";
import { data, Link } from "react-router";
import { getProductsByDateRange } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Leaderboards | Wemake" },
    { name: "description", content: "Top products leaderboards" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { serverSideClient: client, headers } = makeSSRClient(request);
  const [
    dailyProducts,
    weeklyProducts,
    monthlyProducts,
    yearlyProducts,
    allProducts,
  ] = await Promise.all([
    // 병렬 처리
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("day"),
      endDate: DateTime.now().endOf("day"),
      limit: 7,
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("week"),
      endDate: DateTime.now().endOf("week"),
      limit: 7,
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("month"),
      endDate: DateTime.now().endOf("month"),
      limit: 7,
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("year"),
      endDate: DateTime.now().endOf("year"),
      limit: 7,
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().minus({ years: 100 }).startOf("day"),
      endDate: DateTime.now().endOf("day"),
      limit: 7,
    }),
  ]);
  return data(
    {
    dailyProducts,
    weeklyProducts,
    monthlyProducts,
    yearlyProducts,
    allProducts,
    },
    { headers }
  );
};

export default function LeaderboardsPage({ loaderData }: Route.ComponentProps) {
  const {
    dailyProducts,
    weeklyProducts,
    monthlyProducts,
    yearlyProducts,
    allProducts,
  } = loaderData;
  return (
    <div className="space-y-20">
      <Hero
        title="Leaderboards"
        subtitle="The most popular products on Wemake"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Daily Leaderboards
          </h2>
          <p className="text-xl font-light text-foreground">
            See the most popular products on Wemake today
          </p>
        </div>
        {dailyProducts.map((product) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/daily">
            Explore All Products &rarr;
          </Link>
        </Button>
      </div>

      {/* Weekly Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Weekly Leaderboards
          </h2>
          <p className="text-xl font-light text-foreground">
            See the most popular products on Wemake this week
          </p>
        </div>
        {weeklyProducts.map((product) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/weekly">
            Explore All Products &rarr;
          </Link>
        </Button>
      </div>

      {/* Monthly Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Monthly Leaderboards
          </h2>
          <p className="text-xl font-light text-foreground">
            See the most popular products on Wemake this month
          </p>
        </div>
        {monthlyProducts.map((product) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/monthly">
            Explore All Products &rarr;
          </Link>
        </Button>
      </div>

      {/* Yearly Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Yearly Leaderboards
          </h2>
          <p className="text-xl font-light text-foreground">
            See the most popular products on Wemake this year
          </p>
        </div>
        {yearlyProducts.map((product) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/yearly">
            Explore All Products &rarr;
          </Link>
        </Button>
      </div>
      {/* All Time Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            All-Time Leaderboards
          </h2>
          <p className="text-xl font-light text-foreground">
            See all products inside Wemake
          </p>
        </div>
        {allProducts.map((product) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/all-time">
            Explore All Products &rarr;
          </Link>
        </Button>
      </div>
    </div>
  );
}
