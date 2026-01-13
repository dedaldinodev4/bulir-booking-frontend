import { useQuery } from "@tanstack/react-query";
import api from '@/lib/axios';


export const useServiceProvider = (providerId: string) => {
  return useQuery({
    queryKey: ['services', providerId],
    queryFn: async () => {
      const { data } = await api.get(`/services/byProvider/${providerId}`)
      return data;
    }
  })
}