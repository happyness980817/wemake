import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-job-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constants";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Submit Job | Wemake" }];
};

export default function SubmitJobPage({}: Route.ComponentProps) {
  return (
    <div>
      <Hero
        title="Post a Job"
        subtitle="Reach out to the best developers in the world"
      />
      <Form className="max-w-screen-2xl flex flex-col gap-10 mx-auto items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-10">
          <InputPair
            id="position"
            label="Position"
            description="(40 characters max)"
            name="position"
            maxLength={40}
            type="text"
            required
            placeholder="e.g. Frontend Developer"
          />
          <InputPair
            id="overview"
            label="Overview"
            description="(400 characters max)"
            name="company"
            maxLength={400}
            type="text"
            required
            placeholder="e.g. We are looking for a frontend developer with 3 years of experience in React and TypeScript."
            textArea
          />
          <InputPair
            id="responsibilities"
            label="Responsibilities"
            description="(400 characters max, separated by commas)"
            name="responsibilities"
            maxLength={400}
            type="text"
            required
            placeholder="e.g. Develop and maintain web applications using React and TypeScript, Collaborate with other developers to design and implement new features. - Optimize application performance and scalability."
            textArea
          />
          <InputPair
            id="qualifications"
            label="Qualifications"
            description="(400 characters max, separated by commas)"
            name="qualifications"
            maxLength={400}
            type="text"
            required
            placeholder="e.g. Bachelor's degree in Computer Science or related field, 3 years of experience in React and TypeScript, Strong understanding of web application development."
            textArea
          />
          <InputPair
            id="benefits"
            label="Benefits"
            description="(400 characters max, separated by commas)"
            name="benefits"
            maxLength={400}
            type="text"
            required
            placeholder="e.g. Health insurance, 401(k) retirement plan, Flexible spending account, Paid holidays."
            textArea
          />
          <InputPair
            id="skills"
            label="Skills"
            description="(400 characters max, separated by commas)"
            name="skills"
            maxLength={400}
            type="text"
            required
            placeholder="e.g. React, TypeScript, JavaScript, Node.js, MongoDB."
            textArea
          />
          <InputPair
            id="companyName"
            label="Company Name"
            description="(40 characters max)"
            name="companyName"
            maxLength={40}
            type="text"
            required
            placeholder="e.g. Google"
          />
          <InputPair
            id="companyLogoUrl"
            label="Company Logo URL"
            description="(200 characters max)"
            name="companyLogoUrl"
            maxLength={200}
            type="text"
            required
            placeholder="e.g. https://www.google.com/logo.png"
          />
          <InputPair
            id="companyLocation"
            label="Company Location"
            description="(40 characters max)"
            name="companyLocation"
            maxLength={40}
            type="text"
            required
            placeholder="e.g. San Francisco, CA"
          />
          <InputPair
            id="applyUrl"
            label="Apply URL"
            description="(200 characters max)"
            name="applyUrl"
            maxLength={200}
            type="url"
            required
            placeholder="e.g. https://www.google.com/apply"
          />
          <SelectPair
            label="Job Type"
            description="Select the type of job"
            name="jobType"
            required
            placeholder="e.g. Full-time"
            options={JOB_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
          <SelectPair
            label="Job Location"
            description="Select the location of the job"
            name="jobLocation"
            required
            placeholder="e.g. Remote"
            options={LOCATION_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
          <SelectPair
            label="Salary Range"
            description="Select the salary range of the job"
            name="salaryRange"
            required
            placeholder="e.g. $0 - $50,000"
            options={SALARY_RANGES.map((range) => ({
              label: range,
              value: range,
            }))}
          />
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">
          Post Job ($100)
        </Button>
      </Form>
    </div>
  );
}
