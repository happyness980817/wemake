import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/create-team-page";
import { Form, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { PRODUCT_STAGES } from "../constants";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import z from "zod";
import { createTeam } from "../mutations";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Create Team | Wemake" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Name must be at most 20 characters"),
  stage: z.string().min(1, "Stage is required"),
  size: z.coerce
    .number()
    .min(1, "Team size is required")
    .max(100, "Team size must be at most 100"),
  equity: z.coerce
    .number()
    .min(0, "Equity is required")
    .max(100, "Equity must be at most 100"),
  roles: z.string().min(1, "Roles is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description must be at most 200 characters"),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { data, success, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return { fieldErrors: z.flattenError(error).fieldErrors };
  }
  const { team_id } = await createTeam(client, userId, {
    ...data,
  });
  return redirect(`/teams/${team_id}`);
};

export default function CreateTeamPage({ actionData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero
        title="Create a Team"
        subtitle="Create a team to collaborate with others"
      />
      <Form
        className="max-w-screen-2xl flex flex-col gap-10 mx-auto items-center"
        method="post"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-10">
          <InputPair
            label="What is the name of your product?"
            description="(20 characters max)"
            placeholder="i.e Doggy Social"
            name="name"
            maxLength={20}
            type="text"
            id="name"
            required
          />
          {actionData?.fieldErrors?.name && (
            <p className="text-red-500">{actionData.fieldErrors.name}</p>
          )}
          <SelectPair
            label="What is the stage of your product?"
            description="Select the stage of your product"
            name="stage"
            required
            placeholder="Select the stage of your product"
            options={PRODUCT_STAGES}
          />
          {actionData?.fieldErrors?.stage && (
            <p className="text-red-500">{actionData.fieldErrors.stage}</p>
          )}
          <InputPair
            label="What is the size of your team?"
            description="(1-100)"
            name="size"
            max={100}
            min={1}
            type="number"
            id="size"
            required
          />
          {actionData?.fieldErrors?.size && (
            <p className="text-red-500">{actionData.fieldErrors.size}</p>
          )}
          <InputPair
            label="How much equity are you willing to offer to your team member?"
            description="% of your company stock per person"
            placeholder="0-100, no decimals"
            name="equity"
            type="number"
            id="equity"
            required
            max={100}
            min={0}
            step={1}
          />
          {actionData?.fieldErrors?.equity && (
            <p className="text-red-500">{actionData.fieldErrors.equity}</p>
          )}
          <InputPair
            label="What roles are you looking for?"
            placeholder="i.e Backend Developer, Designer, Sales, Marketing, etc."
            description="(comma separated)"
            name="roles"
            type="text"
            id="roles"
            required
          />
          {actionData?.fieldErrors?.roles && (
            <p className="text-red-500">{actionData.fieldErrors.roles}</p>
          )}
          <InputPair
            label="What is the description of your product?"
            description="(200 characters max)"
            placeholder="i.e We are building a new social media platform for dogs to connect with each other"
            name="description"
            maxLength={200}
            type="text"
            id="description"
            required
            textArea
          />
          {actionData?.fieldErrors?.description && (
            <p className="text-red-500">{actionData.fieldErrors.description}</p>
          )}
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">
          Create Your Team
        </Button>
      </Form>
    </div>
  );
}
