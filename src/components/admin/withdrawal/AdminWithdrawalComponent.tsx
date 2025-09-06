"use client";

import { useAllTransactions } from "@/hooks/useAllTransactions";
import { BeatLoader } from "react-spinners";
import dayjs from "dayjs";
import { Transaction } from "@/types/transactionTypes";

const AdminWithdrawalComponent = () => {
  const {data: transactions, isLoading, isError} = useAllTransactions();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center border border-gray-300 py-10 px-20 rounded-md">
        <BeatLoader color="#006fff" />
      </div>
    );
  }
  
  if (isError) return (
    <div className="flex justify-center items-center border border-gray-300 py-10 px-20 rounded-md text-red-700">
      Failed to load Withdrawals
    </div>
  );
  
  if (!transactions || transactions.length === 0) return (
    <div
      className="flex justify-center items-center border border-gray-300 py-10 px-20 rounded-md text-red-700">
      No withdrawals found
    </div>
  );
  
  const withdrawals: Transaction[] = transactions.filter((tx: Transaction): boolean => tx.type === "withdrawal");
  
  if (withdrawals.length === 0) return (
    <div
      className="flex justify-center items-center border border-gray-300 py-10 px-20 rounded-md text-red-700">
      No withdrawals found
    </div>
  );
  
  return (
    <div className="w-full max-w-[800px] place-self-center">
      <h1 className="text-center text-stone-900 css-header-text font-bold p-2">
        WITHDRAWALS
      </h1>
      
      <div
        className="w-full max-w-200 h-full max-h-[600px] overflow-x-auto rounded-md border border-gray-300 scroll-table">
        <div className="w-full">
          <table className="w-full divide-y divide-gray-300">
            <thead className="bg-gray-100">
              <tr className="divide-x divide-gray-300">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Sl. No
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Account
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                withdrawals.map((tx: Transaction, idx) => (
                  <tr
                    key={ tx.accountNumber + idx + tx.date }
                    className="hover:bg-gray-50 divide-x divide-gray-300"
                  >
                    <td className="px-4 py-2 text-sm text-gray-600">{ idx + 1 }</td>
                    <td className="px-4 py-2 text-sm text-blue-600">&#8377;{ tx.amount }</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{ tx.accountNumber }</td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      { dayjs(tx.date).format("DD MMM YYYY") }
                    </td>
                    <td className="px-4 py-2 text-sm text-green-500">{ tx.status }</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminWithdrawalComponent;