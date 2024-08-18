import { z } from "zod";

export const BiodataSchema = z.object({
  position: z
    .string({ message: "Position is required" })
    .min(1, "Required")
    .max(100, "Position length can not exceed 100 characters"),
  name: z
    .string({ message: "Name is required" })
    .min(1, "Required")
    .max(150, "Name length can not exceed 150 characters"),
  birth_place: z
    .string({ message: "Birth place is required" })
    .min(1, "Required")
    .max(100, "Birth place length can not exceed 100 characters"),
  birth_date: z
    .string({ message: "Birth date is required" })
    .min(1, "Required"),
  gender: z
    .string({ message: "Gender is required" })
    .min(1, "Required")
    .max(30, "Gender length can not exceed 30 characters"),
  religion: z
    .string({ message: "Religion is required" })
    .min(1, "Required")
    .max(10, "Religion length can not exceed 10 characters"),
  blood_type: z
    .string({ message: "Blood type is required" })
    .min(1, "Required")
    .max(2, "Blood type length can not exceed 2 characters"),
  status: z
    .string({ message: "Status is required" })
    .min(1, "Required")
    .max(50, "Status length can not exceed 50 characters"),
  address_idcard: z
    .string({ message: "ID card address is required" })
    .min(1, "Required")
    .max(255, "ID card address length can not exceed 255 characters"),
  address_live: z
    .string({ message: "Current address is required" })
    .min(1, "Required")
    .max(255, "Current address length can not exceed 255 characters"),
  phone: z
    .string({ message: "Phone is required" })
    .min(1, "Required")
    .max(20, "Phone length can not exceed 20 characters"),
  phone_relation: z
    .string({ message: "Phone relation is required" })
    .min(1, "Required")
    .max(20, "Phone relation length can not exceed 20 characters"),
  skills: z.string({ message: "Skills is required" }).min(1, "Required"),
  is_accept_all_placement: z.boolean({
    message: "Accept placement is required",
  }),
  expected_income: z
    .string({ message: "Expected income is required" })
    .min(1, "Required")
    .max(11, "Expected income length can not exceed 11 characters"),
});
