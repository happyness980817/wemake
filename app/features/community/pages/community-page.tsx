import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/community-page";
import { Button } from "~/common/components/ui/button";
import { data, Form, Link } from "react-router";
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
import { makeSSRClient } from "~/supa-client";
import z from "zod";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Community | Wemake" }];
};

const searchParamsSchema = z.object({
  sort: z.enum(["newest", "popular"]).optional().default("newest"),
  period: z
    .enum(["all-time", "today", "weekly", "monthly", "yearly"])
    .optional()
    .default("all-time"),
  keyword: z.string().optional(),
  topic: z.string().optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { serverSideClient: client, headers } = makeSSRClient(request);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      {
        error_code: "invalid_search_params",
        message: "Invalid search parameters",
      },
      { status: 400 }
    );
  }
  // console.log(parsedData);
  const [topics, posts] = await Promise.all([
    getTopics(client),
    getPosts(client, {
      limit: 20,
      sorting: parsedData.sort,
      period: parsedData.period,
      keyword: parsedData.keyword,
      topic: parsedData.topic,
    }),
  ]);
  return data({ topics, posts }, { headers });
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
                <Input type="hidden" name="sort" value={sort} />
                <Input type="hidden" name="period" value={period} />
                <Input
                  type="text"
                  name="keyword"
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
                authorName={post.author}
                authorAvatarURL={post.author_avatar}
                category={post.topic}
                timestamp={post.created_at}
                votesCount={post.upvotes}
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
