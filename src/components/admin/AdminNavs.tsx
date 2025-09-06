"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { RiLogoutBoxLine } from "react-icons/ri";

const AdminNavs = () => {
  const queryClient = useQueryClient();
  
  const router = useRouter();
  const pathName = usePathname();
  
  const handleClick = (route: string) => {
    router.replace(route);
  };
  
  const handleExit = async () => {
    try {
      await fetch("/api/admin/exit", {method: "POST"});
      
      queryClient.clear();
      
      router.replace("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  
  return (
    <nav className="absolute flex flex-col w-fit gap-4 p-4 bg-gradient-to-br from-stone-900/90 to-stone-950/90">
      <button
        onClick={ () => handleClick("/admin") }
        className={ clsx(
          "css-admin-navs",
          pathName === "/admin" ? "text-blue-500" : "",
        ) }
      >
        HOME
      </button>
      <button
        onClick={ () => handleClick("/admin/customers") }
        className={ clsx(
          "css-admin-navs",
          pathName.startsWith("/admin/customers") ? "text-blue-500" : "",
        ) }
      >
        CUSTOMERS
      </button>
      <button
        onClick={ () => handleClick("/admin/deposits") }
        className={ clsx(
          "css-admin-navs",
          pathName.startsWith("/admin/deposits") ? "text-blue-500" : "",
        ) }
      >
        DEPOSITS
      </button>
      <button
        onClick={ () => handleClick("/admin/withdrawals") }
        className={ clsx(
          "css-admin-navs",
          pathName.startsWith("/admin/withdrawals") ? "text-blue-500" : "",
        ) }
      >
        WITHDRAWALS
      </button>
      <button
        onClick={ handleExit }
        className="flex justify-center items-center gap-2 font-bold bg-stone-600 css-admin-navs rounded-md"
      >
        <RiLogoutBoxLine />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default AdminNavs;
