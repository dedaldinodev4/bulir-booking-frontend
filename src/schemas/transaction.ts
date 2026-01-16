import { z } from "zod";

export const TransactionSchema = z.object({
  id: z.string(),
  amount: z.string(),
  type: z.string(),
  status: z.string(),
  bookingId: z.string(),
  walletId: z.string(),
  booking: z.object({

    price: z.string(),

    provider: z.object({
      name: z.string(),
      email: z.string(),
      identify: z.string(),
    }).optional(),

    client: z.object({
      name: z.string(),
      email: z.string(),
      identify: z.string(),
    }).optional(),

    service: z.object({
      name: z.string(),
      price: z.string(),
      description: z.string(),
    }).optional(),
  }).optional(),
  wallet: z.object({
    id: z.string(),
    user: z.object({
      name: z.string(),
      email: z.string(),
      identify: z.string(),
    }).optional()
  }).optional(),
  created_at: z.string(),
  updated_at: z.string(),
});


export const CreateTransactionSchema = z.object({
  amount: z.string().min(3, 'Preço minímo é de 500KZ'),
  status: z.enum(["PENDING", "PAID", "FAILED", "REFUNDED"]).default('PENDING'),
  type: z.enum(["CREDIT", "DEBIT"])
})

export const PaginatedTransactionsSchema = z.object({
  data: z.array(TransactionSchema),
  paginator: z.object({
    currentPage: z.number().nullable(),
    pages: z.number().nullable(),
    nextPage: z.number().nullable(),
    prevPage: z.number().nullable(),
    perPage: z.number().nullable(),
    totalResults: z.number().nullable(),
    totalCurrentResults: z.number().nullable(),
    lastPage: z.number().nullable(),
  })
   
});

export const UpdateTransactionSchema = CreateTransactionSchema.partial();

export type Transaction = z.infer<typeof TransactionSchema>;
export type PaginatedTransactions = z.infer<typeof PaginatedTransactionsSchema>;
export type CreateTransactionDTO = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransactionDTO = z.infer<typeof UpdateTransactionSchema>

