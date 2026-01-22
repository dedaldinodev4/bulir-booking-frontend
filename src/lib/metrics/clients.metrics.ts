import { 
  bookingSuccessRate, 
  cancelledBookings, 
  completedBookings 
} from "./bookings.metrics"
import { 
  calculateGMV, 
  transactionSuccessRate 
} from "./transactions.metrics"
import { 
  IMetricsParams, 
  IClientMetrics } from "@/schemas/metrics"


export function clientMetrics({
  bookings,
  transactions
}: IMetricsParams) : IClientMetrics {

  return {
    totalBookings: bookings.length,
    completedBookings: completedBookings(bookings),
    cancelledBookings: cancelledBookings(bookings),
    totalSpent: calculateGMV(transactions),
    transactionRate: transactionSuccessRate(transactions),
    bookingRate: bookingSuccessRate(bookings)
  }
}
