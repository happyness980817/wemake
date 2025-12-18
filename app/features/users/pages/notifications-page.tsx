import type { Route } from "./+types/notifications-page";
import { NotificationCard } from "../components/notification-card";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Notifications | Wemake" }];
};

export default function NotificationsPage({}: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <h1 className="text-4xl font-bold">Notifications</h1>
      <div className="flex flex-col gap-4">
        <NotificationCard
          avatarURL="https://github.com/shadcn-ui.png"
          avatarFallback="CN"
          username="Shadcn UI"
          message="Shadcn UI followed you"
          timestamp="2 days ago"
          seen={false}
        />
      </div>
    </div>
  );
}
