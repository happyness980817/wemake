import type { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Dashboard Ideas | Wemake" }];
};

export default function DashboardIdeasPage({}: Route.ComponentProps) {
  return <div></div>;
}

