"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BiSolidExit } from "react-icons/bi";
import Form from "next/form";
import axios, { AxiosResponse } from "axios";
import clsx from "clsx";
import { useCustomerData } from "@/hooks/useCustomerData";
import NoUserMessage from "@/components/admin/customers/NoUserMessage";
import { User } from "@/types/UserTypes";

type UserCardProps = {
  user: User | null;
  handleExit: () => void;
};

const UserCard = ({user, handleExit}: UserCardProps) => {
  const {refetch} = useCustomerData();
  
  const [localUser, setLocalUser] = useState<User | null>(null);
  
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deleteStats, setDeleteStats] = useState<{
    status: boolean, message: string | null
  } | null>(null);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  
  useEffect(() => {
    setLocalUser(user);
  }, [user]);
  
  if (!localUser) return <NoUserMessage type={ "noUser" }
                                        handleExit={ handleExit } />;
  
  const handleEditUser = async (formData: FormData) => {
    const name = formData.get("editedName") as string;
    const accountNumber = formData.get("editedAccountNumber") as string;
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const response = await axios.post(
        `${ process.env.NEXT_PUBLIC_BACKEND_URL }/api/admin/editUser`,
        {
          id: localUser._id,
          name,
          accountNumber,
        },
      );
      
      if (response.data?.success) {
        setSuccess(response.data.message || "User updated successfully");
        setShowEdit(false);
        setLocalUser((prev) =>
          prev ? {...prev, name, accountNumber} : prev,
        );
        await refetch();
      } else {
        setError(response.data?.message || "Something went wrong");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const apiMessage: string =
          err.response?.data?.message ||
          JSON.stringify(err.response?.data) ||
          err.message;
        setError(apiMessage);
      } else {
        setError((err as Error).message || "Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(null);
    setDeleteStats(null);
    
    try {
      setDeleteLoading(true);
      
      const res: AxiosResponse<{
        success: boolean;
        message: string;
      }> = await axios.delete(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/api/admin/deleteUser`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {userId: localUser._id},
        withCredentials: true,
      });
      
      const {success, message} = res.data;
      
      if (success) {
        await refetch();
        setDeleteStats({status: true, message});
        setIsDeleted(true);
      } else {
        throw new Error(message || "Something went wrong");
      }
      
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const apiMessage: string = err.response?.data?.message || err.message || "Something went wrong";
        
        setDeleteStats({status: false, message: apiMessage});
      } else if (err instanceof Error) {
        setDeleteStats({status: false, message: err.message || "Something went wrong"});
      } else {
        setDeleteStats({status: false, message: "Something went wrong"});
      }
    } finally {
      setDeleteLoading(false);
    }
  };
  
  if (isDeleted) return <NoUserMessage type={ "deletedUser" }
                                       handleExit={ handleExit } />;
  
  return (
    <div
      className="bg-stone-900/20 fixed inset-0 flex flex-col justify-center items-center w-full backdrop-blur-xs p-6 z-30 shadow-md">
      <Form
        action={ handleEditUser }
        className="bg-gradient-to-r from-white to-gray-200 p-4 rounded-lg flex flex-col gap-2 w-full px-10 max-w-[400px]"
      >
        <div className="flex justify-between items-center pb-2">
          <h1 className="css-header-text text-stone-800 font-bold">
            USER DATA
          </h1>
          <button
            type="button"
            onClick={ handleExit }
            className="bg-red-500 px-2 py-1 rounded-md hover:bg-red-600 hover:cursor-pointer"
          >
            <BiSolidExit className="css-header-text" />
          </button>
        </div>
        
        <div className="flex">
          <p className="font-bold text-blue-500">User ID:</p>
          <p className="font-semibold pl-2 text-stone-700">{ localUser._id }</p>
        </div>
        
        <div className="flex">
          <p className="font-bold text-blue-500">Name:</p>
          { !showEdit ? (
            <p className="font-semibold pl-2 text-stone-700">
              { localUser.name }
            </p>
          ) : (
            <input
              className="mx-2 px-1 rounded-xs border-none ring-1 ring-black focus:ring-2 focus:ring-blue-600 text-stone-700 outline-none"
              type="text"
              name="editedName"
              defaultValue={ localUser.name }
              required
            />
          ) }
        </div>
        
        <div className="flex">
          <p className="font-bold text-blue-500">Account No:</p>
          { !showEdit ? (
            <p className="font-semibold pl-2 text-stone-700">
              { localUser.accountNumber }
            </p>
          ) : (
            <input
              className="mx-2 px-1 rounded-xs border-none ring-1 ring-black focus:ring-2 focus:ring-blue-600 text-stone-700 outline-none"
              type="text"
              name="editedAccountNumber"
              defaultValue={ localUser.accountNumber }
              required
            />
          ) }
        </div>
        
        <div className="flex">
          <p className="font-bold text-blue-500">Created At:</p>
          <p className="font-semibold pl-2 text-stone-700">
            { dayjs(localUser.createdAt).format("DD MMM YYYY, hh:mm A") }
          </p>
        </div>
        
        <div className="flex">
          <p className="font-bold text-blue-500">Balance:</p>
          <p className="font-semibold pl-2 text-stone-700">
            { localUser.balance }
          </p>
        </div>
        
        <div className="flex px-4 gap-4">
          { !showEdit ? (
            <button
              type="button"
              onClick={ (e) => {
                e.preventDefault();
                setShowEdit(true);
              } }
              className="css-user-edit-button"
              disabled={ loading }
            >
              EDIT
            </button>
          ) : (
            <button
              type="submit"
              disabled={ loading }
              className={ clsx(
                "css-user-save-button",
                loading ? "opacity-50 cursor-not-allowed" : "",
              ) }
            >
              { loading ? "Saving..." : "SAVE" }
            </button>
          ) }
          <button type="button"
                  onClick={ handleDeleteUser }
                  className={ clsx(deleteLoading || loading ? "css-user-delete-button-disabled" : "css-user-delete-button") }
                  disabled={ deleteLoading || loading }>
            { deleteLoading ? "Deleting..." : "DELETE" }
          </button>
        </div>
        
        { error && (
          <p
            className="text-white bg-gradient-to-r from-red-700 to-red-500 font-medium text-sm place-self-center rounded-lg py-0.5 px-8 w-fit">
            { error }
          </p>
        ) }
        { success && (
          <p
            className="text-white bg-gradient-to-r from-green-700 to-green-500 font-medium text-sm place-self-center rounded-lg py-0.5 px-8 w-fit">
            { success }
          </p>
        ) }
        { deleteStats?.status === false && (
          <p
            className="text-white bg-gradient-to-r from-red-700 to-red-500 font-medium text-sm place-self-center rounded-lg py-0.5 px-8 w-fit">
            { deleteStats?.message }
          </p>
        ) }
        { deleteStats?.status && (
          <p
            className="text-white bg-gradient-to-r from-green-700 to-green-500 font-medium text-sm place-self-center rounded-lg py-0.5 px-8 w-fit">
            { deleteStats?.message }
          </p>
        ) }
      </Form>
    </div>
  );
};

export default UserCard;
