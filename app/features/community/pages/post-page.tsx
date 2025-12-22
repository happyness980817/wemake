import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import type { Route } from "./+types/post-page";
import { Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import { DotIcon, HeartIcon } from "lucide-react";
import { Textarea } from "~/common/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Reply } from "../components/reply";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Post | Wemake" }];
};

export default function PostPage({}: Route.ComponentProps) {
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
              <Link to="/community?topic=productivity">Productivity</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community/postId">Discussion Title</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-40 items-start">
        <div className="col-span-1 lg:col-span-4 space-y-10">
          <div className="flex w-full items-start gap-10">
            <Button variant="outline" className="flex flex-col h-14">
              <HeartIcon className="w-4 h-4 shrink-0" />
              <span>10</span>
            </Button>
            <div className="space-y-20">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold leading-none tracking-tight">
                  What is the best productivity tool?
                </h2>
                <div className="flex items-center gap-px text-sm text-muted-foreground">
                  <span>@paul</span>
                  <DotIcon className="w-4 h-4" />
                  <span>12 hours ago</span>
                  <DotIcon className="w-4 h-4" />
                  <span>10 replies</span>
                </div>
                <p className="text-sm text-muted-foreground w-3/4">
                  Hello, I'm looking for a productivity tool that can help me
                  manage my time and tasks. I've tried a few different tools,
                  but none of them have worked for me. I'm looking for a tool
                  that can help me manage my time and tasks.
                </p>
              </div>
              <Form className="flex items-start gap-2 w-3/4">
                <Avatar className="size-10">
                  <AvatarFallback>N</AvatarFallback>
                  <AvatarImage src="https://github.com/apple.png" />
                </Avatar>
                <div className="flex flex-col gap-5 items-end w-full">
                  <Textarea
                    placeholder="Write a reply"
                    className="w-full resize-none"
                    rows={5}
                  />
                  <Button>Reply</Button>
                </div>
              </Form>
              <div className="space-y-10">
                <h4 className="font-semibold">10 Replies</h4>
                <div className="flex flex-col gap-5">
                  <Reply
                    username="John Apple Doe"
                    avatarURL="https://github.com/apple.png"
                    timestamp="12 hours ago"
                    content="Hello, I'm looking for a productivity tool that can help me manage my time and tasks. I've tried a few different tools, but none of them have worked for me. I'm looking for a tool that can help me manage my time and tasks."
                    topLevel
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-1 lg:col-span-2 space-y-5 border rounded-lg shadow-sm p-6">
          <div className="flex gap-5">
            <Avatar className="size-10">
              <AvatarFallback>N</AvatarFallback>
              <AvatarImage src="https://github.com/happyness980817.png" />
            </Avatar>
            <div className="flex flex-col space-y-1">
              <h4 className="text-lg font-medium">Paul Jang</h4>
              <Badge variant="secondary">Entrepreneur</Badge>
            </div>
          </div>
          <div className="gap-1 text-sm flex flex-col text-muted-foreground">
            <span>🎂 Joined 3 months ago</span>
            <span>🚀 Launched 2 products</span>
          </div>
          <Button variant="outline" className="w-full">
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
