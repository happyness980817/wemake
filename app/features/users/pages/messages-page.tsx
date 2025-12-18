import type { Route } from "./+types/messages-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Messages | Wemake" }];
};

export default function MessagesPage({}: Route.ComponentProps) {
  return <div></div>;
}

