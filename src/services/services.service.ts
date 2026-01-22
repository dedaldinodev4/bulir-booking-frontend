import api from "@/lib/axios";
import {
  PaginatedServicesSchema,
  CreateServiceSchema,
  UpdateServiceSchema,
  ServiceSchema,
  ServiceArraySchema
} from "@/schemas/service";
import { z } from "zod";

type QueryPagination = {
  page: number; 
  limit: number;
}

export const servicesService = { 

  async create(payload: unknown) {

    try {
      const validPayload = CreateServiceSchema.parse(payload);
      const { data } = await api.post("/services", validPayload);
      return data;
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log("Erro de validação:");
        console.log(error);
      }
    }
  },

  async getServices({ page, limit,}: QueryPagination) {
    const response = await api.get(`/services?page=${page}&limit=${limit}&orderBy=name&order=asc`);
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

  async getServiceByProvider(providerId: string ) {
    const response = await api.get(`/services/byProvider/${providerId}`);
    return ServiceArraySchema.parse(response.data)
  },

  async delete(id: string ) {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },

}
