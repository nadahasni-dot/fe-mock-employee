import { z } from "zod";

export const JobSchema = z.object({
  company_name: z
    .string({ message: "Company name is required" })
    .min(1, "Required")
    .max(100, "Company name length can not exceed 100 characters"),
  position: z
    .string({ message: "Position is required" })
    .min(1, "Required")
    .max(100, "Position length can not exceed 100 characters"),
  last_income: z
    .string({ message: "Last income is required" })
    .min(1, "Required")
    .max(11, "Last income length can not exceed 11 characters"),
  year_start: z
    .string({ message: "Year start is required" })
    .min(1, "Required")
    .max(5, "Year start length can not exceed 5 characters"),
  year_end: z
    .string({ message: "Year end is required" })
    .min(1, "Required")
    .max(5, "Year end length can not exceed 5 characters"),
});
