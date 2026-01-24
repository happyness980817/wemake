import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/idea-page";
import { EyeIcon, DotIcon, HeartIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { getIdea } from "../queries";
import { DateTime } from "luxon";
import { data, Form, redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { claimIdea } from "../mutations";

export const meta: Route.MetaFunction = ({
  loaderData: {
    idea: { idea_id, idea },
  },
}: Route.MetaArgs) => {
  return [{ title: `Idea #${idea_id} : ${idea} | Wemake` }];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const idea = await getIdea(client, params.ideaId);
  if (idea.claimed && idea.claimed_by !== (await getLoggedInUserId(client))) {
    return redirect("/ideas");
  }
  return data({ idea }, { headers });
};

export const action = async ({ params, request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const idea = await getIdea(client, params.ideaId);
  if (idea.claimed) {
    return { ok: false };
  }
  await claimIdea(client, idea.idea_id, userId);
  return redirect("/my/dashboard/ideas");
};

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <Hero title={`Idea #${loaderData.idea.idea_id}`} />
      <div className="mx-auto max-w-4xl flex flex-col items-center gap-6">
        <p className="italic text-center">
          {loaderData.idea.claimed
            ? "Check this idea in your dashboard"
            : loaderData.idea.idea}
        </p>
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
        {loaderData.idea.claimed ? null : (
          <Form method="post">
            <Button size="lg">Claim This Idea &rarr;</Button>
          </Form>
        )}
      </div>
    </div>
  );
}
