"use client";

import { GiHamburgerMenu } from "react-icons/gi";
import AdminNavs from "@/components/admin/AdminNavs";
import { useState } from "react";

const AdminHeader = () => {
  const [showNavs, setShowNavs] = useState<boolean>(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-fit">
      <div
        className="w-full inset-0 bg-gradient-to-r from-stone-900/90 to-stone-950/90 p-4 flex items-center select-none">
        <button
          className="p-2 hover:bg-stone-700 active:bg-stone-800 rounded-md hover:cursor-pointer"
          onClick={ () => setShowNavs(!showNavs) }
        >
          <GiHamburgerMenu className="css-header-text" />
        </button>
        <h1 className="text-white w-full font-bold font-sans text-lg text-center">
          ADMIN SERVICES
        </h1>
      </div>
      <div className="relative">{ showNavs && <AdminNavs /> }</div>
    </header>
  );
};

export default AdminHeader;
