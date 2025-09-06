"use client";

import { useTransactionInfo } from "@/hooks/useTransactionInfo";
import clsx from "clsx";
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

type Transaction = {
  _id: string;
  accountNumber: string;
  type: "withdrawal" | "deposit";
  amount: number;
  balanceAfter: number;
  date: string;
  status: "completed" | "pending" | "failed";
};

const TransactionTable = () => {
  const {data: transaction, isLoading} = useTransactionInfo();
  const [showTable, setShowTable] = useState<"withdrawal" | "deposit">(
    "deposit",
  );
  
  const filteredTransactions: Transaction[] =
    (transaction && transaction.filter((tx) => tx.type === showTable)) || [];
  
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-4 pb-4">
        <button
          onClick={ () => setShowTable("deposit") }
          className={ clsx(
            "px-3 py-1 rounded-md css-transition hover:cursor-pointer font-semibold",
            showTable === "deposit"
              ? "bg-blue-700 text-white ring-2 ring-blue-400"
              : "bg-blue-500 text-white/80 hover:scale-102",
          ) }
        >
          Show Deposits
        </button>
        <button
          onClick={ () => setShowTable("withdrawal") }
          className={ clsx(
            "px-3 py-1 rounded-md css-transition hover:cursor-pointer font-semibold",
            showTable === "withdrawal"
              ? "bg-blue-700 text-white ring-2 ring-blue-400"
              : "bg-blue-500 text-white/80 hover:scale-102",
          ) }
        >
          Show Withdrawals
        </button>
      </div>
      
      <div
        className="w-full h-full max-h-90 sm:max-h-85 lg:max-h-80 place-self-center overflow-x-auto rounded-md border border-gray-300 scroll-table">
        <div className="w-full">
          { isLoading ? (
            <div className="flex justify-center items-center py-10 px-10">
              <BeatLoader color="#006fff" />
            </div>
          ) : (
            <table className="w-full divide-y divide-gray-300  scroll-table">
              <thead className="bg-gray-100">
                <tr className="divide-x divide-gray-300">
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Date & Time
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Account
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    { showTable === "deposit" ? "Deposit" : "Withdrawal" }
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Balance After
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                { filteredTransactions.map((tx) => (
                  <tr
                    key={ tx._id }
                    className="hover:bg-gray-50 divide-x divide-gray-300"
                  >
                    <td className="px-4 py-2 text-sm text-gray-600">
                      { new Date(tx.date).toLocaleString() }
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      { tx.accountNumber }
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      ${ tx.amount }
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      ${ tx.balanceAfter }
                    </td>
                    <td>
                      <p
                        className={ clsx(
                          "p-2 text-sm font-medium",
                          tx.status === "completed"
                            ? "text-green-600"
                            : tx.status === "pending"
                              ? "text-yellow-600"
                              : "text-red-600",
                        ) }
                      >
                        { tx.status }
                      </p>
                      <p className="px-2 text-blue-800">{ tx._id }</p>
                    </td>
                  </tr>
                )) }
                { filteredTransactions.length === 0 && (
                  <tr>
                    <td
                      colSpan={ 6 }
                      className="px-4 py-3 text-center text-gray-500 text-sm"
                    >
                      No { showTable } transactions found
                    </td>
                  </tr>
                ) }
              </tbody>
            </table>
          ) }
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
