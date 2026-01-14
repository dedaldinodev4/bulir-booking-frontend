import { useMutation, useQueryClient } from "@tanstack/react-query";
import { servicesService } from "@/services/services.service";

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: servicesService.update,

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });

      queryClient.invalidateQueries({
        queryKey: ["services", id],
      });
    },
  });
}
