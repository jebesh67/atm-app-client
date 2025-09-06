import React from "react";

const NoUserMessage = ({handleExit, type}: { handleExit: () => void; type: "noUser" | "deletedUser" }) => {
  return (
    <main className="bg-stone-900/20 fixed inset-0 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-sky-600 font-semibold">{
          type === "noUser" ? "No user selected" : "User has been deleted"
        }</p>
        <div className="flex justify-center items-center">
          <button
            type="button"
            onClick={ handleExit }
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 hover:cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </main>
  );
};

export default NoUserMessage;
