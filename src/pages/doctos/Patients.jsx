import React from "react";
import AdminDashboardTemplate from "../../template/AdminDashboardTemplate";
import { GoPerson } from "react-icons/go";
import { MdCurrencyRupee } from "react-icons/md";
import { BsEye } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Topheader from "../../component/Topheader";
import { Link } from "react-router-dom";

const Patients = () => {
  const patientsdata = [
    {
      pid: "001",
      name: "Prakesh C. ",
      gender: "Male",
      age: "37",
      mobilenumber: "1234567890",
      datetime: "00:09 m | 08:01  PM",
      paid: "1000",
      due: "500",
    },
    {
      pid: "002",
      name: "Prakesh C. ",
      gender: "Male",
      age: "37",
      mobilenumber: "1234567890",
      datetime: "00:09 m | 08:01  PM",
      paid: "1000",
      due: "500",
    },
    {
      pid: "003",
      name: "Prakesh C. ",
      gender: "Male",
      age: "37",
      mobilenumber: "1234567890",
      datetime: "00:09 m | 08:01  PM",
      paid: "1000",
      due: "500",
    },
    {
      pid: "004",
      name: "Prakesh C. ",
      gender: "Male",
      age: "37",
      mobilenumber: "1234567890",
      datetime: "00:09 m | 08:01  PM",
      paid: "1000",
      due: "500",
    },
    {
      pid: "005",
      name: "Prakesh C. ",
      gender: "Male",
      age: "37",
      mobilenumber: "1234567890",
      datetime: "00:09 m | 08:01  PM",
      paid: "1000",
      due: "500",
    },
    {
      pid: "006",
      name: "Prakesh C. ",
      gender: "Male",
      age: "37",
      mobilenumber: "1234567890",
      datetime: "00:09 m | 08:01  PM",
      paid: "1000",
      due: "500",
    },
    {
      pid: "007",
      name: "Prakesh C. ",
      gender: "Male",
      age: "37",
      mobilenumber: "1234567890",
      datetime: "00:09 m | 08:01  PM",
      paid: "1000",
      due: "500",
    },
  ];

  return (
    <AdminDashboardTemplate>
      <div className="">
        <Topheader />
      </div>
      <div className="xl:p-8 p-4 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          {patientsdata.map((item, index) => (
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
                        <span>{item.gender}</span> |
                        <span>{item.age} Years</span>
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
                  <Link to="/prescription/add" className="priority-button">
                    Prescription
                  </Link>
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
      </div>
    </AdminDashboardTemplate>
  );
};

export default Patients;
