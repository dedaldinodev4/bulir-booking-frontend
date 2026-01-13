import { z } from "zod";

export const CreateWalletSchema = z.object({
  balance: z.string(),
  userId: z.string(),
});

export const UpdateWalletSchema = CreateWalletSchema.partial();
export type CreateWalletDTO = z.infer<typeof CreateWalletSchema>
export type UpdateWalletDTO = z.infer<typeof UpdateWalletSchema>;
