import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactions.service";


type useTransactionParams = {
  page: number; 
  limit: number;
  bookingId?: string;
  walletId?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
  status?: 'PENDING' | 'FAILED' | 'PAID' | 'REFUNDED';
  type?: 'CREDIT' | 'DEBIT';
}

export function useTransactions(params: useTransactionParams ) {
  const {
    page, limit, bookingId, walletId, orderBy, order, status, type
  } = params;
  return useQuery({
    queryKey: ["transactions", { page, limit, bookingId, walletId, orderBy, order, status, type } ],
    queryFn: () => transactionsService.getTransactions({ 
      page, 
      limit, 
      bookingId, 
      walletId, 
      orderBy, 
      order, 
      status, 
      type,
    }),
  });
}
