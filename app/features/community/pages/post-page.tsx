import type { Route } from "./+types/post-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Post | Wemake" }];
};

export default function PostPage({}: Route.ComponentProps) {
  return <div></div>;
}

