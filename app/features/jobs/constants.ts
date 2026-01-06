export const JOB_TYPES = [
  {
    label: "Full-Time",
    value: "full-time",
  },
  {
    label: "Part-Time",
    value: "part-time",
  },
  {
    label: "Freelance",
    value: "freelance",
  },
  {
    label: "Internship",
    value: "internship",
  },

  {
    label: "Contract",
    value: "contract",
  },
] as const;

export const LOCATION_TYPES = [
  {
    label: "Remote",
    value: "remote",
  },
  {
    label: "On-Site",
    value: "on-site",
  },
  {
    label: "Hybrid",
    value: "hybrid",
  },
] as const;

export const SALARY_RANGES = [
  "$0 - $50,000",
  "$50,000 - $100,000",
  "$100,000 - $200,000",
  "$200,000+",
] as const;
