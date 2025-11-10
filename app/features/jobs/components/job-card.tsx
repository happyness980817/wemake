import { Link } from "react-router";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";

interface JobCardProps {
  id: string;
  companyName: string;
  companyLogoURL: string;
  timestamp: string;
  title: string;
  badges: string[];
  salaryRange: string;
  location: string;
}

export function JobCard({
  id,
  companyName,
  companyLogoURL,
  timestamp,
  title,
  badges,
  salaryRange,
  location,
}: JobCardProps) {
  return (
    <Link to={`/jobs/${id}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <img src={companyLogoURL} alt={companyName} className="w-10 h-10 rounded-full" />
            <div className="space-x-2">
              <span className="text-accent-foreground">{companyName}</span>
              <span className="text-xs text-accent-foreground">{timestamp}</span>
            </div>
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {badges.map((badge) => (
            <Badge key={badge} variant="outline">
              {badge}
            </Badge>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">{salaryRange}</span>
            <span className="text-sm font-medium text-muted-foreground">{location}</span>
          </div>
          <Button variant="secondary" size="sm">
            <span>Apply Now</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
