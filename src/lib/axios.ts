import axios from "axios";
import { getSession } from "next-auth/react";
import { env } from "../env";

const api = axios.create({
  baseURL: `${env.API_BOOKING}`,
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user?.accessToken) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }
  return config;
});

export default api;
