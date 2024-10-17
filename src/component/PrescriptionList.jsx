import React from "react";
import { BsEye } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { MdCurrencyRupee } from "react-icons/md";

const PrescriptionList = ({ prescriptionlist = [] }) => {
  return (
    <div className="flex flex-col gap-6">
      {prescriptionlist.map((item, index) => (
        <section key={index} className="xlg:p-4 p-3 rounded-md bg-white ">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-start justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center gap-2">
                  <span className="xlg:text-lg text-base text-[#888888] font-medium ">
                    {item.pid}.
                  </span>
                  <div className="flex flex-row items-center gap-1 text-sm xlg:text-base font-medium text-[#555555]">
                    <GoPerson /> <span>{item.name}</span> |
                    <span>{item.gender}</span> |<span>{item.age} Years</span>
                  </div>
                </div>
                <div className="xlg:text-base text-sm font-medium text-[#555555]">
                  +91 {item.mobilenumber}
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <button className="priority-button">Priority</button>
                <button className="priority-button">Consultation</button>
                <button className="priority-button">
                  <span>
                    <MdCurrencyRupee />
                  </span>
                  <span className="text-[#00B252]">Paid</span>
                </button>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center ">
              <div className="priority-button">{item.datetime}</div>
              <button className="priority-button">
                <span>
                  <MdCurrencyRupee />
                </span>
                <span className="text-[#00B252]">{item.paid} Cash</span>
              </button>
              <button className="priority-button">Due {item.due}</button>
              <button className="priority-button">Prescription</button>
              <button className="priority-button">Start Visit</button>
              <button className="priority-button">More..</button>
              <div className="flex flex-row items-center gap-4">
                <button className="xlg:text-2xl text-xl font-medium text-[#7F03FA]">
                  <BsEye />
                </button>
                <button className="xlg:text-2xl text-xl font-medium text-[#00B252]">
                  <FaEdit />
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default PrescriptionList;
