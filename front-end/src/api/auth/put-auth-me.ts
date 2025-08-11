import type { User } from "@/@types/user";
import { api } from "../axios";

export const putAuthMe = async ({
  id,
  name,
  email,
}: {
  id: number;
  name: string;
  email: string;
}): Promise<User> => {
  const response = await api.put<{ user: User }>(`/auth/me`, {
    id,
    name,
    email,
  });

  return response.data.user;
};
