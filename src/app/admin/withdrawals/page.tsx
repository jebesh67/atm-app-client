import AdminHeader from "@/components/admin/AdminHeader";
import AdminWithdrawalComponent from "@/components/admin/withdrawal/AdminWithdrawalComponent";

const DepositsPage = () => {
  return (
    <>
      <AdminHeader />
      <div className="px-4 flex justify-center items-center pt-18"><AdminWithdrawalComponent /></div>
    </>
  );
};

export default DepositsPage;