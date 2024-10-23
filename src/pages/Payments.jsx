import React, { useState } from "react";
import AdminDashboardTemplate from "../template/AdminDashboardTemplate";
import Topheader from "../component/Topheader";
import { BsEye } from "react-icons/bs";
import { GoPerson, GoPlusCircle } from "react-icons/go";
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";

const Payments = () => {
  const paymentsData = [
    {
      pid: "001",
      name: "Prakesh C.",
      gender: "Male",
      age: "37",
      mobilenumber: "1234567890",
      doctorname: "Dr. Saikat Paul",
      paid: "500",
      due: "200",
      totalbill: "700",
    },
    {
      pid: "001",
      name: "Prakesh C.",
      gender: "Male",
      age: "37",
      mobilenumber: "1234567890",
      doctorname: "Dr. Saikat Paul",
      paid: "500",
      due: "200",
      totalbill: "700",
    },
    {
      pid: "001",
      name: "Prakesh C.",
      gender: "Male",
      age: "37",
      mobilenumber: "1234567890",
      doctorname: "Dr. Saikat Paul",
      paid: "500",
      due: "200",
      totalbill: "700",
    },
  ];

  return (
    <AdminDashboardTemplate>
      <div>
        <Topheader>
          <Link
            to="/payments/add-payment-charges"
            className="flex items-center bg-custom-orange hover:bg-custom-blue gap-3 rounded px-3 h-[2.5rem] text-xs xl:text-base xlg:text-sm text-[#F5F5F5]"
          >
            <GoPlusCircle />
            <h3>Create Invoice</h3>
          </Link>
        </Topheader>
      </div>
      <div className="xl:p-8 p-4 flex flex-col gap-8">
        <div className="p-2 bg-white rounded-lg flex flex-col gap-4">
          <h1 className="xlg:text-2xl text-xl font-semibold">Payments</h1>
          <div className="w-full flex flex-col gap-6">
            {paymentsData.map((item, index) => (
              <section
                key={index}
                className={`xlg:p-4 p-3 rounded-md border border-[#E7E7E7]  ${
                  index % 2 == 0 ? "bg-[#F5F5F5]" : " bg-transparent "
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row items-center gap-2">
                        <span className="xlg:text-lg text-sm text-[#888888] font-medium ">
                          {item.pid}.
                        </span>
                        <div className="flex flex-row items-center gap-1 text-[13px] xlg:text-base font-medium text-[#555555]">
                          <GoPerson /> <span>{item.name}</span> |
                          <span>{item.gender}</span> |
                          <span>{item.age} Years</span>
                        </div>
                      </div>
                      <div className="xlg:text-base text-[13px] font-medium text-[#555555]">
                        +91 {item.mobilenumber}
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 xlg:gap-4">
                      <button
                        className={`priority-button ${
                          index % 2 === 0 ? "bg-[white]" : "bg-[#EEEEEE]"
                        }`}
                      >
                        {item.doctorname}
                      </button>
                      <button
                        className={`priority-button ${
                          index % 2 === 0 ? "bg-[white]" : "bg-[#EEEEEE]"
                        }`}
                      >
                        <span>
                          <MdCurrencyRupee />
                        </span>
                        <span className="text-[#00B252]">{item.paid} Paid</span>
                      </button>
                      <button
                        className={`priority-button text-[#E40000] ${
                          index % 2 === 0 ? "bg-[white]" : "bg-[#EEEEEE]"
                        } `}
                      >
                        Due {item.due}
                      </button>
                      <button
                        className={`priority-button  ${
                          index % 2 === 0 ? "bg-[white]" : "bg-[#EEEEEE]"
                        } `}
                      >
                        Total <MdCurrencyRupee /> {item.totalbill}
                      </button>
                      <div className="flex flex-row items-center gap-2 xlg:gap-4">
                        <button className="xlg:text-2xl text-xl font-medium text-[#7F03FA]">
                          <BsEye />
                        </button>
                        <Link
                          to={"/patient/:id/createinvoice"}
                          className="xlg:text-2xl text-xl font-medium text-[#00B252]"
                        >
                          <GoPlusCircle />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default Payments;
