import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-post-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Submit Post | Wemake" }];
};

export default function SubmitPostPage({}: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero title="Create Discussion" subtitle="Share your thoughts and ideas with the community" />
      <Form className="flex flex-col gap-10 max-w-3xl mx-auto">
        <InputPair
          label="Title"
          description="(40 characters max)"
          id="title"
          name="title"
          required
          placeholder="i.e. What is the best way to learn React?"
        />
        <SelectPair
          name="category"
          label="Category"
          description="The category of your discussion"
          required
          placeholder="Select a category"
          options={[
            { label: "Productivity", value: "productivity" },
            { label: "Technology", value: "technology" },
            { label: "Design", value: "design" },
            { label: "Marketing", value: "marketing" },
            { label: "Sales", value: "sales" },
            { label: "Customer Service", value: "customer-service" },
          ]}
        />
        <InputPair
          label="Content"
          description="(1000 characters max)"
          id="content"
          name="content"
          required
          placeholder="i.e. I'm looking for a way to learn React. I've been using the official React documentation, but I'm not sure if it's the best way to learn React."
          textArea
        />

        <div className="flex justify-end">
          <Button type="submit">Create Discussion</Button>
        </div>
      </Form>
    </div>
  );
}
