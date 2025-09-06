"use client";

import { useUser } from "@/hooks/useUser";

const UserInfoCard = () => {
  const {data: user, isLoading} = useUser();
  
  return (
    <main className="text-white p-4 w-full">
      <div className="min-w-60 w-fit bg-gradient-to-r from-stone-800/40 to-stone-500/70 p-4 rounded-lg shadow-sm shadow-stone-800">
        <div className="flex">
          <p className="font-semibold text-stone-700">Name : &nbsp;</p>
          <p className="italic text-stone-100">
            { isLoading ? "Loading..." : `${ user?.name }` }
          </p>
        </div>
        <div className="flex">
          <p className="font-semibold text-stone-700">
            Account Number : &nbsp;
          </p>
          <p className="italic text-stone-100">
            { isLoading ? "Loading..." : `${ user?.accountNumber }` }
          </p>
        </div>
      </div>
    </main>
  );
};

export default UserInfoCard;
