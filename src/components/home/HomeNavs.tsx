"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Navs = {
  name: string;
  path: string;
};

const navs: Navs[] = [
  {
    name: "Withdraw",
    path: "/withdraw",
  },
  {
    name: "Deposit",
    path: "/deposit",
  },
  {
    name: "Balance",
    path: "/balance",
  },
];

const HomeNavs = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const handleExit = async () => {
    try {
      await fetch("/api/exit", {method: "POST"});
      
      queryClient.clear();
      
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  
  const handleNavigation = (pathName: string) => {
    router.replace(pathName);
  };
  
  return (
    <div className="w-full grid grid-cols-2 gap-2 px-4">
      { navs.map((nav, idx) => (
        <div className="col-span-1"
             key={ idx }>
          <button
            onClick={ () => handleNavigation(nav.path) }
            className="css-transition bg-gradient-to-r from-sky-800/90 to-sky-400/90 hover:from-sky-400/90 hover:to-sky-800/90 text-white w-full py-9 md:py-12 font-bold rounded-lg hover:shadow-md shadow-sky-950 hover:cursor-pointer hover:scale-102 css-navs-text"
          >
            { nav.name }
          </button>
        </div>
      )) }
      
      <button
        className="css-transition bg-gradient-to-r from-red-800/90 to-red-400/90 hover:from-red-400/90 hover:to-red-800/90 text-white w-full py-9 md:py-12 font-bold rounded-lg hover:shadow-md shadow-red-950 hover:cursor-pointer hover:scale-102 css-navs-text"
        onClick={ handleExit }
      >
        Exit
      </button>
    </div>
  );
};

export default HomeNavs;
