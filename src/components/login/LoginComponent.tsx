"use client";

import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

const LoginComponent = () => {
  const login = useLogin();
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    
    login.mutate(
      {
        accountNumber: form.get("accountNumber") as string,
        atmPin: form.get("atmPin") as string,
      },
      {
        onSuccess: () => {
          router.replace("/");
        },
      },
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <form
        onSubmit={ handleSubmit }
        className="bg-stone-900 shadow-md shadow-stone-950 p-6 rounded-md flex flex-col gap-4 w-100 place-items-center"
      >
        <h1 className="css-header-text font-bold">LOGIN</h1>
        <label htmlFor="account-number-input">
          <h1 className="font-semibold pb-1">Account Number</h1>
          <input
            id="account-number-input"
            className="css-login-input"
            name="accountNumber"
            type="text"
            placeholder="Enter your Account Number"
            required
          />
        </label>
        
        <label htmlFor="atm-pin-input">
          <h1 className="font-semibold pb-1">ATM PIN</h1>
          <input
            id="atm-pin-input"
            className="css-login-input"
            name="atmPin"
            type="password"
            placeholder="Enter your ATM PIN"
            required
          />
        </label>
        
        <button
          className="css-submit-button place-self-center mt-2"
          type="submit"
          disabled={ login.isPending }
        >
          { login.isPending ? "Logging in..." : "SUBMIT" }
        </button>
        
        { login.error && (
          <p className="text-red-500 text-sm text-center mt-2">
            { (login.error as Error).message }
          </p>
        ) }
      </form>
    </div>
  );
};

export default LoginComponent;
