import { useQuery } from "@tanstack/react-query";
import { servicesService } from "@/services/services.service";

export function useService(id: string) {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => servicesService.getOneService(id),
  });
}
