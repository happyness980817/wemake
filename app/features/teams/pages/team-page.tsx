import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/team-page";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { data, Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { getTeamById } from "../queries";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

const paramsSchema = z.object({
  teamId: z.coerce.number(),
});

export const meta: Route.MetaFunction = () => {
  return [{ title: "Team | Wemake" }];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data(
      {
        error_code: "INVALID_PARAMS",
        message: "Invalid parameters",
      },
      { status: 400 },
    );
  }
  const team = await getTeamById(client, parsedData.teamId);
  return data({ team }, { headers });
};

export default function TeamPage({ loaderData }: Route.ComponentProps) {
  const roles = loaderData.team.roles.split(",");

  const summaryItems = [
    { title: "Product name", value: loaderData.team.product_name },
    { title: "Stage", value: loaderData.team.product_stage },
    { title: "Team size", value: loaderData.team.team_size },
    { title: "Available equity", value: `${loaderData.team.equity}%` },
  ];

  return (
    <div className="space-y-20">
      <Hero title={`Join ${loaderData.team.team_leader.name}'s team`} />
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-40 items-start">
        <div className="col-span-1 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {summaryItems.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 px-6 pb-6 font-bold text-2xl">
                <p className="capitalize">{item.value}</p>
              </CardContent>
            </Card>
          ))}
          <Card className="col-span-1 sm:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Looking for
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 font-bold text-2xl">
              <ul className="list-disc list-inside text-lg">
                {roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="col-span-1 sm:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Idea Description
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 font-medium text-xl">
              <p>{loaderData.team.product_description}</p>
            </CardContent>
          </Card>
        </div>
        <aside className="col-span-1 lg:col-span-2 space-y-5 border rounded-lg shadow-sm p-6">
          <div className="flex gap-5">
            <Avatar className="size-10">
              <AvatarFallback>
                {loaderData.team.team_leader.name.charAt(0).toUpperCase()}
              </AvatarFallback>
              {loaderData.team.team_leader.avatar ? (
                <AvatarImage src={loaderData.team.team_leader.avatar} />
              ) : null}
            </Avatar>
            <div className="flex flex-col space-y-1">
              <h4 className="text-lg font-medium">
                {loaderData.team.team_leader.name}
              </h4>
              <Badge variant="secondary" className="capitalize">
                {loaderData.team.team_leader.role}
              </Badge>
            </div>
          </div>
          <Form
            className="space-y-5"
            method="post"
            action={`/users/${loaderData.team.team_leader.username}/messages`}
          >
            <InputPair
              label="Introduce yourself"
              name="content"
              id="introduction"
              description="Introduce yourself to the team"
              required
              textArea
              placeholder="i.e. I'm a frontend developer with a passion for creating user-friendly interfaces."
            />
            <Button type="submit" className="w-full">
              Contact
            </Button>
          </Form>
          <Button variant="outline" className="w-full">
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
