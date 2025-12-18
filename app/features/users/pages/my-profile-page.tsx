import { redirect } from "react-router";
import type { Route } from "./+types/my-profile-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "My Profile | Wemake" }];
};

export function loader() {
  // find user by cookies
  return redirect("/users/happyness980817");
}

export default function MyProfilePage({}: Route.ComponentProps) {
  return <div></div>;
}
