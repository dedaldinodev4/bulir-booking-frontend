import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "@/services/users.service";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersService.update,

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["users", id],
      });
    },
  });
}
