"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UserInfoCard from "@/components/shared/UserInfoCard";
import { useUser } from "@/hooks/useUser";
import { useTransactionInfo } from "@/hooks/useTransactionInfo";

const WithdrawComponent = () => {
  const router = useRouter();
  
  const {refetch: refetchUser} = useUser();
  const {refetch: refetchTransaction} =
    useTransactionInfo();
  
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  const handleWithdraw = async (): Promise<void> => {
    if (!amount || amount <= 0) {
      alert("Enter a valid amount");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({amount}),
      });
      
      const data: { success: boolean; message: string } = await res.json();
      setStatus({success: data.success, message: data.message});
      
      if (!res.ok) throw new Error(data.message || "Withdraw failed");
      
      await refetchUser();
      await refetchTransaction();
      
      setAmount("");
      console.log("Withdraw response:", data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error withdrawing:", err.message);
        setStatus({success: false, message: err.message || "Error"});
      } else {
        console.error("Error withdrawing:", err);
        setStatus({success: false, message: "Error Withdrawing"});
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleExit = (): void => {
    setAmount("");
    router.replace("/");
  };
  
  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen">
      <div>
        <UserInfoCard />
      </div>
      <div
        className="flex flex-col justify-center items-center bg-stone-900 shadow-md shadow-stone-950 p-8 rounded-md gap-4 w-100">
        <h2 className="css-header-text font-bold text-stone-300">WITHDRAW</h2>
        <input
          className="css-login-input"
          placeholder="Enter amount to withdraw"
          type="number"
          value={ amount }
          onChange={ (e) =>
            setAmount(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
        <div className="flex gap-4 pt-2">
          <button
            className={ clsx(
              loading ? "css-submit-button-disabled" : "css-submit-button",
            ) }
            onClick={ handleWithdraw }
            disabled={ loading }
          >
            { loading ? "Processing..." : "CONFIRM" }
          </button>
          
          <button
            className={ clsx(
              loading ? "css-submit-button-disabled" : "css-submit-button",
            ) }
            disabled={ loading }
            onClick={ handleExit }
          >
            EXIT
          </button>
        </div>
      </div>
      { status?.success ? (
        <div
          className="py-1 m-2 w-full rounded-md max-w-100 flex justify-center bg-gradient-to-l from-green-700 to-green-900 text-stone-100 text-xs">
          { status.message }
        </div>
      ) : status?.message && (
        <div
          className="py-1 m-2 w-full rounded-md max-w-100 flex justify-center bg-gradient-to-l from-red-700 to-red-900 text-stone-100 text-xs">
          { status.message }
        </div>
      ) }
    </main>
  );
};

export default WithdrawComponent;
