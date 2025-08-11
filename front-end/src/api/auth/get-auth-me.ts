import type { User } from "@/@types/user";
import { api } from "../axios";

export const getAuthMe = async (): Promise<User> => {
  const response = await api.get<{ user: User }>(`/auth/me`);

  return response.data.user;
};
