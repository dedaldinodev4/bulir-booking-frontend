import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

export const useUserData = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await api.get("/users/me");
      return data;
    }
  })
}
