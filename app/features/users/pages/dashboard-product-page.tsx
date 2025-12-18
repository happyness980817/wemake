import type { Route } from "./+types/dashboard-product-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Dashboard Product | Wemake" }];
};

export default function DashboardProductPage({}: Route.ComponentProps) {
  return <div></div>;
}

