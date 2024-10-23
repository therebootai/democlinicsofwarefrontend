import React from "react";
import AdminDashboardTemplate from "../template/AdminDashboardTemplate";
import Topheader from "../component/Topheader";
import { MdCurrencyRupee } from "react-icons/md";
import { GoPlusCircle } from "react-icons/go";
import { Link } from "react-router-dom";

const Estimate = () => {
  const estimate = [
    {
      itemname: "Consultation Charges",
      charges: "500",
      description: "Lorem Ipsum",
    },
    {
      itemname: "Consultation Charges",
      charges: "500",
      description: "",
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
      <div className="flex flex-col gap-10 mt-6 ">
        <div className="w-[40%]">
          <input
            type="text"
            placeholder="Search Patients"
            className="h-[4rem] px-4 bg-[#F5F5F5] w-full rounded-md outline-none "
          />
        </div>

        <div className="p-4 border-2 border-[#E7E7E7] rounded-lg">
          <div className="flex flex-col">
            <div className="flex justify-between py-3  border-b border-black/20">
              <div className="flex items-center gap-5 justify-center">
                <img
                  src="/icons/tooth-prescription.svg"
                  alt="dental prescribe"
                  width={71}
                  height={71}
                  className="size-[4vmax]"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="xlg:text-base text-sm font-semibold text-custom-gray">
                    Dr. Saikat Paul
                  </h1>
                  <p className="xlg:text-base text-sm text-[#9C9C9C]">
                    MD, BDS
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 justify-center">
                <div className="flex flex-col ">
                  <h1 className="xlg:text-base text-sm font-semibold text-custom-gray text-right">
                    Dentity Dental
                  </h1>
                  <p className="xlg:text-base text-sm text-[#9C9C9C] text-right">
                    Rajarhat Newtown, Kolkata
                  </p>
                </div>
                <img
                  src="/icons/hospital.svg"
                  alt="dental prescribe"
                  width={71}
                  height={71}
                  className="size-[3.8vmax]"
                />
              </div>
            </div>
            <div className="flex justify-between py-3  border-b border-black/20">
              <div className="flex flex-col gap-2">
                <h1 className="xlg:text-base text-sm font-semibold text-custom-gray">
                  Prakesh Chandra
                </h1>
                <p className="xlg:text-base text-sm text-[#9C9C9C]">
                  Male, 32 Years | +91 12356 67890
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="xlg:text-base text-sm font-semibold text-custom-gray text-right">
                  Monday
                </h1>
                <p className="xlg:text-base text-sm font-semibold text-custom-gray   text-right">
                  23/09/2024 | 02:45 PM
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 py-4">
              <div className="border-b border-[#0000001A] flex flex-row pb-2 font-semibold text-sm text-[#333333] ">
                <div className="flex-1">Name of Item</div>
                <div className="flex-1">Charges</div>
                <div className="flex-1">Description</div>
              </div>
              <div className="flex flex-col gap-2">
                {estimate.map((item, index) => (
                  <div
                    className="flex flex-row text-sm text-custom-gray "
                    key={index}
                  >
                    <div className="flex-1">
                      {index + 1}. {item.itemname}
                    </div>
                    <div className="flex-1 flex items-center">
                      <span>
                        <MdCurrencyRupee />
                      </span>
                      {item.charges}
                    </div>
                    <div className="flex-1">{item.description || "N/A"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-6">
          <div className="flex flex-row gap-8">
            <div className=" w-[40%] ">
              <select
                name=""
                id=""
                className="h-[4rem] px-4 bg-[#F5F5F5] w-full rounded-md outline-none"
              >
                <option value="">Consultation Charges - 500</option>
                <option value="">IOPA X- Ray of - 6000</option>
                <option value="">Extraction of - 5000</option>
                <option value="">
                  Ultra Sonic Scalling of Full Mouth - 700
                </option>
              </select>
            </div>
            <div className="w-[40%]">
              <input
                type="text"
                placeholder="If any type of description"
                className="h-[4rem] px-4 bg-[#F5F5F5] w-full rounded-md outline-none"
              />
            </div>
          </div>
          <div className="w-full flex flex-row gap-6">
            <button className="w-[15%] flex justify-center items-center h-[3rem] rounded border-2 border-custom-blue text-custom-blue bg-white hover:bg-custom-blue hover:text-white font-medium">
              Add Item
            </button>
            <button className="w-[15%] flex justify-center items-center h-[3rem] rounded border-2 border-custom-blue text-custom-blue bg-white hover:bg-custom-blue hover:text-white font-medium">
              Preview
            </button>
            <button className="w-[15%] flex justify-center items-center h-[3rem] rounded border-2 border-custom-blue text-custom-blue bg-white hover:bg-custom-blue hover:text-white font-medium">
              Download
            </button>
          </div>
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default Estimate;
