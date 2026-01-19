import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingsService } from "@/services/bookings.service";

export function useCompleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingsService.complete,

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
