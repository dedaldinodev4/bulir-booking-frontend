import { useQuery } from "@tanstack/react-query";
import api from '@/lib/axios';


export const useUserWallet = (userId: string) => {
  return useQuery({
    queryKey: ['wallet', userId],
    queryFn: async () => {
      const { data } = await api.get(`/wallets/byUser/${userId}`)
      return data;
    }
  })
}