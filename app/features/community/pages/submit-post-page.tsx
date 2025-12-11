import type { Route } from "./+types/submit-post-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Submit Post | Wemake" }];
};

export default function SubmitPostPage({}: Route.ComponentProps) {
  return <div></div>;
}

