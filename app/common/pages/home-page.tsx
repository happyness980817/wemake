import { Link, type MetaFunction } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { Button } from "../components/ui/button";

export const meta: MetaFunction = () => {
  return [{ title: "Home | Wemake" }, { name: "description", content: "Welcome to Wemake" }];
};

export default function HomePage() {
  return (
    <div className="px-20 space-y-20">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Today's Products</h2>
          <p className="text-xl font-light text-foreground">See the latest products from our community</p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/products/leaderboards">Explore All Products &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
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
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Latest Discussions</h2>
          <p className="text-xl font-light text-foreground">See the latest discussions from our community</p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/community">Explore All Discussions &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <PostCard
            id={`postId-${index}`}
            title="What is the best way to learn React?"
            authorName="John Doe"
            authorAvatarURL="https://github.com/happyness980817.png"
            category="Productivity"
            timestamp="12 hours ago"
          />
        ))}
      </div>
    </div>
  );
}
