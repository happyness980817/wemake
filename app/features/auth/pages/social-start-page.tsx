import type { Route } from "./+types/social-start-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Social Start | Wemake" }];
};

export default function SocialStartPage({}: Route.ComponentProps) {
  return <div>Social Start Page</div>;
}

