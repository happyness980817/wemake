import type { Route } from "./+types/job-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Job | Wemake" }];
};

export default function JobPage({}: Route.ComponentProps) {
  return <div>Job Page</div>;
}
