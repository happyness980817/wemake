import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-post-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { getTopics } from "../queries";
import z from "zod";
import { createPost } from "../mutations";
import { redirect } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Submit Post | Wemake" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const topics = await getTopics(client);
  return { topics };
};

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(40, "Title must be at most 40 characters"),
  category: z.string().min(1, "Category is required"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1000, "Content must be at most 1000 characters"),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }
  const { title, category, content } = data;
  const { post_id } = await createPost(client, {
    title,
    category,
    content,
    userId,
  });
  return redirect(`/community/${post_id}`);
};

export default function SubmitPostPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero
        title="Create Discussion"
        subtitle="Share your thoughts and ideas with the community"
      />
      <Form className="flex flex-col gap-10 max-w-3xl mx-auto" method="POST">
        <InputPair
          label="Title"
          description="(40 characters max)"
          id="title"
          name="title"
          required
          placeholder="i.e. What is the best way to learn React?"
        />
        {actionData && "fieldErrors" in actionData && (
          <div className="text-red-500">
            {actionData.fieldErrors.title?.join(", ")}
          </div>
        )}
        <SelectPair
          name="category"
          label="Category"
          description="The category of your discussion"
          required
          placeholder="Select a category"
          options={loaderData.topics.map((topic) => ({
            value: topic.slug,
            label: topic.name,
          }))}
        />
        {actionData && "fieldErrors" in actionData && (
          <div className="text-red-500">
            {actionData.fieldErrors.category?.join(", ")}
          </div>
        )}
        <InputPair
          label="Content"
          description="(1000 characters max)"
          id="content"
          name="content"
          required
          placeholder="i.e. I'm looking for a way to learn React. I've been using the official React documentation, but I'm not sure if it's the best way to learn React."
          textArea
        />
        {actionData && "fieldErrors" in actionData && (
          <div className="text-red-500">
            {actionData.fieldErrors.content?.join(", ")}
          </div>
        )}
        <div className="flex justify-end">
          <Button type="submit">Create Discussion</Button>
        </div>
      </Form>
    </div>
  );
}
