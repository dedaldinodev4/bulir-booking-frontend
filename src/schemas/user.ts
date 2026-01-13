import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(3, "Preenchimento mínimo de 3 carácteres"),
  email: z.email({ pattern: z.regexes.email, message: "Email inválido." }),
  identify: z.union([
    z.string().regex(/^\d{9}[A-Z]{2}\d{3}$/, {
      message:
        "NIF inválido. Use o formato: 9 números, 2 letras e 3 números (ex: 123456789LA001).",
    }),
    z.string().regex(/^[0-3]\d{9}$/, { message: 'NIF inválido.'}),
  ]),
  password: z.string().min(6,"Preenchimento mínimo de 6 carácteres")
});

export const UpdateUserSchema = CreateUserSchema.partial();
export type CreateUserDTO = z.infer<typeof CreateUserSchema>
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
