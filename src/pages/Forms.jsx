import React, { useState } from "react";
import AdminDashboardTemplate from "../template/AdminDashboardTemplate";
import Topheader from "../component/Topheader";
import FormCard from "../component/FormCard";
import { GoPlusCircle } from "react-icons/go";

export const Forms = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddNewClick = () => {
    setShowAddForm(true);
  };

  return (
    <AdminDashboardTemplate>
      <div className="">
        <Topheader
          isModalShow={showAddForm}
          setIsModalShow={setShowAddForm}
          modalToShow={"formModal"}
        >
          <button
            onClick={handleAddNewClick}
            className="flex items-center bg-custom-orange hover:bg-custom-blue gap-3 rounded px-2 xlg:px-3  h-[2.5rem] text-xs xl:text-base xlg:text-sm text-[#F5F5F5]"
          >
            <GoPlusCircle />
            <h3>Upload Form</h3>
          </button>
        </Topheader>
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
