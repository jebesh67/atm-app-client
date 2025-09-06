"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminUser } from "@/types/UserTypes";


type LoginResponse = {
  error?: string;
  user?: AdminUser;
};

export function useAdminLogin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
      });
      
      const data: LoginResponse = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      
      return data;
    },
    onSuccess: (data) => {
      if (data.user) {
        queryClient.setQueryData(["atm-client-admin"], data.user);
      }
    },
  });
}
