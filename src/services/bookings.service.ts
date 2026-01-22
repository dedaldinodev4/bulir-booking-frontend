import api from "@/lib/axios";
import {
  PaginatedBookingsSchema,
  CreateBookingSchema,
  UpdateBookingSchema,
  BookingSchema
} from "@/schemas/booking";
import { z } from "zod";

type QueryPagination = {
  page: number;
  limit: number;
  clientId?: string;
  providerId?: string;
  serviceId?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
  status?: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";
}

export const bookingsService = {

  async create(payload: unknown) {
    const validPayload = CreateBookingSchema.parse(payload);
    const { data } = await api.post("/bookings", validPayload);
    return data;
  },

  async getBookings({ page, limit,
    order, providerId, clientId, status, serviceId, orderBy }: QueryPagination) {
    let queryString = `/bookings?page=${page}&limit=${limit}&providerId=${providerId}`;
    if (clientId) {
      queryString = `/bookings?page=${page}&limit=${limit}&clientId=${clientId}`
    }
    const response = await api.get(queryString);
    return PaginatedBookingsSchema.parse(response.data);
  },

  async update({ id, payload, }: { id: string; payload: unknown; }) {
    const validPayload = UpdateBookingSchema.parse(payload);
    const { data } = await api.put(`/bookings/${id}`, validPayload);
    return data;
  },

  async complete(id: string) {
    const { data } = await api.put(`/bookings/${id}/complete`, {});
    return data;
  },

  async cancel(id: string) {
    const { data } = await api.put(`/bookings/${id}/cancel`, {});
    return data;
  },

  async getOneBooking(id: string) {
    const response = await api.get(`/bookings/${id}`);
    return BookingSchema.parse(response.data)
  },

  async delete(id: string) {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },

}
