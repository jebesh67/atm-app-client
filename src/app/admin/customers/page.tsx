import AdminHeader from "@/components/admin/AdminHeader";
import CustomerComponent from "@/components/admin/customers/CustomerComponent";
import React from "react";

const customersPage = () => {
  return (
    <>
      <AdminHeader />
      <div className="pt-15 lg:pt-16">
        <CustomerComponent />
      </div>
    </>
  );
};

export default customersPage;
