"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@/types/transactionTypes";

type MeResponse = {
  message: string;
  transactions?: Transaction[];
};

export function useAllTransactions() {
  const queryClient = useQueryClient();
  
  return useQuery<Transaction[] | null>({
    queryKey: ["atm-all-transactions"],
    queryFn: async () => {
      const res = await fetch("/api/admin/allTransactions", {credentials: "include"});
      const data: MeResponse = await res.json();
      
      if (!res.ok || !data.transactions) return null;
      
      queryClient.setQueryData(["atm-all-transactions"], data.transactions);
      return data.transactions;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
