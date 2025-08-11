import { getAuthMe } from "@/api/auth/get-auth-me";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const query = useQuery({
    queryKey: ["auth"],
    queryFn: () => getAuthMe(),
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false, // Não faz refetch ao focar aba
    refetchOnReconnect: false, // Não faz refetch ao reconectar
    retry: 0,
  });

  return {
    user: query.data,
    query,
  };
};
