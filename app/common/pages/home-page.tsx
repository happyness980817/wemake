import { data, Link, type MetaFunction } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { JobCard } from "~/features/jobs/components/job-card";
import { TeamCard } from "~/features/teams/components/team-card";
import { Button } from "../components/ui/button";
import { getProductsByDateRange } from "~/features/products/queries";
import { DateTime } from "luxon";
import type { Route } from "./+types/home-page";
import { getPosts } from "~/features/community/queries";
import { getIdeas } from "~/features/ideas/queries";
import { getJobs } from "~/features/jobs/queries";
import { getTeams } from "~/features/teams/queries";
import { makeSSRClient } from "~/supa-client";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | Wemake" },
    { name: "description", content: "Welcome to Wemake" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const [products, posts, ideas, jobs, teams] = await Promise.all([
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("day"),
      endDate: DateTime.now().endOf("day"),
      limit: 7,
    }),
    getPosts(client, {
      limit: 7,
      sorting: "newest",
    }),
    getIdeas(client, { limit: 7 }),
    getJobs(client, { limit: 11 }),
    getTeams(client, { limit: 7 }),
  ]);
  return data({ products, posts, ideas, jobs, teams }, { headers });
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="px-20 space-y-20">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Today's Products
          </h2>
          <p className="text-xl font-light text-foreground">
            See the latest products from our community
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/products/leaderboards">Explore All Products &rarr;</Link>
          </Button>
        </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest Discussions
          </h2>
          <p className="text-xl font-light text-foreground">
            See the latest discussions from our community
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/community">Explore All Discussions &rarr;</Link>
          </Button>
        </div>
        {loaderData.posts.map((post) => (
          <PostCard
            key={post.post_id}
            id={post.post_id}
            title={post.title}
            authorName={post.author}
            authorAvatarURL={post.author_avatar}
            category={post.topic}
            timestamp={post.created_at}
            votesCount={post.upvotes}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Business Ideas
          </h2>
          <p className="text-xl font-light text-foreground">
            Buy and sell your brilliant Business/Startup ideas here.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/ideas">Explore All Ideas &rarr;</Link>
          </Button>
        </div>
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.idea_id}
            id={idea.idea_id}
            title={idea.idea}
            viewCount={idea.views}
            timestamp={idea.created_at}
            likesCount={idea.likes}
            claimed={idea.claimed}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest Jobs
          </h2>
          <p className="text-xl font-light text-foreground">
            See the latest jobs from our community
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/jobs">Explore All Jobs &rarr;</Link>
          </Button>
        </div>
        {loaderData.jobs.map((job) => (
          <JobCard
            key={job.job_id}
            id={job.job_id}
            companyName={job.company_name}
            companyLogoURL={job.company_logo_url}
            postedAt={job.created_at}
            title={job.position}
            badges={[job.job_type]}
            salaryRange={job.salary_range}
            location={job.job_location}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Find a Teammate
          </h2>
          <p className="text-xl font-light text-foreground">
            Join a team to build something great
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/teams">Explore All Teams &rarr;</Link>
          </Button>
        </div>
        {loaderData.teams.map((team) => (
          <TeamCard
            key={team.team_id}
            id={team.team_id}
            leaderUsername={team.team_leader.username}
            leaderAvatarURL={team.team_leader.avatar}
            roles={team.roles.split(",")}
            description={team.product_description}
          />
        ))}
      </div>
    </div>
  );
}
