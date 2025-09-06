"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminUser } from "@/types/UserTypes";

type AdminResponse = {
  error?: string;
  user?: AdminUser;
};

export function useUser() {
  const queryClient = useQueryClient();
  
  return useQuery<AdminUser | null>({
    queryKey: ["atm-client-admin"],
    queryFn: async () => {
      const res = await fetch("/api/admin/me", {credentials: "include"});
      const data: AdminResponse = await res.json();
      
      if (!res.ok || !data.user) return null;
      
      queryClient.setQueryData(["atm-client-admin"], data.user);
      return data.user;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
