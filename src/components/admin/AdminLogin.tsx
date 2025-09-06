"use client";

import { useAdminLogin } from "@/hooks/useAdminLogin";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const login = useAdminLogin();
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    
    login.mutate(
      {
        username: form.get("username") as string,
        password: form.get("password") as string,
      },
      {
        onSuccess: () => {
          router.replace("/admin");
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
        <h1 className="css-header-text font-bold">ADMIN LOGIN</h1>
        <label htmlFor="account-number-input">
          <h1 className="font-semibold pb-1">Username</h1>
          <input
            id="account-number-input"
            className="css-login-input"
            name="username"
            type="text"
            placeholder="Enter your username"
            required
          />
        </label>
        
        <label htmlFor="atm-pin-input">
          <h1 className="font-semibold pb-1">Password</h1>
          <input
            id="atm-pin-input"
            className="css-login-input"
            name="password"
            type="password"
            placeholder="Enter password"
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

export default AdminLogin;
