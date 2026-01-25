import {
  data,
  Form,
  Link,
  Outlet,
  NavLink,
  useOutletContext,
} from "react-router";
import type { Route } from "./+types/profile-layout";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "~/common/components/ui/avatar";
import { Button, buttonVariants } from "~/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/common/components/ui/dialog";
import { Textarea } from "~/common/components/ui/textarea";
import { Badge } from "~/common/components/ui/badge";
import { cn } from "~/lib/utils";
import { getUserProfile } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const user = await getUserProfile(client, params.username);
  return data({ user }, { headers });
};

export default function ProfileLayout({
  loaderData,
  params,
}: Route.ComponentProps) {
  const { isLoggedIn, username } = useOutletContext<{
    isLoggedIn: boolean;
    username?: string;
  }>();
  const tabs = [
    { label: "About", to: `/users/${loaderData.user.username}` },
    { label: "Products", to: `/users/${loaderData.user.username}/products` },
    { label: "Posts", to: `/users/${loaderData.user.username}/posts` },
  ];
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <Avatar className="size-40">
          {loaderData.user.avatar ? (
            <AvatarImage src={loaderData.user.avatar} />
          ) : (
            <AvatarFallback className="text-2xl">
              {loaderData.user.name.charAt(0)}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="space-y-4">
          <div className="flex gap-2">
            <h1 className="text-2xl font-semibold">{loaderData.user.name}</h1>
            {isLoggedIn && username === params.username ? (
              <Button variant="outline" asChild>
                <Link to="/my/settings">Edit Profile</Link>
              </Button>
            ) : null}
            {isLoggedIn && username !== params.username ? (
              <>
                <Button variant="secondary">Follow</Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">Message</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Message</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <span>Send a message to {loaderData.user.name}</span>
                      <Form className="mt-2 space-y-4">
                        <Textarea
                          placeholder="Write a message..."
                          className="resize-none"
                          rows={4}
                        />
                        <Button type="submit">Send</Button>
                      </Form>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              @{loaderData.user.username}
            </span>
            <Badge variant="secondary">{loaderData.user.role}</Badge>
            <Badge variant="secondary">100 followers</Badge>
            <Badge variant="secondary">100 following</Badge>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {tabs.map((item) => (
          <NavLink
            end
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "outline" }),
                isActive && "bg-accent text-foreground",
              )
            }
            to={item.to}
            key={item.label}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="max-w-3xl">
        <Outlet
          context={{
            headline: loaderData.user.headline,
            bio: loaderData.user.bio,
          }}
        />
        {/* 여러번 데이터 중복해서 fetch 하지 말라고 쓰는건데 내 웹사이트에서
        이런거까지 고려를 해야 할까? */}
      </div>
    </div>
  );
}
