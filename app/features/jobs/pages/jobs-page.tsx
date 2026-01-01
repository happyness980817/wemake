import { Button } from "~/common/components/ui/button";
import { JobCard } from "../components/job-card";
import type { Route } from "./+types/jobs-page";
import { Hero } from "~/common/components/hero";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constants";
import { useSearchParams } from "react-router";
import { cn } from "~/lib/utils";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Jobs | Wemake" },
    { name: "description", content: "Companies looking for makers" },
  ];
};

export default function JobsPage({}: Route.ComponentProps) {
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
          {Array.from({ length: 20 }).map((_, index) => (
            <JobCard
              key={index}
              id={`jobId-${index}`}
              title={`Job Title ${index}`}
              companyName={`Company ${index}`}
              companyLogoURL={`https://github.com/apple.png`}
              timestamp="12 hours ago"
              badges={["Remote", "Full-Time"]}
              salaryRange="100,000 - 150,000"
              location={`Location ${index}`}
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
