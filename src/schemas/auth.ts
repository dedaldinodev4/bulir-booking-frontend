// schemas/auth.schema.ts
import { z } from "zod";

export const SignInSchema = z.object({
  data: z
    .string()
    .min(3, "Preenchimento mínimo de 3 carácteres"),

  password: z
    .string()
    .min(6, "Preenchimento mínimo de 6 carácteres"),
});

export type SignInFormData = z.infer<typeof SignInSchema>;
