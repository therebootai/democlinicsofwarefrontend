import React from "react";
import { IoEyeOutline, IoPersonOutline } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

const PrescriptionList = () => {
  return (
    <div className="rounded bg-white p-6 flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-custom-gray font-semibold gap-1 text-base">
            <IoPersonOutline /> <span>Prakesh C. | Male | 37 Years</span>
          </div>
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
    </div>
  );
};

export default PrescriptionList;
