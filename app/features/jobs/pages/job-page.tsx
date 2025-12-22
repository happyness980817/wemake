import { Badge } from "~/common/components/ui/badge";
import type { Route } from "./+types/job-page";
import { DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Job | Wemake" }];
};

export default function JobPage({}: Route.ComponentProps) {
  return (
    <div>
      <div className="bg-linear-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
      <div className="grid grid-cols-1 lg:grid-cols-6 -mt-20 gap-20 items-start">
        <div className="col-span-1 lg:col-span-4 space-y-10">
          <div>
            <div className="rounded-full size-40 bg-white overflow-hidden relative left-10">
              <img
                src="https://github.com/apple.png"
                alt="Company Logo"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold">Software Engineer</h1>
            <h4 className="text-lg text-muted-foreground">Apple Inc.</h4>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">Full-time</Badge>
            <Badge variant="secondary">Remote</Badge>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg">
              Looking for a Software Engineer with 3 years of experience in
              React, Node.js, and MongoDB.
            </p>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "Develop and maintain web applications using React, Node.js, and MongoDB.",
                "Implement new features and improve existing code.",
                "Debug and fix bugs.",
                "Optimize applications for maximum speed and scalability.",
                "Collaborate with other developers to ensure timely delivery of projects.",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "3 years of experience in React, Node.js, and MongoDB.",
                "Strong understanding of web development principles and best practices.",
                "Familiarity with Agile methodologies and software development processes.",
                "Excellent problem-solving skills.",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "Health insurance",
                "401(k) retirement plan",
                "Paid time off",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className="text-lg list-disc list-inside">
              {["React", "Node.js", "MongoDB", "TypeScript", "JavaScript"].map(
                (item) => (
                  <li key={item}>{item}</li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2 space-y-4 mt-32 sticky top-20 border rounded-lg p-6">
          <div className="flex flex-col">
            <span className="text-2xl font-medium">
              $100,000 - $120,000 per year
            </span>
            <span className="text-sm text-muted-foreground">Avg. Salary</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-medium">Full-time</span>
            <span className="text-sm text-muted-foreground">
              Employment Type
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-medium">Remote</span>
            <span className="text-sm text-muted-foreground">Location</span>
          </div>
          <div className="flex">
            <span className="text-sm text-muted-foreground">
              Posted 12 days ago
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
