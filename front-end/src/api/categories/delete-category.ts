import { api } from "../axios";
import type { Category } from "@/@types/category";

export const deleteCategory = async ({
  id,
}: {
  id: number;
}): Promise<Category> => {
  const response = await api.delete<{ category: Category }>(`/category/${id}`);

  return response.data.category;
};
