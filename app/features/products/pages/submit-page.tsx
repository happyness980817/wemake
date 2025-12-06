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
import { useState } from "react";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Submit Product - WeMake" }, { name: "description", content: "Submit your product" }];
};

export default function SubmitPage() {
  const [icon, setIcon] = useState<string | null>(null);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // file upload 시 input 변경 => event 수신
    if (event.target.files) {
      const file = event.target.files[0];
      setIcon(URL.createObjectURL(file));
    }
  };
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
          <Button type="submit" className="w-full" size="lg">
            Submit
          </Button>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="size-40 rounded-xl shadow-xl overflow-hidden">
            {icon ? <img src={icon} alt="icon" className="w-full h-full object-cover" /> : null}
          </div>
          <Label className="flex flex-col gap-1">
            Icon <small className="text-muted-foreground">This is the icon of your product</small>
          </Label>
          <Input type="file" className="w-1/2" onChange={onChange} required name="icon" multiple />
          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <span>Recommended size: 128x128</span>
            <span>Allowed formats: SVG, PNG, JPG</span>
            <span>Max file size: 1MB</span>
          </div>
        </div>
      </Form>
    </div>
  );
}

// form 내부에 만들어진 button 은 항상 submit 을 처리
