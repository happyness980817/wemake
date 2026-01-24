import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { cn } from "~/lib/utils";

interface MessagesBubbleProps {
  avatarURL?: string;
  avatarFallback: string;
  message: string;
  isFromMe: boolean;
}

export function MessagesBubble({
  avatarURL,
  avatarFallback,
  message,
  isFromMe,
}: MessagesBubbleProps) {
  return (
    <div
      className={cn("flex items-end gap-4", isFromMe ? "flex-row-reverse" : "")}
    >
      <Avatar>
        <AvatarImage src={avatarURL} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div
        className={cn({
          "bg-accent rounded-2xl p-4 text-sm w-1/3": true,
          "bg-accent rounded-bl-none": !isFromMe,
          "bg-primary text-primary-foreground rounded-br-none": isFromMe,
        })}
      >
        <p>{message}</p>
      </div>
    </div>
  );
}
