import { Booking } from "@/schemas/booking";
import { Transaction } from "@/schemas/transaction";
import {
  calculateGMV,
  paymentConversionRate,
  totalTransactions
} from "./transactions.metrics";
import {
  averageBookingValue,
  cancellationRate,
  totalBookings
} from "./bookings.metrics";
import { 
  IMetricsParams, 
  IGeneralMetrics 
} from "@/schemas/metrics";

export function globalMetrics({
  bookings,
  transactions
}: IMetricsParams): IGeneralMetrics {
  return {
    gmv: calculateGMV(transactions),
    totalTransactions: totalTransactions(transactions),
    paymentConversionRate: paymentConversionRate(transactions),
    totalBookings: totalBookings(bookings),
    cancellationRate: cancellationRate(bookings),
    averageTicket: averageBookingValue(bookings),
  }
}
