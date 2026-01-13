import { useMutation, useQueryClient } from "@tanstack/react-query";
import { walletsService } from "@/services/wallets.service";

export function useCreateWallet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: walletsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallets"],
      });
    },
  });
}