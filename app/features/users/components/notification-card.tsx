import { EyeIcon } from "lucide-react";
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

interface NotificationCardProps {
  avatarURL?: string;
  avatarFallback: string;
  username: string;
  message: string;
  timestamp: string;
  seen: boolean;
}

export function NotificationCard({
  avatarURL,
  avatarFallback,
  username,
  message,
  timestamp,
  seen,
}: NotificationCardProps) {
  return (
    <Card className={cn("min-w-[450px] w-1/4", seen ? "" : "bg-yellow-500/60")}>
      <CardHeader className="flex flex-row gap-4 items-start">
        <Avatar>
          <AvatarImage src={avatarURL} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">{username}</CardTitle>
          <small className="text-muted-foreground text-sm">{message}</small>
          <small className="text-muted-foreground text-sm">{timestamp}</small>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="icon">
          <EyeIcon className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
