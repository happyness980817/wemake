import { Link } from "react-router";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { EyeIcon, HeartIcon, MessageCircleCodeIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

interface ProductCardProps {
  id: number;
  name: string;
  tagline: string;
  reviewsCount: string;
  viewsCount: string;
  likesCount: string;
}

export function ProductCard({
  id,
  name,
  tagline,
  reviewsCount,
  viewsCount,
  likesCount,
}: ProductCardProps) {
  return (
    <Link to={`/products/${id}`} className="block">
      <Card className="w-full flex flex-row items-center justify-between p-4 bg-transparent hover:bg-primary/10">
        <CardHeader className="w-[-webkit-fill-available]">
          <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
            {name}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {tagline}
          </CardDescription>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-px text-xs text-muted-foreground">
              <MessageCircleCodeIcon className="w-4 h-4" />
              <span>{reviewsCount}</span>
            </div>
            <div className="flex items-center gap-px text-xs text-muted-foreground">
              <EyeIcon className="w-4 h-4" />
              <span>{viewsCount}</span>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="py-0">
          <Button variant="outline" className="flex flex-col h-14">
            <HeartIcon className="w-4 h-4 shrink-0" />
            <span>{likesCount}</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
