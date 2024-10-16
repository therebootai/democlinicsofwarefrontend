import React from "react";
import AdminDashboardTemplate from "../template/AdminDashboardTemplate";
import Topheader from "../component/Topheader";
import PrescriptionList from "../component/PrescriptionList";

const PrescriptionManage = () => {
  return (
    <AdminDashboardTemplate>
      <div className="p-8 flex flex-col gap-4">
        <Topheader />
        <div className="flex flex-col gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <PrescriptionList key={index} />
          ))}
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default PrescriptionManage;
