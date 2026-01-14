import api from "@/lib/axios";
import {
  PaginatedServicesSchema,
} from "@/schemas/service";

type QueryPagination = {
  page: number; 
  limit: number;
}

export const servicesService = { 

  async getServices({ page, limit,}: QueryPagination) {
    const response = await api.get(`/services?page=${page}&limit=${limit}&orderBy=name&order=asc`);
    return PaginatedServicesSchema.parse(response.data);
    
  }

}
