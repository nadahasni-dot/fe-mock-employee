import { z } from "zod";

export const TrainingSchema = z.object({
  course_name: z
    .string({ message: "Course name is required" })
    .min(1, "Required")
    .max(150, "Course name length can not exceed 150 characters"),
  is_certificate: z.boolean({
    message: "Certificate availability is required",
  }),
  year_start: z
    .string({ message: "Year start is required" })
    .min(1, "Required")
    .max(5, "Year start length can not exceed 5 characters"),
  year_end: z
    .string({ message: "Year end is required" })
    .min(1, "Required")
    .max(5, "Year end length can not exceed 5 characters"),
});
