import { api } from "../axios";
import type { Category } from "@/@types/category";

export const readCategory = async ({
  type,
}: {
  type: "income" | "expense" | "all";
}): Promise<Category[]> => {
  const response = await api.get<{ categories: Category[] }>(
    `/category/${type}`
  );

  return response.data.categories;
};
