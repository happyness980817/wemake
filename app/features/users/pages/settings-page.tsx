import { Form } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getUserById } from "../queries";
import z from "zod";
import { updateUser, updateUserAvatar } from "../mutations";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/common/components/ui/alert";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Settings | Wemake" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserById(client, { id: userId });
  return { user };
};

const formSchema = z.object({
  name: z.string().min(1).max(100),
  role: z.enum(["developer", "designer", "salesperson", "other"]),
  headline: z.string().min(1).max(100).optional().default(""),
  bio: z.string().min(1).max(100).optional().default(""),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const avatar = formData.get("avatar");
  if (avatar && avatar instanceof File) {
    // upload avatar
    if (avatar.size <= 2 * 1024 * 1024 && avatar.type.startsWith("image/")) {
      // update user with avatar url
      const { data, error } = await client.storage
        .from("avatars")
        .upload(`${userId}/${Date.now()}`, avatar, {
          contentType: avatar.type,
          upsert: false,
        });
      if (error) {
        console.log(error);
        return {
          formErrors: {
            avatar: ["Failed to upload avatar"],
          },
        };
      }
      const {
        data: { publicUrl },
      } = await client.storage.from("avatars").getPublicUrl(data.path);
      // update user with avatar url
      await updateUserAvatar(client, {
        id: userId,
        avatarUrl: publicUrl,
      });
    } else {
      return {
        formErrors: {
          avatar: ["File must be an image, less than 2MB"],
        },
      };
    }
  } else {
    const { success, error, data } = formSchema.safeParse(
      Object.fromEntries(formData),
    );
    if (!success) {
      return {
        formErrors: z.flattenError(error).fieldErrors,
      };
    }
    const { name, role, headline, bio } = data;
    await updateUser(client, {
      id: userId,
      name,
      role,
      headline,
      bio,
    });
    return {
      ok: true,
    };
  }
  const { success, error, data } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return {
      formErrors: z.flattenError(error).fieldErrors,
    };
  }
  const { name, role, headline, bio } = data;
  await updateUser(client, {
    id: userId,
    name,
    role,
    headline,
    bio,
  });
  return {
    ok: true,
  };
};

export default function SettingsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(loaderData.user.avatar);
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
          {actionData?.ok ? (
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your profile has been updated.
              </AlertDescription>
            </Alert>
          ) : null}
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <Form className="flex flex-col w-1/2 gap-5" method="post">
            <InputPair
              label="Name"
              description="Your public name"
              required
              id="name"
              defaultValue={loaderData.user.name}
              name="name"
              placeholder="i.e. John Doe"
            />
            {actionData?.formErrors && "name" in actionData.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors.name?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
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
              defaultValue={loaderData.user.role}
            />
            {actionData?.formErrors && "role" in actionData.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors.role?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <InputPair
              label="Headline"
              description="Your headline. This will be displayed on your profile."
              required
              defaultValue={loaderData.user.headline || ""}
              id="headline"
              name="headline"
              placeholder="i.e. A passionate backend developer."
            />
            {actionData?.formErrors && "headline" in actionData.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors.headline?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <InputPair
              label="Bio"
              description="Your public bio. This will be displayed on your profile."
              required
              defaultValue={loaderData.user.bio || ""}
              id="bio"
              name="bio"
              placeholder="i.e. I'm a software engineer at Google."
              textArea
            />
            {actionData?.formErrors && "bio" in actionData.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors.bio?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <Button type="submit" className="w-full">
              Update Profile
            </Button>
          </Form>
        </div>
        <Form
          className="col-span-2 p-6 rounded-lg border shadow-md space-y-2"
          method="post"
          encType="multipart/form-data"
        >
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
            />
            {actionData?.formErrors && "avatar" in actionData.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors.avatar.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <span>Recommended size: 128x128</span>
              <span>Allowed formats: SVG, PNG, JPG</span>
              <span>Max file size: 1MB</span>
            </div>
            <Button className="w-full">Update Avatar</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
