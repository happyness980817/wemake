import { Button } from "~/common/components/ui/button";
import { JobCard } from "../components/job-card";
import type { Route } from "./+types/jobs-page";
import { Hero } from "~/common/components/hero";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constants";
import { data, useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import { getJobs } from "../queries";
import { z } from "zod";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Jobs | Wemake" },
    { name: "description", content: "Companies looking for makers" },
  ];
};

const searchParamsSchema = z.object({
  type: z
    .enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]])
    .optional(),
  location: z
    .enum(
      LOCATION_TYPES.map((location) => location.value) as [string, ...string[]]
    )
    .optional(),
  salary: z.enum(SALARY_RANGES).optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      {
        error_code: "invalid_search_params",
        message: "Invalid search parameters",
      },
      { status: 400 }
    );
  }
  const jobs = await getJobs({
    limit: 40,
    location: parsedData.location,
    type: parsedData.type,
    salary: parsedData.salary,
  });
  return { jobs };
};

export default function JobsPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const onFilterClick = (key: string, value: string) => {
    if (searchParams.get(key) === value) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    setSearchParams(searchParams, { preventScrollReset: true });
  };
  return (
    <div className="space-y-20">
      <Hero title="Jobs" subtitle="Companies looking for makers" />
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-20 items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-span-4 gap-5">
          {loaderData.jobs.map((job) => (
            <JobCard
              key={job.job_id}
              id={job.job_id}
              title={job.position}
              companyName={job.company_name}
              companyLogoURL={job.company_logo_url}
              postedAt={job.created_at}
              badges={[job.job_type]}
              salaryRange={job.salary_range}
              location={job.job_location}
            />
          ))}
        </div>
        <div className="col-span-2 sticky top-20 flex flex-col gap-10">
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">
              Work Type
            </h4>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((type) => (
                <Button
                  key={type.value}
                  variant="outline"
                  onClick={() => onFilterClick("type", type.value)}
                  className={cn(
                    type.value === searchParams.get("type") && "bg-accent"
                  )}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">
              Location
            </h4>
            <div className="flex flex-wrap gap-2">
              {LOCATION_TYPES.map((location) => (
                <Button
                  key={location.value}
                  variant="outline"
                  onClick={() => onFilterClick("location", location.value)}
                  className={cn(
                    location.value === searchParams.get("location") &&
                      "bg-accent"
                  )}
                >
                  {location.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">
              Salary Range
            </h4>
            <div className="flex flex-wrap gap-2">
              {SALARY_RANGES.map((salary) => (
                <Button
                  key={salary}
                  variant="outline"
                  onClick={() => onFilterClick("salary", salary)}
                  className={cn(
                    salary === searchParams.get("salary") && "bg-accent"
                  )}
                >
                  {salary}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
