import { useQuery } from "@tanstack/react-query";
import { servicesService } from "@/services/services.service";

export function useServiceProvider(providerId: string) {
  return useQuery({
    queryKey: ["service", providerId],
    queryFn: () => servicesService.getServiceByProvider(providerId),
  });
}
