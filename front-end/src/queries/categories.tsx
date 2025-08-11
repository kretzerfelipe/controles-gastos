import { readCategory } from "@/api/categories/read-category";
import { useQuery } from "@tanstack/react-query";

export const useCategory = (type: "income" | "expense" | "all") => {
  const query = useQuery({
    queryKey: ["category", type],
    queryFn: () => readCategory({ type }),
    staleTime: 1000 * 60 * 2,
  });

  return {
    categories: query.data,
    query,
  };
};
