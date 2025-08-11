import type { User } from "@/@types/user";
import { api } from "../axios";

export const postAuthRegister = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}): Promise<{ access_token: string; user: User }> => {
  const response = await api.post<{ access_token: string; user: User }>(
    `/auth/register`,
    {
      email,
      name,
      password,
    }
  );

  return response.data;
};
