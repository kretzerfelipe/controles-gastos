import type { User } from "@/@types/user";
import { api } from "../axios";

export const putAuthMe = async ({
  id,
  name,
  email,
}: {
  id: 1;
  name: "Felipe";
  email: "felipegk2006@gmail.com";
}): Promise<User> => {
  const response = await api.put<{ user: User }>(`/auth/me`, {
    id,
    name,
    email,
  });

  return response.data.user;
};
