import { useMutation, useQueryClient } from "@tanstack/react-query";
import { walletsService } from "@/services/wallets.service";

export function useUpdateWallet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: walletsService.update,

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["wallets"],
      });

      queryClient.invalidateQueries({
        queryKey: ["wallets", id],
      });
    },
  });
}
