import api  from "@/lib/axios";
import { UpdateUserSchema } from "@/schemas/user";

export const usersService = {
 
  async update({id, payload, }: { id: string; payload: unknown;}) {
    const validPayload = UpdateUserSchema.parse(payload);

    const { data } = await api.put(`/users/${id}`, validPayload);
    return data;
  },
};
