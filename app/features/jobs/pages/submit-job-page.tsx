import type { Route } from "./+types/submit-job-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Submit Job | Wemake" }];
};

export default function SubmitJobPage({}: Route.ComponentProps) {
  return <div>Submit Job Page</div>;
}
