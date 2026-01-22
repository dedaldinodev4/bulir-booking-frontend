import { Booking } from "@/schemas/booking"
import { Transaction } from "@/schemas/transaction"
import {
  averageBookingValue,
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
  IProviderMetrics 
} from "@/schemas/metrics"


export function providerMetrics({
  bookings,
  transactions
}: IMetricsParams) : IProviderMetrics {

  return {
    totalBookings: bookings.length,
    completedBookings: completedBookings(bookings),
    cancelledBookings: cancelledBookings(bookings),
    gmv: calculateGMV(transactions),
    averageTicket: averageBookingValue(bookings),
    bookingRate: bookingSuccessRate(bookings),
    transactionRate: transactionSuccessRate(transactions)
  }
}


