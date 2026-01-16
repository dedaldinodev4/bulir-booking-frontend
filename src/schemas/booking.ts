import { z } from "zod";

export const BookingSchema = z.object({
  id: z.string(),
  price: z.string(),
  status: z.string(),
  clientId: z.string(),
  providerId: z.string(),
  serviceId: z.string(),

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

  created_at: z.string(),
  updated_at: z.string(),
});

export const CreateBookingSchema = z.object({
  clientId: z.string(),
  providerId: z.string(),
  serviceId: z.string(),
  price: z.string(),
})

export const PaginatedBookingsSchema = z.object({
  data: z.array(BookingSchema),
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

export const UpdateBookingSchema = CreateBookingSchema.partial();

export type Booking = z.infer<typeof BookingSchema>;
export type PaginatedBookings = z.infer<typeof PaginatedBookingsSchema>;
export type CreateBookingDTO = z.infer<typeof CreateBookingSchema>;
export type UpdateBookingDTO = z.infer<typeof UpdateBookingSchema>

