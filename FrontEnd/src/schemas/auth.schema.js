import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "50 characters only allowed"),
  email: z.email("Invalid email").trim().toLowerCase(),
  password: z.string().trim().min(6, "Minimum 6 characters Required"),
});

export const LoginSchema = z.object({
  email: z.email("Invalid email").trim().toLowerCase(),
  password: z.string().trim().min(1, "password is Required"),
});
