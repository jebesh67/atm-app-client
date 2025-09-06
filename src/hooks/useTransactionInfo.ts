"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@/types/transactionTypes";

type MeResponse = {
  message: string;
  transactions?: Transaction[];
};

export function useTransactionInfo() {
  const queryClient = useQueryClient();
  
  return useQuery<Transaction[] | null>({
    queryKey: ["atm-client-transaction"],
    queryFn: async () => {
      const res = await fetch("/api/transaction", {credentials: "include"});
      const data: MeResponse = await res.json();
      
      if (!res.ok || !data.transactions) return null;
      
      queryClient.setQueryData(["atm-client-transaction"], data.transactions);
      return data.transactions;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
