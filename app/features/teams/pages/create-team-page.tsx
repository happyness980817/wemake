import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/create-team-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";

import { Button } from "~/common/components/ui/button";
import { PRODUCT_STAGES } from "../constants";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Create Team | Wemake" }];
};

export default function CreateTeamPage({}: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero
        title="Create a Team"
        subtitle="Create a team to collaborate with others"
      />
      <Form className="max-w-screen-2xl flex flex-col gap-10 mx-auto items-center">
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
          <SelectPair
            label="What is the stage of your product?"
            description="Select the stage of your product"
            name="stage"
            required
            placeholder="Select the stage of your product"
            options={PRODUCT_STAGES}
          />
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
          <InputPair
            label="What roles are you looking for?"
            placeholder="i.e Backend Developer, Designer, Sales, Marketing, etc."
            description="(comma separated)"
            name="roles"
            type="text"
            id="roles"
            required
          />
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
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">
          Create Your Team
        </Button>
      </Form>
    </div>
  );
}
