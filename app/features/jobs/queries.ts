import client from "~/supa-client";
import type { Database } from "../../../database.types";

export const getJobs = async ({
  limit,
  location,
  type,
  salary,
}: {
  limit: number;
  location?: string;
  type?: string;
  salary?: string;
}) => {
  const baseQuery = client
    .from("jobs")
    .select(
      `
      job_id,
      position,
      overview,
      company_name,
      company_logo_url,
      company_location,
      apply_url,
      job_type,
      job_location,
      salary_range,
      created_at
    `
    )
    .limit(limit);
  if (location) {
    baseQuery.eq(
      "job_location",
      location as Database["public"]["Enums"]["location_type"]
    );
  }
  if (type) {
    baseQuery.eq("job_type", type as Database["public"]["Enums"]["job_type"]);
  }
  if (salary) {
    baseQuery.eq(
      "salary_range",
      salary as Database["public"]["Enums"]["salary_range"]
    );
  }
  const { data, error } = await baseQuery;
  if (error) throw error;
  return data;
};

export const getJobById = async (jobId: number) => {
  const { data, error } = await client
    .from("jobs")
    .select("*")
    .eq("job_id", jobId)
    .single();
  if (error) throw error;
  return data;
};
