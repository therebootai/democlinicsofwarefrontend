import React from "react";
import AdminDashboardTemplate from "../template/AdminDashboardTemplate";
import Topheader from "../component/Topheader";

const AddPaymentCharges = () => {
  return (
    <AdminDashboardTemplate>
      <div>
        <Topheader />
      </div>
      <div className="flex flex-col gap-8 mt-8 ">
        <div className=" flex flex-row gap-8">
          <div className="w-full flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 w-[80%]">
              <div className="flex flex-col gap-2 ">
                <label>Name Of Item</label>
                <input
                  type="text"
                  className="h-[3.5rem]  p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                  placeholder="Name Of Item"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Charges</label>
                <input
                  type="text"
                  className="h-[3.5rem] p-2 focus:outline-none text-start outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                  placeholder="Charges"
                />
              </div>
            </div>
            <button
              type="button"
              className="w-fit px-10 flex justify-center items-center bg-[#5BC0DE] text-white text-lg h-[3rem]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default AddPaymentCharges;
