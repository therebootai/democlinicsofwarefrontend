import React, { useState } from "react";
import AdminDashboardTemplate from "../../template/AdminDashboardTemplate";
import PerformanceComponent from "../../component/PerformanceComponent";
import Topheader from "../../component/Topheader";
import GaugeChart from "../../component/GaugeChart";
import { BsGraphUpArrow, BsPeople } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const Dashboard = () => {
  const [data, setData] = useState([
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      doctor: "Dr. Saikat Paul",
      fees: "700 INR",
      paymentstatus: "Confirm",
    },
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      doctor: "Dr. Saikat Paul",
      fees: "700 INR",
      paymentstatus: "Pending",
    },
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      doctor: "Dr. Saikat Paul",
      fees: "700 INR",
      paymentstatus: "Confirm",
    },
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      doctor: "Dr. Saikat Paul",
      fees: "700 INR",
      paymentstatus: "Refund",
    },
  ]);

  // Function to handle changes in payment status
  const handlePaymentStatusChange = (index, newStatus) => {
    const updatedData = [...data];
    updatedData[index].paymentstatus = newStatus;
    setData(updatedData);
  };

  return (
    <AdminDashboardTemplate>
      <div className="">
        <Topheader />
      </div>
      <div className="xl:p-8 p-4 flex flex-col gap-8">
        <div>
          <PerformanceComponent />
        </div>
        <div className="flex flex-col w-full lg:flex-row gap-4 justify-between overflow-x-hidden p-4 ">
          <div className="bg-white rounded boxsh flex items-center justify-center w-full lg:w-[50%] xlg:w-[50%]">
            <GaugeChart
              icon={<BsPeople className="size-6 text-custom-orange" />}
              text={"Monthly Patients"}
            />
          </div>
          <div className="bg-white rounded boxsh flex items-center justify-center w-full lg:w-[50%] xlg:w-[50%]">
            <GaugeChart
              icon={<BsGraphUpArrow className="size-6 text-custom-orange" />}
              text={"Payments"}
            />
          </div>
        </div>
        <div className="p-2 bg-white rounded-lg flex flex-col gap-4">
          <h1 className="xlg:text-2xl text-xl font-semibold">
            Recent Appointments
          </h1>
          <div className="  w-full overflow-x-auto custom-scroll ">
            <div className=" max-h-[400px] min-w-[1100px] xlg:min-w-[1400px]">
              <div className="flex flex-col">
                <div className="px-4 h-[4rem] bg-[#27B3FF] rounded-t-lg font-semibold text-sm xlg:text-base text-white flex flex-row items-center justify-between gap-4 ">
                  <div className="w-[10%]">Id</div>
                  <div className="w-[25%]">Patient</div>
                  <div className="w-[15%]">Date and Time</div>
                  <div className="w-[10%]">Service</div>
                  <div className="w-[10%]">Doctor</div>
                  <div className="w-[10%]">Fees</div>
                  <div className="w-[10%]">Payment Status</div>
                  <div className="w-[10%]">Action</div>
                </div>
                <div className="flex flex-col ">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 flex flex-row items-center  text-[#555555] text-xs xlg:text-sm justify-between gap-4"
                    >
                      <div className="w-[10%]">{item.id}</div>
                      <div className="w-[25%] flex flex-col">
                        <div className="xlg:text-base text-sm font-medium">
                          {item.patient}
                        </div>
                        <div>{item.email}</div>
                        <div>{item.mobilenumber}</div>
                      </div>
                      <div className="w-[15%]">{item.datetime}</div>
                      <div className="w-[10%]">{item.service}</div>
                      <div className="w-[10%]">{item.doctor}</div>
                      <div className="w-[10%]">{item.fees}</div>
                      <div className="w-[10%]">
                        <select
                          value={item.paymentstatus}
                          onChange={(e) =>
                            handlePaymentStatusChange(index, e.target.value)
                          }
                          className={`px-2 w-fit rounded h-[1.5rem] xlg:h-[2rem]  bg-white boxsh outline-none flex justify-center items-center border border-[#B8B8B8]  ${
                            item.paymentstatus === "Confirm"
                              ? "text-green-500"
                              : item.paymentstatus === "Refund"
                              ? "text-blue-500"
                              : "text-gray-500"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirm">Confirm</option>
                          <option value="Refund">Refund</option>
                        </select>
                      </div>

                      <div className="w-[10%] flex gap-4 items-center">
                        <button className="text-[#00B252] font-semibold text-2xl ">
                          <FaEdit />
                        </button>
                        <button className="text-[#E40000] font-semibold text-2xl ">
                          <RiDeleteBin6Line />
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

export default Dashboard;
