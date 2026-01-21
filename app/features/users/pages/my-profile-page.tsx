import { redirect } from "react-router";
import type { Route } from "./+types/my-profile-page";
import { makeSSRClient } from "~/supa-client";
import { getUserById } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Profile | Wemake" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();
  // https://supabase.com/docs/reference/javascript/auth-getuser
  if (user) {
    const profile = await getUserById(client, { id: user.id });
    return redirect(`/users/${profile.username}`);
  }
  return redirect("/auth/login");
};
