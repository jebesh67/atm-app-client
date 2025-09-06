"use client";

import { useCustomerData } from "@/hooks/useCustomerData";
import dayjs from "dayjs";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import UserCard from "./UserCard";
import { User } from "@/types/UserTypes";

const CustomerData = () => {
  const {data: users, isLoading} = useCustomerData();
  
  const [showUserCard, setShowUserCard] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const handleClick = (user: User) => {
    setSelectedUser(user);
    setShowUserCard(true);
  };
  
  const handleExit = () => {
    setSelectedUser(null);
    setShowUserCard(false);
  };
  
  return (
    <>
      { showUserCard && (
        <UserCard handleExit={ handleExit }
                  user={ selectedUser } />
      ) }
      <h1 className="text-center text-stone-900 css-header-text font-bold p-4">
        USERS
      </h1>
      <div
        className="w-full max-w-200 h-full max-h-90 sm:max-h-85 lg:max-h-80 place-self-center scroll-table overflow-x-auto rounded-md border border-gray-300 scroll-table">
        <div className="w-full">
          { isLoading ? (
            <div className="flex justify-center items-center py-10 px-10">
              <BeatLoader color="#006fff" />
            </div>
          ) : (
            users && (
              <table className="w-full divide-y divide-gray-300">
                <thead className="bg-gray-100">
                  <tr className="divide-x divide-gray-300">
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Sl. No
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Account Number
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Created At
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  { users.map((user, idx) => (
                    <tr
                      key={ user._id }
                      onClick={ () => handleClick(user) }
                      className="hover:bg-gray-50 divide-x divide-gray-300"
                    >
                      <td className="px-4 py-2 text-sm text-gray-600">
                        { idx + 1 }
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        { user.accountNumber }
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        { user.name }
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        { dayjs(user.createdAt).format("DD MMM YYYY") }
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        { user.balance }
                      </td>
                    </tr>
                  )) }
                  { users.length === 0 && (
                    <tr>
                      <td
                        colSpan={ 3 }
                        className="px-4 py-3 text-center text-gray-500 text-sm"
                      >
                        No customers found
                      </td>
                    </tr>
                  ) }
                </tbody>
              </table>
            )
          ) }
        </div>
      </div>
    </>
  );
};

export default CustomerData;
