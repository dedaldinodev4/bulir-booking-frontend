import api  from "@/lib/axios";
import { 
  CreateWalletSchema, 
  UpdateWalletSchema 
} from "@/schemas/wallet";

export const walletsService = {
  
  async create(payload: unknown) {
    const validPayload = CreateWalletSchema.parse(payload);
    const { data } = await api.post("/wallets", validPayload);
    return data;
  },

  async update({id, payload, }: { id: string; payload: unknown;}) {
    const validPayload = UpdateWalletSchema.parse(payload);

    const { data } = await api.put(`/wallets/${id}`, validPayload);
    return data;
  },
};
