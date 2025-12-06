import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-page";
import { Form } from "react-router";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import InputPair from "~/common/components/input-pair";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/common/components/ui/select";
import SelectPair from "~/common/components/select-pair";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Submit Product - WeMake" }, { name: "description", content: "Submit your product" }];
};

export default function SubmitPage() {
  return (
    <div>
      <Hero title="Submit Your Product" subtitle="Share your product with the world" />
      <Form className="grid grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div className="space-y-5">
          <InputPair
            label="Name"
            description="Name of your product"
            name="name"
            id="name"
            required
            type="text"
            placeholder="Name of your product"
          />
          <InputPair
            label="Tagline"
            description="60 characters max"
            name="tagline"
            id="tagline"
            required
            type="text"
            placeholder="A short description of your product"
          />
          <InputPair
            label="URL"
            description="URL of your product"
            name="url"
            id="url"
            required
            type="url"
            placeholder="URL of your product"
          />
          <InputPair
            textArea
            label="Description"
            description="A detailed description of your product"
            name="description"
            id="description"
            required
            placeholder="Description of your product"
          />
          <SelectPair
            label="Category"
            description="Category of your product"
            name="category"
            required
            placeholder="Category of your product"
            options={[
              { value: "AI", label: "AI" },
              { value: "Design", label: "Design" },
            ]}
          />
        </div>
      </Form>
    </div>
  );
}
