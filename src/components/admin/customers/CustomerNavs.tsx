"use client";

type CustomerNavsProps = {
  setShowCreateUser: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomerNavs = ({setShowCreateUser}: CustomerNavsProps) => {
  return (
    <nav className="flex justify-center gap-4 p-4">
      <button
        onClick={ () => setShowCreateUser(true) }
        className="css-button-bal"
      >
        New User
      </button>
      <button className="css-button-bal">Find User</button>
    </nav>
  );
};

export default CustomerNavs;
