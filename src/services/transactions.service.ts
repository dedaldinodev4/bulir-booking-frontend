import api from "@/lib/axios";
import {
  PaginatedTransactionsSchema,
  CreateTransactionSchema,
  UpdateTransactionSchema,
  TransactionSchema
} from "@/schemas/transaction";
import { z } from "zod";

type QueryPagination = {
  page: number; 
  limit: number;
  bookingId?: string;
  walletId?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
  status?: 'PENDING' | 'FAILED' | 'PAID' | 'REFUNDED';
  type?: 'CREDIT' | 'DEBIT';
}

export const transactionsService = { 

  async create(payload: unknown) {

    try {
      const validPayload = CreateTransactionSchema.parse(payload);
      const { data } = await api.post("/transactions", validPayload);
      return data;
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log("Erro de validação:");
        console.log(error);
      }
    }
  },

  async getTransactions({ page, limit, 
    order, bookingId, walletId, status, type, orderBy }: QueryPagination) {
    const response = await api.get(`/transactions?page=${page}&limit=${limit}&walletId=${walletId}`);
    return PaginatedTransactionsSchema.parse(response.data);
  },

  async update({id, payload, }: { id: string; payload: unknown;}) {
    const validPayload = UpdateTransactionSchema.parse(payload);
    const { data } = await api.put(`/transactions/${id}`, validPayload);
    return data;
  },

  async getOneTransaction(id: string ) {
    const response = await api.get(`/transactions/${id}`);
    return TransactionSchema.parse(response.data)
  },

  async delete(id: string ) {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },

}
