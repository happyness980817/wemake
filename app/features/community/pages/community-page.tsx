import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/community-page";
import { Button } from "~/common/components/ui/button";
import { Form, Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { PERIOD_OPTIONS, SORT_OPTIONS } from "../constants";
import { useSearchParams } from "react-router";
import { Input } from "~/common/components/ui/input";
import { PostCard } from "../components/post-card";
import { getPosts, getTopics } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Community | Wemake" }];
};

export const loader = async () => {
  const topics = await getTopics();
  const posts = await getPosts();
  return { topics, posts };
};

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "newest";
  const period = searchParams.get("period") || "all-time";
  return (
    <div>
      <Hero
        title="Community"
        subtitle="Join our community and share your thoughts and ideas with others."
      />
      <div className="grid grid-cols-1 lg:grid-cols-6 items-start gap-40">
        <div className="col-span-1 lg:col-span-4 space-y-10">
          <div className="flex justify-between">
            <div className="space-y-5 w-full">
              <div className="flex items-center gap-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <span className="text-sm capitalize">{sort}</span>
                    <ChevronDownIcon className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuCheckboxItem
                        className="cursor-pointer capitalize"
                        key={option}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            searchParams.set("sort", option);
                            setSearchParams(searchParams);
                          } else {
                            searchParams.delete("sort");
                            setSearchParams(searchParams);
                          }
                        }}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {sort === "popular" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <span className="text-sm capitalize">{period}</span>
                      <ChevronDownIcon className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {PERIOD_OPTIONS.map((option) => (
                        <DropdownMenuCheckboxItem
                          className="cursor-pointer capitalize"
                          key={option}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              searchParams.set("period", option);
                              setSearchParams(searchParams);
                            } else {
                              searchParams.delete("period");
                              setSearchParams(searchParams);
                            }
                          }}
                        >
                          {option}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <Form className="w-2/3">
                <Input
                  type="text"
                  name="search"
                  placeholder="Search for discussions"
                />
              </Form>
            </div>
            <Button asChild>
              <Link to="/community/submit">Create a Discussion</Link>
            </Button>
          </div>
          <div className="space-y-5">
            {loaderData.posts.map((post) => (
              <PostCard
                key={post.post_id}
                id={post.post_id}
                title={post.title}
                authorName={post.author.name}
                authorAvatarURL={post.author.avatar}
                category={post.topic.name}
                timestamp={post.created_at}
                votesCount={post.upvotes[0].count}
                expanded
              />
            ))}
          </div>
        </div>
        <aside className="col-span-1 lg:col-span-2 space-y-5">
          <p className="text-sm font-bold text-muted-foreground">TOPICS</p>
          <div className="flex flex-col gap-4 items-start">
            {loaderData.topics.map((topic) => (
              <Button key={topic.name} variant="link" asChild className="pl-0">
                <Link to={`/community?topic=${topic.slug}`}>{topic.name}</Link>
              </Button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
