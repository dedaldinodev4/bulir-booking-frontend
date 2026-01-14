import { useQuery } from "@tanstack/react-query";
import { servicesService } from "../services/services.service";

export function useServices(page: number, limit: number) {
  return useQuery({
    queryKey: ["services", page, limit],
    queryFn: () => servicesService.getServices({ page, limit }),
  });
}
