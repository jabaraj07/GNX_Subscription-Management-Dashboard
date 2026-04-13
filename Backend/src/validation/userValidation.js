import z from "zod";
export const UserValidation = z.object({
  name: z
    .string()
    .trim()
    .min(1, "name atleast 1 character need")
    .max(50, "Maximum 50 character allowed"),
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z
    .string()
    .min(6, "minimum 6 character required")
    .max(50, "Maximum 50 character allowed"),
    role:z.enum(["user","admin"],"user or admin role only accepted").optional()
});

export const LoginValidation = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email or password"),
  password: z
    .string()
    .min(6, "Invalid email or password")
});