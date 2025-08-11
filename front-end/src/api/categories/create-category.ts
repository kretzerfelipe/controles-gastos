import type { User } from "@/@types/user";
import { api } from "../axios";

export const createCategory = async ({
  name,
  color,
  icon,
  type,
}: {
  name: string;
  color: string;
  icon: string;
  type: "income" | "expense";
}): Promise<User> => {
  const response = await api.put<{ user: User }>(`/category`, {
    name,
    color,
    icon,
    type,
  });

  return response.data.user;
};
