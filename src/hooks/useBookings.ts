import { useQuery } from "@tanstack/react-query";
import { bookingsService } from "../services/bookings.service";


type useBookingParams = {
  page: number; 
  limit: number;
  clientId?: string;
  providerId?: string;
  serviceId?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
  status?: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED"
}

export function useBookings(params: useBookingParams ) {
  const {
    page, limit, clientId, providerId, serviceId, orderBy, order, status
  } = params;
  return useQuery({
    queryKey: ["transactions", { page, limit, clientId, providerId, serviceId, orderBy, order, status } ],
    queryFn: () => bookingsService.getBookings({ 
      page, 
      limit, 
      clientId, 
      providerId, 
      serviceId, 
      orderBy, 
      order, 
      status, 
    }),
  });
}
