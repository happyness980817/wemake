import { StarIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { DateTime } from "luxon";

export interface ReviewCardProps {
  authorName: string;
  username: string;
  avatarURL?: string | null;
  rating: number;
  content: string;
  timestamp: string;
}

export function ReviewCard({
  authorName,
  username,
  avatarURL,
  rating,
  content,
  timestamp,
}: ReviewCardProps) {
  const clampedRating = Math.max(0, Math.min(5, rating));

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
          {avatarURL ? <AvatarImage src={avatarURL} alt={authorName} /> : null}
        </Avatar>
        <div>
          <h4 className="text-lg font-bold">{authorName}</h4>
          <p className="text-sm text-muted-foreground">{username}</p>
        </div>
      </div>
      <div className="flex text-yellow-500">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon
            key={index}
            className="h-4 w-4"
            fill={index < clampedRating ? "currentColor" : "none"}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{content}</p>
      <span className="text-xs text-muted-foreground">
        {DateTime.fromISO(timestamp).toRelative({ locale: "en" })}
      </span>
    </div>
  );
}
