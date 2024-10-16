import React from "react";
import AdminDashboardTemplate from "../../template/AdminDashboardTemplate";
import PerformanceComponent from "../../component/PerformanceComponent";

const Dashboard = () => {
  return (
    <AdminDashboardTemplate>
      <div className="p-8 flex flex-col gap-4">
        <div>
          <PerformanceComponent />
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default Dashboard;
