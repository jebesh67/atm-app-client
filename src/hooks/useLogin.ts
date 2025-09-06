"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/UserTypes";

type LoginResponse = {
  error?: string;
  user?: User;
};

export function useLogin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({
      accountNumber,
      atmPin,
    }: {
      accountNumber: string;
      atmPin: string;
    }) => {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({accountNumber, atmPin}),
      });
      
      const data: LoginResponse = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      
      return data;
    },
    onSuccess: (data) => {
      if (data.user) {
        queryClient.setQueryData(["atm-client-user"], data.user);
      }
    },
  });
}
