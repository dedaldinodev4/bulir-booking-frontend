import { useQuery } from "@tanstack/react-query";
import { metricsService } from "@/services/metrics.service";

export function useGlobalMetrics() {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: () => metricsService.globalMetrics(),
  });
}
