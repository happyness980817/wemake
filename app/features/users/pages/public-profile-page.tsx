import type { Route } from "./+types/public-profile-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Public Profile | Wemake" }];
};

export default function PublicProfilePage({}: Route.ComponentProps) {
  return <div></div>;
}

