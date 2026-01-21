import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-job-page";
import { Form, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constants";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import z from "zod";
import { createJob } from "../mutations";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Submit Job | Wemake" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const formSchema = z.object({
  position: z.string().min(1).max(40),
  overview: z.string().min(1).max(400),
  responsibilities: z.string().min(1).max(400),
  qualifications: z.string().min(1).max(400),
  benefits: z.string().min(1).max(400),
  skills: z.string().min(1).max(400),
  companyName: z.string().min(1).max(40),
  companyLogoUrl: z.string().min(1).max(200),
  companyLocation: z.string().min(1).max(40),
  applyUrl: z.string().min(1).max(200),
  jobType: z.enum(JOB_TYPES.map((type) => type.value)),
  jobLocation: z.enum(LOCATION_TYPES.map((location) => location.value)),
  salaryRange: z.enum(SALARY_RANGES),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors,
    };
  }
  const { job_id } = await createJob(client, data);
  return redirect(`/jobs/${job_id}`);
};

export default function SubmitJobPage({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <Hero
        title="Post a Job"
        subtitle="Reach out to the best developers in the world"
      />
      <Form
        className="max-w-screen-2xl flex flex-col gap-10 mx-auto items-center"
        method="post"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-10">
          <InputPair
            id="position"
            label="Position"
            description="(40 characters max)"
            name="position"
            maxLength={40}
            type="text"
            required
            defaultValue="Frontend Developer"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.position}</p>
          )}
          <InputPair
            id="overview"
            label="Overview"
            description="(400 characters max)"
            name="overview"
            maxLength={400}
            type="text"
            required
            defaultValue="We are looking for a frontend developer with 3 years of experience in React and TypeScript."
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.overview}</p>
          )}
          <InputPair
            id="responsibilities"
            label="Responsibilities"
            description="(400 characters max, separated by commas)"
            name="responsibilities"
            maxLength={400}
            type="text"
            required
            defaultValue="Develop and maintain web applications using React and TypeScript, Collaborate with other developers to design and implement new features. - Optimize application performance and scalability."
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.responsibilities}
            </p>
          )}
          <InputPair
            id="qualifications"
            label="Qualifications"
            description="(400 characters max, separated by commas)"
            name="qualifications"
            maxLength={400}
            type="text"
            required
            defaultValue="Bachelor's degree in Computer Science or related field, 3 years of experience in React and TypeScript, Strong understanding of web application development."
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.qualifications}
            </p>
          )}
          <InputPair
            id="benefits"
            label="Benefits"
            description="(400 characters max, separated by commas)"
            name="benefits"
            maxLength={400}
            type="text"
            required
            defaultValue="Health insurance, 401(k) retirement plan, Flexible spending account, Paid holidays."
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.benefits}</p>
          )}
          <InputPair
            id="skills"
            label="Skills"
            description="(400 characters max, separated by commas)"
            name="skills"
            maxLength={400}
            type="text"
            required
            defaultValue="React, TypeScript, JavaScript, Node.js, MongoDB."
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.skills}</p>
          )}
          <InputPair
            id="companyName"
            label="Company Name"
            description="(40 characters max)"
            name="companyName"
            maxLength={40}
            type="text"
            required
            defaultValue="Google"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.companyName}</p>
          )}
          <InputPair
            id="companyLogoUrl"
            label="Company Logo URL"
            description="(200 characters max)"
            name="companyLogoUrl"
            maxLength={200}
            type="text"
            required
            defaultValue="https://www.google.com/logo.png"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.companyLogoUrl}
            </p>
          )}
          <InputPair
            id="companyLocation"
            label="Company Location"
            description="(40 characters max)"
            name="companyLocation"
            maxLength={40}
            type="text"
            required
            defaultValue="San Francisco, CA"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.companyLocation}
            </p>
          )}
          <InputPair
            id="applyUrl"
            label="Apply URL"
            description="(200 characters max)"
            name="applyUrl"
            maxLength={200}
            type="url"
            required
            defaultValue="https://www.google.com/apply"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.applyUrl}</p>
          )}
          <SelectPair
            label="Job Type"
            description="Select the type of job"
            name="jobType"
            required
            placeholder="Full-time"
            options={JOB_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.jobType}</p>
          )}
          <SelectPair
            label="Job Location"
            description="Select the location of the job"
            name="jobLocation"
            required
            placeholder="Remote"
            options={LOCATION_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.jobLocation}</p>
          )}
          <SelectPair
            label="Salary Range"
            description="Select the salary range of the job"
            name="salaryRange"
            required
            placeholder="$0 - $50,000"
            options={SALARY_RANGES.map((range) => ({
              label: range,
              value: range,
            }))}
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.salaryRange}</p>
          )}
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">
          Post Job ($100)
        </Button>
      </Form>
    </div>
  );
}
