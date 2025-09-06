import AdminDepositsComponent from "@/components/admin/deposits/AdminDepositsComponent";
import AdminHeader from "@/components/admin/AdminHeader";

const DepositsPage = () => {
  return (
    <>
      <AdminHeader/>
      <div className="px-4 flex justify-center items-center pt-18"><AdminDepositsComponent/></div>
    </>
  );
};

export default DepositsPage;