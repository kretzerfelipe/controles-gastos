import { api } from "../axios";
import type { Category } from "@/@types/category";

export const updateCategory = async ({
  id,
  name,
  color,
  icon,
}: {
  id: number;
  name: string;
  color: string;
  icon: string;
}): Promise<Category> => {
  const response = await api.put<{ category: Category }>(`/category/${id}`, {
    name,
    color,
    icon,
  });

  return response.data.category;
};
