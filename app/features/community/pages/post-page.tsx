import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import type { Route } from "./+types/post-page";
import { data, Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { Textarea } from "~/common/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Reply } from "../components/reply";
import { getPostById } from "../queries";
import { getReplies } from "../queries";
import { makeSSRClient } from "~/supa-client";
import { DateTime } from "luxon";
import { getLoggedInUserId } from "~/features/users/queries";
import { useOutletContext } from "react-router";
import z from "zod";
import { createReply } from "../mutations";
import { useEffect, useRef } from "react";

export const meta: Route.MetaFunction = ({ params }: Route.MetaArgs) => {
  return [{ title: `Post #${params.postId} | Wemake` }];
};

const paramsSchema = z.object({
  postId: z.coerce.number(),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { success: paramsSuccess, data: paramsData } =
    paramsSchema.safeParse(params);
  if (!paramsSuccess) {
    throw data(
      {
        error_code: "INVALID_PARAMS",
        message: "Invalid parameters",
      },
      {
        status: 400,
      },
    );
  }
  const [post, replies] = await Promise.all([
    getPostById(client, paramsData.postId),
    getReplies(client, paramsData.postId),
  ]);
  return data({ post, replies }, { headers });
};

const formSchema = z.object({
  reply: z.string().min(1, "Reply cannot be empty"),
  topLevelId: z.coerce.number().optional(),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const [userId, formData] = await Promise.all([
    getLoggedInUserId(client),
    request.formData(),
  ]);
  const { success, error, data } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return {
      formErrors: z.flattenError(error).fieldErrors,
    };
  }
  const { reply, topLevelId } = data;
  await createReply(client, {
    postId: Number(params.postId),
    reply,
    userId,
    topLevelId,
  });
  return { ok: true };
};

export default function PostPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { isLoggedIn, name, username, avatar } = useOutletContext<{
    isLoggedIn: boolean;
    name?: string;
    username?: string;
    avatar?: string;
  }>();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset();
    }
  }, [actionData?.ok]);
  return (
    <div className="px-20 space-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community">Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community?topic=${loaderData.post.topic_slug}`}>
                {loaderData.post.topic_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/${loaderData.post.post_id}`}>
                {loaderData.post.title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-40 items-start">
        <div className="col-span-1 lg:col-span-4 space-y-10">
          <div className="flex w-full items-start gap-10">
            <Button variant="outline" className="flex flex-col h-14">
              <ChevronUpIcon className="w-4 h-4 shrink-0" />
              <span>{loaderData.post.upvotes}</span>
            </Button>
            <div className="space-y-20 w-full">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold leading-none tracking-tight">
                  {loaderData.post.title}
                </h2>
                <div className="flex items-center gap-px text-sm text-muted-foreground">
                  <span>{loaderData.post.author_name}</span>
                  <DotIcon className="w-4 h-4" />
                  <span>
                    {DateTime.fromISO(loaderData.post.created_at).toRelative({
                      locale: "en-US",
                    })}
                  </span>
                  <DotIcon className="w-4 h-4" />
                  <span>{loaderData.post.replies_count} replies</span>
                </div>
                <p className="text-sm text-muted-foreground w-3/4">
                  {loaderData.post.content}
                </p>
              </div>
              {isLoggedIn ? (
                <Form
                  ref={formRef}
                  className="flex items-start gap-2 w-3/4"
                  method="post"
                >
                  <Avatar className="size-10">
                    <AvatarFallback>{name?.[0].toUpperCase()}</AvatarFallback>
                    {avatar ? <AvatarImage src={avatar} /> : null}
                  </Avatar>
                  <div className="flex flex-col gap-5 items-end w-full">
                    <Textarea
                      name="reply"
                      placeholder="Write a reply"
                      className="w-full resize-none"
                      rows={5}
                    />
                    <Button>Reply</Button>
                  </div>
                </Form>
              ) : null}
              <div className="space-y-10">
                <h4 className="font-semibold">
                  {loaderData.post.replies_count} Replies
                </h4>
                <div className="flex flex-col gap-5">
                  {loaderData.replies.map((reply) => (
                    <Reply
                      key={reply.post_reply_id}
                      name={reply.user.name}
                      username={reply.user.username}
                      avatarURL={reply.user.avatar}
                      timestamp={reply.created_at}
                      content={reply.reply}
                      topLevel={true}
                      topLevelId={reply.post_reply_id}
                      replies={reply.post_replies}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-1 lg:col-span-2 space-y-5 border rounded-lg shadow-sm p-6">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>
                {loaderData.post.author_name.charAt(0).toUpperCase()}
              </AvatarFallback>
              {loaderData.post.author_avatar ? (
                <AvatarImage src={loaderData.post.author_avatar} />
              ) : null}
            </Avatar>
            <div className="flex flex-col items-start space-y-1">
              <h4 className="text-lg font-medium">
                {loaderData.post.author_name}
              </h4>
              <Badge variant="secondary" className="capitalize">
                {loaderData.post.author_role}
              </Badge>
            </div>
          </div>
          <div className="gap-1 text-sm flex flex-col text-muted-foreground">
            <span>
              🎂 Joined{" "}
              {loaderData.post.author_created_at
                ? DateTime.fromISO(
                    loaderData.post.author_created_at,
                  ).toRelative({
                    locale: "en-US",
                  })
                : null}
            </span>
            <span>🚀 Launched {loaderData.post.products_count} products</span>
          </div>
          <Button variant="outline" className="w-full">
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
