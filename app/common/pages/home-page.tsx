import { Link, type MetaFunction } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { JobCard } from "~/features/jobs/components/job-card";
import { TeamCard } from "~/features/teams/components/team-card";
import { Button } from "../components/ui/button";

export const meta: MetaFunction = () => {
  return [{ title: "Home | Wemake" }, { name: "description", content: "Welcome to Wemake" }];
};

export const loader = () => {
  console.log("hello");
  return {
    hello: "world",
  };
}; // loader is a function that runs on the server (backend) and returns the data for the page
// loader runs before the page is rendered

export default function HomePage({ loaderData }) {
  // loaderData prop is the data returned from the loader function
  return (
    <div className="px-20 space-y-20">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Today's Products {JSON.stringify(loaderData)}
          </h2>
          <p className="text-xl font-light text-foreground">See the latest products from our community</p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/products/leaderboards">Explore All Products &rarr;</Link>
          </Button>
        </div>
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
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Latest Discussions</h2>
          <p className="text-xl font-light text-foreground">See the latest discussions from our community</p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/community">Explore All Discussions &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 11 }).map((_, index) => (
          <PostCard
            key={index}
            id={`postId-${index}`}
            title="What is the best way to learn React?"
            authorName="John Doe"
            authorAvatarURL="https://github.com/happyness980817.png"
            category="Productivity"
            timestamp="12 hours ago"
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">IdeasGPT</h2>
          <p className="text-xl font-light text-foreground">AI-generated ideas for your next project</p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/ideas">Explore All Ideas &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <IdeaCard
            key={index}
            id={`ideaId-${index}`}
            title={`Some generated bullshit by dumb AIs (${index})`}
            viewCount={123}
            timestamp="12 hours ago"
            likeCount={123}
            claimed={index % 2 === 0}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Latest Jobs</h2>
          <p className="text-xl font-light text-foreground">See the latest jobs from our community</p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/jobs">Explore All Jobs &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 15 }).map((_, index) => (
          <JobCard
            key={index}
            id={`jobId-${index}`}
            companyName="Apple Inc."
            companyLogoURL={`https://github.com/apple.png?${index}`}
            timestamp="12 hours ago"
            title="Software Engineer"
            badges={["Full-time", "Remote", "Senior"]}
            salaryRange="$100,000+ per year"
            location="Remote"
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Find a Teammate</h2>
          <p className="text-xl font-light text-foreground">Join a team to build something great</p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/teams">Explore All Teams &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 7 }).map((_, index) => (
          <TeamCard
            key={index}
            id={`teamId-${index}`}
            username="paul"
            avatarURL="https://github.com/happyness980817.png"
            skills={["Full-stack", "Developer", "React", "TypeScript", "Node.js"]}
            description="To build a platform"
          />
        ))}
      </div>
    </div>
  );
}
