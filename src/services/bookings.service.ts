import api from "@/lib/axios";
import {
  PaginatedServicesSchema,
  CreateServiceSchema,
  UpdateServiceSchema,
  ServiceSchema
} from "@/schemas/service";
import { z } from "zod";

type QueryPagination = {
  page: number; 
  limit: number;
}

export const metricsService = { 



  async getMetrics() {
    const response = await api.get(`/metrics`);
    return PaginatedServicesSchema.parse(response.data);
  },

  async update({id, payload, }: { id: string; payload: unknown;}) {
    const validPayload = UpdateServiceSchema.parse(payload);
    const { data } = await api.put(`/services/${id}`, validPayload);
    return data;
  },

  async getOneService(id: string ) {
    const response = await api.get(`/services/${id}`);
    return ServiceSchema.parse(response.data)
  },

  async delete(id: string ) {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },

}
