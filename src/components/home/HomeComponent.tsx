"use client";

import UserInfoCard from "@/components/shared/UserInfoCard";
import HomeNavs from "@/components/home/HomeNavs";

const HomeComponent = () => {
  
  return (
    <div className="pt-15 lg:pt-16 w-full max-w-180 place-self-center">
      <UserInfoCard />
      <HomeNavs />
    </div>
  );
};

export default HomeComponent;
