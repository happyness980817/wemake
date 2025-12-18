import type { Route } from "./+types/message-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Message | Wemake" }];
};

export default function MessagePage({}: Route.ComponentProps) {
  return <div></div>;
}

