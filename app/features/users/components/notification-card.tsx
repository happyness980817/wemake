import { Check, CheckLine } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { cn } from "~/lib/utils";
import { Link } from "react-router";
import { useFetcher } from "react-router";

interface NotificationCardProps {
  avatarURL?: string;
  avatarFallback: string;
  username: string;
  type: "follow" | "review" | "reply";
  timestamp: string;
  seen: boolean;
  productName?: string;
  postTitle?: string;
  payloadId?: number;
  notificationId: number;
}

export function NotificationCard({
  avatarURL,
  avatarFallback,
  username,
  type,
  timestamp,
  seen,
  productName,
  postTitle,
  payloadId,
  notificationId,
}: NotificationCardProps) {
  const getMessage = (type: "follow" | "review" | "reply") => {
    switch (type) {
      case "follow":
        return " followed you.";
      case "review":
        return " reviewed your product: ";
      case "reply":
        return " replied to your post: ";
    }
  };
  const fetcher = useFetcher();
  const optimisticChecked = fetcher.state === "idle" ? seen : true;
  return (
    <Card
      className={cn(
        "min-w-[450px] w-1/4",
        optimisticChecked ? "" : "bg-yellow-500/60",
      )}
    >
      <CardHeader className="flex flex-row gap-4 items-start">
        <Avatar>
          <AvatarImage src={avatarURL} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">
            <span>{username}</span>
            <span>{getMessage(type)}</span>
            {productName && (
              <span className="font-semibold italic hover:underline">
                <Link to={`/products/${payloadId}`}>{productName}</Link>
              </span>
            )}
            {postTitle && (
              <span className="font-semibold italic hover:underline">
                <Link to={`/posts/${payloadId}`}>{postTitle}</Link>
              </span>
            )}
          </CardTitle>
          <small className="text-muted-foreground text-sm">{timestamp}</small>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end">
        {optimisticChecked ? null : (
          <fetcher.Form
            method="post"
            action={`/my/notifications/${notificationId}/check`}
          >
            <Button variant="outline" size="icon">
              <Check className="size-5" />
            </Button>
          </fetcher.Form>
        )}
      </CardFooter>
    </Card>
  );
}
