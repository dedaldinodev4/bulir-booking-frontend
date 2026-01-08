// schemas/auth.schema.ts
import { z } from "zod";

export const SignInSchema = z.object({
  data: z
    .string()
    .min(3, "Field is required."),

  password: z
    .string()
    .min(6, "Minimum 6 characters."),
});

export type SignInFormData = z.infer<typeof SignInSchema>;
