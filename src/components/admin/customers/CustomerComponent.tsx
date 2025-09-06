"use client";

import CustomerData from "@/components/admin/customers/CustomerData";
import CustomerNavs from "@/components/admin/customers/CustomerNavs";
import CreateUser from "@/components/admin/customers/CreateUser";
import { useState } from "react";

const CustomerComponent = () => {
  const [showCreateUser, setShowCreateUser] = useState<boolean>(false);
  return (
    <>
      <CreateUser
        showCreateUser={ showCreateUser }
        setShowCreateUser={ setShowCreateUser }
      />
      <CustomerNavs
        setShowCreateUser={ setShowCreateUser }
      />
      <CustomerData />
    </>
  );
};

export default CustomerComponent;
