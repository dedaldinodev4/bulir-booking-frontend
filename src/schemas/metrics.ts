import z from "zod";
import { BookingSchema } from "./booking";
import { TransactionSchema } from "./transaction"

//* Bookings  *//
const BookingRate = z.object({
  completed: z.number().optional(),
  cancelled: z.number().optional(),
  completedRate: z.number().optional(),
  cancelledRate: z.number().optional(),
  dominant: z.string().optional(),
})

//* Transactions *//
export const TransactionRate =  z.object({
  paid: z.number().optional(),
  failed: z.number().optional(),
  paidRate: z.number().optional(),
  failedRate: z.number().optional(),
  dominant: z.string().optional()
})

export const MetricsParams = z.object({
  transactions: z.array(TransactionSchema),
  bookings: z.array(BookingSchema),
});

export const ClientMetrics = z.object({
  totalBookings: z.number(),
  completedBookings: z.number(),
  totalSpent: z.number(),
  bookingRate: BookingRate,
  transactionRate: TransactionRate
});

export const ProviderMetrics = z.object({
  totalBookings: z.number(),
  completedBookings: z.number(),
  cancelledBookings: z.number(),
  gmv: z.number(),
  averageTicket: z.number(),
  bookingRate: BookingRate,
  transactionRate: TransactionRate
})

export const GeneralMetrics = z.object({
  gmv: z.number(),
  totalBookings: z.number(),
  totalTransactions: z.number(),
  cancellationRate: z.number(), 
  paymentConversionRate: z.number(),
  averageTicket: z.number(),
})


export const ResultMetrics = z.object({
  bookings: z.array(BookingSchema),
  transactions: z.array(TransactionSchema),
});


export type IBookingRate = z.infer<typeof BookingRate>;
export type ITransactionRate = z.infer<typeof TransactionRate>;
export type IMetricsParams = z.infer<typeof MetricsParams>;
export type IResultMetrics = z.infer<typeof ResultMetrics>;
export type IClientMetrics = z.infer<typeof ClientMetrics>;
export type IProviderMetrics = z.infer<typeof ProviderMetrics>;
export type IGeneralMetrics = z.infer<typeof GeneralMetrics>;
