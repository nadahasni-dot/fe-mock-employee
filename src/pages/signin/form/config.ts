import { z } from "zod";

export const SigninSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide valid email" })
    .max(50, "Email length can not exceed 50 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password length can not exceed 16 characters"),
});
