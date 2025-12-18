import { Form } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Settings | Wemake" }];
};

export default function SettingsPage({}: Route.ComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const onChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };
  return (
    <div className="space-y-20">
      <div className="grid grid-cols-6 gap-40">
        <div className="col-span-4 flex flex-col gap-10">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <Form className="flex flex-col w-1/2 gap-5">
            <InputPair
              label="Name"
              description="Your public name"
              required
              id="name"
              name="name"
              placeholder="i.e. John Doe"
            />
            <SelectPair
              label="Role"
              description="Select the role that describes you best"
              required
              placeholder="Select your role"
              name="role"
              options={[
                { label: "Developer", value: "developer" },
                { label: "Designer", value: "designer" },
                { label: "Salesperson", value: "salesperson" },
                { label: "Other", value: "other" },
              ]}
            />
            <InputPair
              label="Bio"
              description="Your public bio. This will be displayed on your profile."
              required
              id="name"
              name="name"
              placeholder="i.e. I'm a software engineer at Google."
              textArea
            />
            <Button type="submit" className="w-full">
              Update Profile
            </Button>
          </Form>
        </div>
        <aside className="col-span-2 p-6 rounded-lg border shadow-md">
          <Label className="flex flex-col gap-1">
            Avatar
            <small className="text-muted-foreground">
              This is the avatar of your public profile
            </small>
          </Label>
          <div className="space-y-4">
            <div className="size-40 rounded-full shadow-xl overflow-hidden">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <Input
              type="file"
              className="w-1/2"
              onChange={onChangeAvatar}
              required
              name="avatar"
              multiple
            />
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <span>Recommended size: 128x128</span>
              <span>Allowed formats: SVG, PNG, JPG</span>
              <span>Max file size: 1MB</span>
            </div>
            <Button className="w-full">Update Avatar</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
