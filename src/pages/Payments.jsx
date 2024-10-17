import React, { useState } from "react";
import AdminDashboardTemplate from "../template/AdminDashboardTemplate";
import Topheader from "../component/Topheader";
import { BsEye } from "react-icons/bs";

const Payments = () => {
  const paymentData = [
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      paymode: "Online",
    },
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      paymode: "Online",
    },
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      paymode: "Online",
    },
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      paymode: "Online",
    },
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      paymode: "Online",
    },
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      paymode: "Online",
    },
  ];
  const [paymentModes, setPaymentModes] = useState(paymentData);

  const handlePaymodeChange = (index, newMode) => {
    const updatedModes = [...paymentModes];
    updatedModes[index].paymode = newMode;
    setPaymentModes(updatedModes);
  };

  return (
    <AdminDashboardTemplate>
      <div>
        <Topheader />
      </div>
      <div className="xl:p-8 p-4 flex flex-col gap-8">
        <div className="p-2 bg-white rounded-lg flex flex-col gap-4">
          <h1 className="xlg:text-2xl text-xl font-semibold">Payments</h1>
          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="max-h-[70vh] ">
              <div className="flex flex-col">
                <div className="xlg:px-4 px-2 h-[4rem] bg-[#27B3FF] rounded-t-lg font-medium xlg:font-semibold text-[13px] xlg:text-base text-white flex flex-row items-center justify-between gap-4">
                  <div className="w-[10%]">Id</div>
                  <div className="w-[30%]">Patient Name</div>
                  <div className="w-[15%]">Date and Time</div>
                  <div className="w-[15%]">Service</div>
                  <div className="w-[15%]">Pay Mode</div>
                  <div className="w-[15%]">Action</div>
                </div>
                <div className="flex flex-col">
                  {paymentModes.map((item, index) => (
                    <div
                      key={index}
                      className="xlg:px-4 px-2 py-2 flex flex-row items-center text-[#555555] text-xs xlg:text-sm justify-between gap-4"
                    >
                      <div className="w-[10%]">{item.id}</div>
                      <div className="w-[30%] flex flex-col">
                        <div className="xlg:text-base text-sm font-medium">
                          {item.patient}
                        </div>
                        <div>{item.email}</div>
                        <div>{item.mobilenumber}</div>
                      </div>
                      <div className="w-[15%]">{item.datetime}</div>
                      <div className="w-[15%]">{item.service}</div>
                      <div className="w-[15%]">
                        <select
                          value={item.paymode}
                          onChange={(e) =>
                            handlePaymodeChange(index, e.target.value)
                          }
                          className={`px-2 w-fit rounded h-[1.5rem] xlg:h-[2rem] outline-none flex justify-center items-center border border-[#B8B8B8] ${
                            item.paymode === "Online"
                              ? "text-custom-blue"
                              : "text-custom-green"
                          }`}
                        >
                          <option value="Online">Online</option>
                          <option value="Cash">Cash</option>
                        </select>
                      </div>
                      <div className="w-[15%] flex flex-row gap-4">
                        <button>
                          <img
                            src="/icons/navigation.svg"
                            className="xlg:h-[1.4rem] h-[1rem]"
                          />
                        </button>
                        <button className="xlg:text-2xl text-xl font-medium text-custom-purple">
                          <BsEye />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default Payments;
