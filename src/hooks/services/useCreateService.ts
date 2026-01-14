import { useMutation, useQueryClient } from "@tanstack/react-query";
import { servicesService } from "@/services/services.service";

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: servicesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },
  });
}