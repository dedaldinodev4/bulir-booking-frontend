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
  }).optional(),
  status: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});


export const CreateServiceSchema = z.object({
  name: z.string().min(3, 'Preenchimento de pelo menos 3 caracteres.'),
  price: z.string().min(3, 'Preço minímo é de 500KZ.'),
  providerId: z.string().optional(),
  description: z.string().optional()
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
export type UpdateServiceDTO = z.infer<typeof UpdateServiceSchema>

