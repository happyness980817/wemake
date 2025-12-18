import type { Route } from "./+types/notifications-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Notifications | Wemake" }];
};

export default function NotificationsPage({}: Route.ComponentProps) {
  return <div></div>;
}

