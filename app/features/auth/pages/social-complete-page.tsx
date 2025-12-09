import type { Route } from "./+types/social-complete-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Social Complete | Wemake" }];
};

export default function SocialCompletePage({}: Route.ComponentProps) {
  return <div>Social Complete Page</div>;
}

