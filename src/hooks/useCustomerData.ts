"use client";

import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/UserTypes";

type AdminResponse = {
  error?: string;
  users?: User[];
};

export function useCustomerData() {
  return useQuery<User[]>({
    queryKey: ["atm-customers-admin"],
    queryFn: async () => {
      const res = await fetch("/api/admin/customers", {
        credentials: "include",
      });
      
      if (!res.ok) {
        throw new Error("Failed to fetch customers");
      }
      
      const data: AdminResponse = await res.json();
      
      if (!data.users) {
        throw new Error(data.error ?? "No users found");
      }
      
      return data.users;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
