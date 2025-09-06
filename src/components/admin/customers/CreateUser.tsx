"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useCustomerData } from "@/hooks/useCustomerData";

type CreateUserProps = {
  showCreateUser: boolean;
  setShowCreateUser: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateUser = ({showCreateUser, setShowCreateUser}: CreateUserProps) => {
  const {refetch} = useCustomerData();
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  type ApiResponse = {
    success: boolean;
    message?: string;
    error?: string;
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    
    const form = new FormData(e.currentTarget);
    const name = (form.get("name") as string)?.trim();
    const accountNumber = (form.get("newAccountNumber") as string)?.trim();
    const atmPin = (form.get("newAtmPin") as string)?.trim();
    
    try {
      const res = await axios.post<ApiResponse>("/api/admin/createUser", {
        name,
        accountNumber,
        atmPin,
      });
      
      if (res.data.success) {
        setSuccessMsg(res.data.message || "User created successfully");
        setErrorMsg(null);
        await refetch();
        e.currentTarget.reset();
      } else {
        setErrorMsg(
          res.data.error || res.data.message || "User creation failed",
        );
        setSuccessMsg(null);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<ApiResponse>;
        setErrorMsg(
          axiosErr.response?.data?.error ||
          axiosErr.response?.data?.message ||
          axiosErr.message ||
          "Something went wrong",
        );
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    showCreateUser && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 flex justify-center items-center flex-col">
        <form
          onSubmit={ handleSubmit }
          className="bg-stone-900 shadow-md shadow-stone-950 p-6 rounded-md flex flex-col gap-4 w-[320px] sm:w-[400px]"
        >
          <h1 className="css-header-text font-bold text-center">CREATE USER</h1>
          
          <div className="flex flex-col justify-center items-center gap-4">
            <label className="flex flex-col"
                   htmlFor="name-input">
              <span className="font-semibold">Name</span>
              <input
                id="name-input"
                className="css-login-input w-full mt-1"
                name="name"
                type="text"
                placeholder="Customer's Name"
                required
              />
            </label>
            
            <label className="flex flex-col"
                   htmlFor="account-number-input">
              <span className="font-semibold">Account Number</span>
              <input
                id="account-number-input"
                className="css-login-input w-full mt-1"
                name="newAccountNumber"
                type="text"
                placeholder="Customer's Account Number"
                required
              />
            </label>
            
            <label className="flex flex-col"
                   htmlFor="atm-pin-input">
              <span className="font-semibold">ATM PIN</span>
              <input
                id="atm-pin-input"
                className="css-login-input w-full mt-1"
                name="newAtmPin"
                type="password"
                placeholder="Customer's ATM PIN"
                required
              />
            </label>
          </div>
          
          <div className="flex gap-4 justify-center mt-2">
            <button
              className="css-submit-button"
              type="submit"
              disabled={ loading }
            >
              { loading ? "Creating..." : "CREATE" }
            </button>
            <button
              type="button"
              className="css-exit-button"
              onClick={ () => setShowCreateUser(false) }
            >
              EXIT
            </button>
          </div>
        </form>
        
        <div>
          { successMsg && (
            <p className="text-xs text-center mt-2 bg-gradient-to-r from-green-500 to-green-800 px-4 py-1 rounded-md">
              { successMsg }
            </p>
          ) }
          { errorMsg && (
            <p className="text-xs text-center mt-2 bg-gradient-to-r from-red-500 to-red-800 px-4 py-1 rounded-md">
              { errorMsg }
            </p>
          ) }
        </div>
      </div>
    )
  );
};

export default CreateUser;
