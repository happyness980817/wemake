import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import type { Route } from "./+types/leaderboards-page";
import { Hero } from "~/common/components/hero";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Leaderboards | Wemake" }, { name: "description", content: "Top products leaderboards" }];
};

export default function LeaderboardsPage() {
  return (
    <div className="space-y-20">
      <Hero title="Leaderboards" subtitle="The most popular products on Wemake" />

      {/* Daily Leaderboards */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Daily Leaderboards</h2>
          <p className="text-xl font-light text-foreground">See the most popular products on Wemake today</p>
        </div>
        {Array.from({ length: 7 }).map((_, index) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/daily">Explore All Products &rarr;</Link>
        </Button>
      </div>

      {/* Weekly Leaderboards */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Weekly Leaderboards</h2>
          <p className="text-xl font-light text-foreground">See the most popular products on Wemake this week</p>
        </div>
        {Array.from({ length: 7 }).map((_, index) => (
          <ProductCard
            key={`weekly-${index}`}
            id={`productId-${index}`}
            name={`Product Name ${index}`}
            description={`Product Description ${index}`}
            commentCount={123}
            viewCount={123}
            likeCount={123}
          />
        ))}
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/weekly">Explore All Products &rarr;</Link>
        </Button>
      </div>

      {/* Monthly Leaderboards */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Monthly Leaderboards</h2>
          <p className="text-xl font-light text-foreground">See the most popular products on Wemake this month</p>
        </div>
        {Array.from({ length: 7 }).map((_, index) => (
          <ProductCard
            key={`monthly-${index}`}
            id={`productId-${index}`}
            name={`Product Name ${index}`}
            description={`Product Description ${index}`}
            commentCount={123}
            viewCount={123}
            likeCount={123}
          />
        ))}
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/monthly">Explore All Products &rarr;</Link>
        </Button>
      </div>

      {/* Yearly Leaderboards */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Yearly Leaderboards</h2>
          <p className="text-xl font-light text-foreground">See the most popular products on Wemake this year</p>
        </div>
        {Array.from({ length: 7 }).map((_, index) => (
          <ProductCard
            key={`yearly-${index}`}
            id={`productId-${index}`}
            name={`Product Name ${index}`}
            description={`Product Description ${index}`}
            commentCount={123}
            viewCount={123}
            likeCount={123}
          />
        ))}
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/yearly">Explore All Products &rarr;</Link>
        </Button>
      </div>
    </div>
  );
}
