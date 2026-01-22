import api from "@/lib/axios";
import { ResultMetrics } from "@/schemas/metrics";

export const metricsService = { 

  async getMetrics() {
    const response = await api.get(`/metrics`);
    return ResultMetrics.parse(response.data);
  },

  async globalMetrics() {
    const response = await api.get(`/metrics/generals`);
    return ResultMetrics.parse(response.data);
  },

}
