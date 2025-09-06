"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/UserTypes";

type MeResponse = {
  error?: string;
  user?: User;
};

export function useUser() {
  const queryClient = useQueryClient();
  
  return useQuery<User | null>({
    queryKey: ["atm-client-user"],
    queryFn: async () => {
      const res = await fetch("/api/me", {credentials: "include"});
      const data: MeResponse = await res.json();
      
      if (!res.ok || !data.user) return null;
      
      queryClient.setQueryData(["atm-client-user"], data.user);
      return data.user;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
