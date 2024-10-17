import React from "react";
import { BsEye } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { MdCurrencyRupee } from "react-icons/md";
<<<<<<< HEAD
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
=======
>>>>>>> d664b2289d0f5c6b9dc75e90517c502ad4c8d60a

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
<<<<<<< HEAD
          <h3 className="text-[#888] text-sm ps-5">+91 98655 78989</h3>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#eee] inline-flex items-center justify-center py-1 px-4 rounded">
            <h3 className="text-sm text-custom-gray">Priority</h3>
          </div>
          <div className="bg-[#eee] inline-flex items-center justify-center py-1 px-4 rounded">
            <h3 className="text-sm text-custom-gray">Add Invoice</h3>
          </div>
          <div className="bg-[#eee] inline-flex items-center justify-center py-1 px-4 rounded gap-3 text-sm">
            <MdCurrencyRupee className="text-custom-gray" />
            <h3 className="text-custom-green">Paid</h3>
          </div>
        </div>
      </div>
      <div className="flex gap-8 justify-between">
        <div className="bg-[#eee] inline-flex items-center justify-center py-1 px-4 rounded">
          <h3 className="text-sm text-custom-gray">00:09 m | 08:01 PM</h3>
        </div>
        <div className="bg-[#eee] inline-flex items-center justify-center py-1 px-4 rounded gap-3 text-sm">
          <MdCurrencyRupee className="text-custom-gray" />
          <h3 className="text-custom-green">1000 Cash</h3>
        </div>
        <div className="bg-[#eee] inline-flex items-center justify-center py-1 px-4 rounded">
          <h3 className="text-sm text-custom-gray">Add Address</h3>
        </div>
        <div className="bg-[#eee] inline-flex items-center justify-center py-1 px-4 rounded">
          <h3 className="text-sm text-custom-gray">Prescription</h3>
        </div>
        <div className="bg-[#eee] inline-flex items-center justify-center py-1 px-4 rounded">
          <h3 className="text-sm text-custom-gray">Start Visit</h3>
        </div>
        <div className="bg-[#eee] inline-flex items-center justify-center py-1 px-4 rounded">
          <h3 className="text-sm text-custom-gray">More..</h3>
        </div>
        <Link
          to="/prescription/1/details"
          className="inline-flex text-2xl text-custom-purple"
        >
          <IoEyeOutline />
        </Link>
        <button
          type="button"
          className="inline-flex text-2xl text-custom-green"
        >
          <FiEdit />
        </button>
      </div>
=======
        </section>
      ))}
>>>>>>> d664b2289d0f5c6b9dc75e90517c502ad4c8d60a
    </div>
  );
};

export default PrescriptionList;
