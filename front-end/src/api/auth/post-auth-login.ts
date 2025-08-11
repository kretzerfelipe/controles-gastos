import type { User } from "@/@types/user";
import { api } from "../axios";

export const postAuthLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ access_token: string; user: User }> => {
  const response = await api.post<{ access_token: string; user: User }>(
    `/auth/login`,
    {
      email,
      password,
    }
  );

  return response.data;
};
