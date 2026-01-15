import { useMutation, useQueryClient } from "@tanstack/react-query";
import { servicesService } from "@/services/services.service";

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: servicesService.delete,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });

      queryClient.invalidateQueries({
        queryKey: ["services", id],
      });
    },
  });
}
