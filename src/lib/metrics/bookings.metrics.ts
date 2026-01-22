import { Booking } from "@/schemas/booking";
import type { IBookingRate } from "@/schemas/metrics";

export function totalBookings(bookings: Booking[]): number {
  return bookings.length
}

export function completedBookings(bookings: Booking[]): number {
  return bookings.filter(b => b.status === 'COMPLETED').length
}

export function cancelledBookings(bookings: Booking[]): number {
  return bookings.filter(b => b.status === 'CANCELLED').length
}

export function cancellationRate(bookings: Booking[]): number {
  const total = bookings.length
  if (total === 0) return 0

  const cancelled = cancelledBookings(bookings)
  return (cancelled / total) * 100
}

export function averageBookingValue(bookings: Booking[]): number {
  const completed = bookings.filter(b => b.status === 'COMPLETED')
  if (completed.length === 0) return 0

  const total = completed.reduce((sum, b) => sum + Number(b.price), 0)
  return total / completed.length
}


export function bookingSuccessRate(bookings: Booking[]): IBookingRate {
  const completed = bookings.filter(b => b.status === 'COMPLETED').length
  const cancelled = bookings.filter(b => b.status === 'CANCELLED').length

  const total = completed + cancelled

  if (total === 0) {
    return {
      completedRate: 0,
      cancelledRate: 0,
      dominant: 'NONE',
    }
  }

  const completedRate = (completed / total) * 100
  const cancelledRate = (cancelled / total) * 100

  return {
    completed,
    cancelled,
    completedRate,
    cancelledRate,
    dominant:
      completed > cancelled
        ? 'COMPLETED'
        : cancelled > completed
          ? 'CANCELLED'
          : 'EQUAL',
  }
}


