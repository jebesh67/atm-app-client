"use client";

import { useTransactionInfo } from "@/hooks/useTransactionInfo";
import { useUser } from "@/hooks/useUser";
import { BarLoader } from "react-spinners";

const BalanceInfo = () => {
  const {data: user, isLoading} = useUser();
  const {data: transactions} = useTransactionInfo();
  
  const {totalWithdrawals, totalDeposits} = transactions
    ? transactions.reduce(
      (acc, t) => {
        if (t.type === "withdrawal") {
          acc.totalWithdrawals += t.amount;
        } else if (t.type === "deposit") {
          acc.totalDeposits += t.amount;
        }
        return acc;
      },
      {totalWithdrawals: 0, totalDeposits: 0},
    )
    : {totalWithdrawals: 0, totalDeposits: 0};
  
  return (
    <div
      className="bg-white w-full text-stone-700 flex flex-col gap-5 p-5 rounded-lg shadow-sm shadow-gray-300 px-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-sm sm:text-base lg:text-xl font-bold text-stone-white">
          Balance
        </h1>
        <p className="flex items-center font-bold css-header-text text-stone-500">
          { isLoading ? (
            <BarLoader className="m-2"
                       color="#3c2c24" />
          ) : (
            <span>&#8377;{ user?.balance ?? 0 }</span>
          ) }
        </p>
      </div>
      
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-sm sm:text-base lg:text-xl font-bold text-stone-white">
          Total Withdrawal
        </h1>
        <p className="font-bold css-header-text text-stone-500">
          <span>&#8377;</span>
          { totalWithdrawals }
        </p>
      </div>
      
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-sm sm:text-base lg:text-xl font-bold text-stone-white">
          Total Deposited
        </h1>
        <p className="font-bold css-header-text text-stone-500">
          <span>&#8377;</span>
          { totalDeposits }
        </p>
      </div>
    </div>
  );
};

export default BalanceInfo;
