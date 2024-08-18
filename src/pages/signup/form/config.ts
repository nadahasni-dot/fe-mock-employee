import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Please provide valid email" })
      .max(50, "Email length can not exceed 50 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password length can not exceed 16 characters"),
    conf_password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password length can not exceed 16 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.conf_password) {
      ctx.addIssue({
        code: "custom",
        message: "Confirmation password is not correct",
        path: ["conf_password"],
      });
    }
  });
