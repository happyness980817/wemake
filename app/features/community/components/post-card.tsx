import { Link } from "react-router";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { ChevronUpIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface PostCardProps {
  id: number;
  title: string;
  authorName: string;
  authorAvatarURL: string | null;
  category: string;
  timestamp: string;
  expanded?: boolean;
  votesCount?: number;
}

export function PostCard({
  id,
  title,
  authorName,
  authorAvatarURL,
  category,
  timestamp,
  expanded = false,
  votesCount = 0,
}: PostCardProps) {
  return (
    <Link to={`/community/${id}`} className="block">
      <Card
        className={cn(
          "bg-transparent hover:bg-card/50 transition-colors",
          expanded ? "flex flex-row items-center justify-between" : ""
        )}
      >
        <CardHeader className="flex flex-row items-center gap-4 flex-1 min-w-0">
          <Avatar className="size-14">
            <AvatarFallback>
              {authorName.charAt(0).toUpperCase()}
            </AvatarFallback>
            {authorAvatarURL && <AvatarImage src={authorAvatarURL} />}
          </Avatar>
          <div className="space-y-2">
            <CardTitle className="text-lg md:text-xl leading-tight">
              {title}
            </CardTitle>
            <div className="flex gap-2 text-sm text-muted-foreground leading-tight">
              <span>
                {authorName} on {category}
              </span>
              <span>•</span>
              <span>
                {DateTime.fromISO(timestamp).toRelative({ locale: "en-US" })}
              </span>
            </div>
          </div>
        </CardHeader>
        {!expanded && (
          <CardFooter className="flex justify-end">
            <Button variant="link">Reply &rarr;</Button>
          </CardFooter>
        )}
        {expanded && (
          <CardFooter className="flex justify-end">
            <Button variant="outline" className="flex flex-col h-14">
              <ChevronUpIcon className="w-4 h-4 shrink-0" />
              <span>{votesCount}</span>
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
