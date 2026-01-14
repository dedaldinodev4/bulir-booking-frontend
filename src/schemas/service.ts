import { z } from "zod";

export const ServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  description: z.string(),
  providerId: z.string(),
  provider: z.object({
    id: z.string(),
    name: z.string(),
    identify: z.string(),
    email: z.string(),
  }),
  status: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const CreateServiceSchema = z.object({
  name: z.string(),
  price: z.string(),
  description: z.string(),
})

export const PaginatedServicesSchema = z.object({
  data: z.array(ServiceSchema),
  paginator: z.object({
    currentPage: z.number().nullable(),
    pages: z.number().nullable(),
    nextPage: z.number().nullable(),
    prevPage: z.number().nullable(),
    perPage: z.number().nullable(),
    totalResults: z.number().nullable(),
    totalCurrentResults: z.number().nullable(),
    lastPage: z.number().nullable(),
  })
   
});

export const UpdateServiceSchema = CreateServiceSchema.partial();

export type Service = z.infer<typeof ServiceSchema>;
export type PaginatedServices = z.infer<typeof PaginatedServicesSchema>;
export type CreateServiceDTO = z.infer<typeof CreateServiceSchema>;
export type UpdateSrviceDTO = z.infer<typeof UpdateServiceSchema>

