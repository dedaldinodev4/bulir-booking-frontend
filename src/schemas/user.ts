import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  email: z.string(),
  identify: z.string(),
});

export const UpdateUserSchema = UserSchema.partial();
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
