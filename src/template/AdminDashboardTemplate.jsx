import React, { useEffect, useState } from "react";
import AdminSideHeader from "../component/SideHeader";

const AdminDashboardTemplate = ({ children }) => {
  const [isTokenVerified, setIsTokenVerified] = useState(false);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     setIsTokenVerified(false);
  //     setTimeout(() => {
  //       alert("You are not logged in");
  //       window.location.href = "/";
  //     }, 0);
  //     return;
  //   }
  //   setIsTokenVerified(true);
  // }, []);

  // if (!isTokenVerified) {
  //   return <div></div>;
  // }

  return (
    <div className="flex flex-col w-full h-full   overflow-hidden">
      <div className="flex flex-row h-screen sm:w-full ">
        <span className="xlg:w-[15%] w-[20%]">
          <AdminSideHeader />
        </span>
        <div className="w-[80%] xlg:w-[85%] xlg:px-6 px-4 xl:px-8 p-4 overflow-auto    ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardTemplate;
