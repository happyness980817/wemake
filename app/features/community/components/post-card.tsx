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
import { useFetcher } from "react-router";
import { useState, useEffect } from "react";

interface PostCardProps {
  id: number;
  title: string;
  authorName: string;
  authorAvatarURL: string | null;
  category: string;
  timestamp: string;
  expanded?: boolean;
  votesCount?: number;
  isUpvoted?: boolean;
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
  isUpvoted = false,
}: PostCardProps) {
  const fetcher = useFetcher();
  const [optimistic, setOptimistic] = useState({
    isUpvoted,
    votesCount,
  });
  // fetcher가 idle로 돌아오면 서버 값으로 동기화
  useEffect(() => {
    if (fetcher.state === "idle") {
      setOptimistic({ isUpvoted, votesCount });
    }
  }, [fetcher.state, isUpvoted, votesCount]);
  const optimisticVotesCount = optimistic.votesCount;
  const optimisticIsUpvoted = optimistic.isUpvoted;
  const absorbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 이전 optimistic 상태 기준으로 토글
    setOptimistic((prev) => ({
      isUpvoted: !prev.isUpvoted,
      votesCount: prev.isUpvoted ? prev.votesCount - 1 : prev.votesCount + 1,
    }));
    // call the upvote action
    fetcher.submit(null, {
      method: "post",
      action: `/community/${id}/upvote`,
    });
  };
  return (
    <Link to={`/community/${id}`} className="block">
      <Card
        className={cn(
          "bg-transparent hover:bg-card/50 transition-colors",
          expanded ? "flex flex-row items-center justify-between" : "",
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
            <Button
              onClick={absorbClick}
              variant="outline"
              className={cn(
                "flex flex-col h-14",
                optimisticIsUpvoted ? "border-primary text-primary" : "",
              )}
            >
              <ChevronUpIcon className="w-4 h-4 shrink-0" />
              <span>{optimisticVotesCount}</span>
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
