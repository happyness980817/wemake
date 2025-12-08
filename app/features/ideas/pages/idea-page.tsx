import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/idea-page";
import { EyeIcon, DotIcon, HeartIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Ideas | Wemake" }];
};

export default function IdeaPage({}: Route.ComponentProps) {
  return (
    <div>
      <Hero title="Idea #1" />
      <div className="mx-auto max-w-4xl flex flex-col items-center gap-6">
        <p className="italic text-center">
          "AI-driven marketplace that matches underutilized industrial equipment with startups, handles financing, and
          optimizes logistics to reduce downtime. This idea is a great opportunity for startups to get access to
          underutilized industrial equipment and for industrial equipment owners to get access to startups that need
          their equipment."
        </p>
        <div className="flex items-center text-sm mt-6">
          <div className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            <span>100</span>
          </div>
          <DotIcon className="w-4 h-4" />
          <span>12 hours ago</span>
          <Button variant="outline" className="ml-2">
            <HeartIcon className="w-4 h-4" />
            <span>100</span>
          </Button>
        </div>
        <Button size="lg">Claim This Idea &rarr;</Button>
      </div>
    </div>
  );
}
