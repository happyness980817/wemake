import { Badge } from "~/common/components/ui/badge";
import type { Route } from "./+types/job-page";
import { DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { getJobById } from "../queries";
import { z } from "zod";
import { data } from "react-router";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";

const paramsSchema = z.object({
  jobId: z.coerce.number(),
});

export const meta: Route.MetaFunction = () => {
  return [{ title: "Job | Wemake" }];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { serverSideClient: client, headers } = makeSSRClient(request);
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data(
      {
        error_code: "INVALID_PARAMS",
        message: "Invalid parameters",
      },
      { status: 400 }
    );
  }
  const job = await getJobById(client, parsedData.jobId);
  return data({ job }, { headers });
};

export default function JobPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div className="bg-linear-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
      <div className="grid grid-cols-1 lg:grid-cols-6 -mt-20 gap-20 items-start">
        <div className="col-span-1 lg:col-span-4 space-y-10">
          <div>
            <div className="rounded-full size-40 bg-white overflow-hidden relative left-10">
              <img
                src={loaderData.job.company_logo_url}
                alt={loaderData.job.company_name}
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold">{loaderData.job.position}</h1>
            <h4 className="text-lg text-muted-foreground">
              {loaderData.job.company_name}
            </h4>
          </div>
          <div className="flex gap-2 capitalize">
            <Badge variant="secondary">{loaderData.job.job_type}</Badge>
            <Badge variant="secondary">{loaderData.job.job_location}</Badge>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg">{loaderData.job.overview}</p>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="text-lg list-disc list-inside capitalize">
              {loaderData.job.responsibilities.split(",").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="text-lg list-disc list-inside">
              {loaderData.job.qualifications.split(",").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-lg list-disc list-inside">
              {loaderData.job.benefits.split(",").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className="text-lg list-disc list-inside">
              {loaderData.job.skills.split(",").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2 space-y-4 mt-32 sticky top-20 border rounded-lg p-6">
          <div className="flex flex-col">
            <span className="text-2xl font-medium">
              {loaderData.job.salary_range}
            </span>
            <span className="text-sm text-muted-foreground">Avg. Salary</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-medium capitalize">
              {loaderData.job.job_type}
            </span>
            <span className="text-sm text-muted-foreground">
              Employment Type
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-medium capitalize">
              {loaderData.job.job_location}
            </span>
            <span className="text-sm text-muted-foreground">Location</span>
          </div>
          <div className="flex">
            <span className="text-sm text-muted-foreground">
              Posted{" "}
              {DateTime.fromISO(loaderData.job.created_at).toRelative({
                locale: "en",
              })}
            </span>
            <DotIcon className="size-4" />
            <span className="text-sm text-muted-foreground">120 views</span>
          </div>
          <Button className="w-full">Apply Now</Button>
        </div>
      </div>
    </div>
  );
}
