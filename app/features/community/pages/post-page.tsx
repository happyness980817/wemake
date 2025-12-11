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
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Post | Wemake" }];
};

export default function PostPage({}: Route.ComponentProps) {
  return (
    <div className="grid grid-cols-6 gap-40 items-start">
      <div className="col-span-4 space-y-10">
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
                <span>@nico</span>
                <DotIcon className="w-4 h-4" />
                <span>12 hours ago</span>
                <DotIcon className="w-4 h-4" />
                <span>10 replies</span>
              </div>
              <p className="text-sm text-muted-foreground w-2/3">
                Hello, I'm looking for a productivity tool that can help me manage my time and tasks. I've tried a few
                different tools, but none of them have worked for me. I'm looking for a tool that can help me manage my
                time and tasks.
              </p>
            </div>
            <Form className="flex items-start gap-2 w-2/3">
              <Avatar className="size-10">
                <AvatarFallback>N</AvatarFallback>
                <AvatarImage src="https://github.com/apple.png" />
              </Avatar>
              <div className="flex flex-col gap-5 items-end w-full">
                <Textarea placeholder="Write a reply" className="w-full resize-none" rows={5} />
                <Button>Reply</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <aside className="col-span-2"></aside>
    </div>
  );
}
