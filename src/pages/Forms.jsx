import React from "react";
import AdminDashboardTemplate from "../template/AdminDashboardTemplate";
import Topheader from "../component/Topheader";
import FormCard from "../component/FormCard";

export const Forms = () => {
  return (
    <AdminDashboardTemplate>
      <div className="">
        <Topheader />
      </div>
      <div className="xl:p-8 p-4 flex flex-col gap-8">
        <div className="grid grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <FormCard key={index} />
          ))}
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};
