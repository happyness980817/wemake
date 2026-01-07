import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";

interface TeamCardProps {
  id: number;
  leaderUsername: string;
  leaderAvatarURL?: string | null;
  roles: string[];
  description: string;
}

export function TeamCard({
  id,
  leaderUsername,
  leaderAvatarURL,
  roles,
  description,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`} className="block">
      <Card className="bg-transparent hover:bg-card/50 flex flex-col justify-between transition-colors h-full">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="text-base leading-loose">
            <Badge
              variant="secondary"
              className="inline-flex shadow-sm items-center text-base"
            >
              <span>@{leaderUsername}</span>
              <Avatar className="size-5">
                <AvatarFallback>
                  {leaderUsername.charAt(0).toUpperCase()}
                </AvatarFallback>
                {leaderAvatarURL && <AvatarImage src={leaderAvatarURL} />}
              </Avatar>
            </Badge>
            <span className="text-base">is looking for a teammate</span>
            {roles.map((role) => (
              <Badge key={role} className="text-base">
                {role}
              </Badge>
            ))}
            <span>{description}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Button variant="link" asChild>
            <Link to={`/teams/${id}`}>Join &rarr;</Link>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
