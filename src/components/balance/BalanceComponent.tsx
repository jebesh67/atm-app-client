"use client";

import UserInfoCard from "@/components/shared/UserInfoCard";
import BalanceInfo from "@/components/balance/BalanceInfo";
import TransactionTable from "@/components/balance/TransactionTable";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const BalanceComponent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const handleRoute = async (path: "/" | "/login") => {
    if (path === "/login") {
      try {
        await fetch("/api/exit", {method: "POST"});
        
        queryClient.clear();
        
        router.replace("/login");
      } catch (err) {
        console.error("Logout failed:", err);
      }
    }
    
    router.replace(path);
  };
  return (
    <div className="pt-15 lg:pt-16">
      <div className="flex place-self-center">
        <div className="flex flex-col justify-center items-center gap-2">
          <UserInfoCard />
          <button
            onClick={ () => handleRoute("/") }
            className="css-button-bal css-transition"
          >
            Go Home
          </button>
          <button
            onClick={ () => handleRoute("/login") }
            className="css-button-bal css-transition"
          >
            Logout
          </button>
        </div>
        <div className="pt-4 pr-4 max-w-100">
          <BalanceInfo />
        </div>
      </div>
      
      <div>
        <TransactionTable />
      </div>
    </div>
  );
};

export default BalanceComponent;
