import { Link } from "react-router";
import { Card, CardHeader, CardFooter, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";

interface TeamCardProps {
  id: string;
  username: string;
  avatarURL?: string;
  skills: string[];
  description: string;
}

export function TeamCard({ id, username, avatarURL, skills, description }: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="text-base leading-loose">
            <Badge variant="secondary" className="inline-flex shadow-sm items-center text-base">
              <span>@{username}</span>
              <Avatar className="size-5">
                <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                <AvatarImage src={avatarURL} />
              </Avatar>
            </Badge>
            <span className="text-base">is looking for a teammate</span>
            {skills.map((skill) => (
              <Badge key={skill} className="text-base">
                {skill}
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

