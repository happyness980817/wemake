import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { DotIcon, EyeIcon, HeartIcon, LockIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface IdeaCardProps {
  id: number;
  title: string;
  viewCount?: number;
  timestamp?: string;
  likesCount?: number;
  claimed?: boolean;
  owner?: boolean;
}

export function IdeaCard({
  id,
  title,
  viewCount,
  timestamp,
  likesCount,
  claimed,
  owner,
}: IdeaCardProps) {
  return (
    <Card className="bg-transparent hover:bg-card/50 transition-colors">
      <CardHeader>
        <Link
          to={claimed && !owner ? "" : `/ideas/${id}`}
          className={claimed && !owner ? "pointer-events-none" : ""}
        >
          <CardTitle>
            <span
              className={cn(
                claimed && !owner
                  ? "bg-foreground selection:bg-foreground text-foreground"
                  : "",
              )}
            >
              {title}
            </span>
          </CardTitle>
        </Link>
      </CardHeader>
      {owner ? null : (
        <CardContent className="flex items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            <span>{viewCount}</span>
          </div>
          <DotIcon className="w-4 h-4" />
          <span>
            {timestamp
              ? DateTime.fromISO(timestamp).toRelative({ locale: "en-US" })
              : ""}
          </span>
        </CardContent>
      )}
      <CardFooter className="flex justify-end gap-2">
        {!claimed && !owner ? (
          <>
            <Button variant="outline">
              <HeartIcon className="w-4 h-4" />
              <span>{likesCount}</span>
            </Button>
            <Button asChild>
              <Link to={`/ideas/${id}`}>Claim This Idea &rarr;</Link>
            </Button>{" "}
          </>
        ) : (
          <Button variant="outline" disabled>
            <LockIcon className="w-4 h-4" />
            Claimed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
