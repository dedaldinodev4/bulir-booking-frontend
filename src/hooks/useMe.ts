import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await api.get("/users/me");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
