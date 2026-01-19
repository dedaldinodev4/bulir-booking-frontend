import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingsService } from "@/services/bookings.service";

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingsService.cancel,

    onSuccess: (_, id ) => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      queryClient.invalidateQueries({
        queryKey: ["bookings", id],
      });
    },
  });
}
