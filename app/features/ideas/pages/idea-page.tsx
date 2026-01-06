import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/idea-page";
import { EyeIcon, DotIcon, HeartIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { getIdea } from "../queries";
import { DateTime } from "luxon";

export const meta: Route.MetaFunction = ({
  data: {
    idea: { idea_id, idea },
  },
}: Route.MetaArgs) => {
  return [{ title: `Idea #${idea_id} : ${idea} | Wemake` }];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const idea = await getIdea(params.ideaId);
  return { idea };
};

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <Hero title={`Idea #${loaderData.idea.idea_id}`} />
      <div className="mx-auto max-w-4xl flex flex-col items-center gap-6">
        <p className="italic text-center">{loaderData.idea.idea}</p>
        <div className="flex items-center text-sm mt-6">
          <div className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            <span>{loaderData.idea.views}</span>
          </div>
          <DotIcon className="w-4 h-4" />
          <span>
            {DateTime.fromISO(loaderData.idea.created_at).toRelative({
              locale: "en-US",
            })}
          </span>
          <Button variant="outline" className="ml-2">
            <HeartIcon className="w-4 h-4" />
            <span>{loaderData.idea.likes}</span>
          </Button>
        </div>
        <Button size="lg">Claim This Idea &rarr;</Button>
      </div>
    </div>
  );
}
