import { z } from "zod";

export const EducationSchema = z.object({
  level: z
    .string({ message: "Level is required" })
    .min(1, "Required")
    .max(10, "Level length can not exceed 10 characters"),
  institute: z
    .string({ message: "Institute is required" })
    .min(1, "Required")
    .max(150, "Institute length can not exceed 150 characters"),
  major: z
    .string({ message: "Major is required" })
    .min(1, "Required")
    .max(50, "Major length can not exceed 50 characters"),
  year_graduated: z
    .string({ message: "Year graduated is required" })
    .min(1, "Required")
    .max(5, "Year graduated length can not exceed 5 characters"),
  grade: z
    .string({ message: "Grade is required" })
    .min(1, "Required")
    .max(5, "Grade length can not exceed 5 characters"),
});
