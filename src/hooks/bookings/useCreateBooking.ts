import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingsService } from "@/services/bookings.service";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
}