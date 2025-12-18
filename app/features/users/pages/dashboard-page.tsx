import type { Route } from "./+types/dashboard-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Dashboard | Wemake" }];
};

export default function DashboardPage({}: Route.ComponentProps) {
  return <div></div>;
}

