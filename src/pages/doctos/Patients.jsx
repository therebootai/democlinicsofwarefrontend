import React, { useState } from "react";
import AdminDashboardTemplate from "../../template/AdminDashboardTemplate";
import { GoPerson } from "react-icons/go";
import { MdCurrencyRupee } from "react-icons/md";
import { BsEye } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Topheader from "../../component/Topheader";
import { Link } from "react-router-dom";
import ViewPatient from "../../component/ViewPatient";

const Patients = () => {
  const [showViewPatient, setShowViewPatient] = useState(false);

  const handleViewPatient = () => {
    setShowViewPatient(true);
  };

  const handleClose = () => {
    setShowViewPatient(false);
  };
  const patientsdata = [
    {
      pid: "001",
      name: "Prakesh C. ",
      gender: "Male",
      age: "37",
      mobilenumber: "1234567890",
      paid: "1000",
      due: "500",
      priority: "High",
      doctorname: "Dr Saikat Paul",
    },
    {
      pid: "001",
      name: "Prakesh C. ",
      gender: "Male",
      age: "37",
      mobilenumber: "1234567890",
      paid: "1000",
      due: "500",
      priority: "",
      doctorname: "Dr Saikat Paul",
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
                    <button
                      className={`priority-button ${
                        item.priority === "High"
                          ? "bg-blue-500 text-white"
                          : item.priority === ""
                          ? "bg-gray-200 text-gray-500"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {item.priority || "Priority"}
                    </button>
                    <button className="priority-button">
                      <span>
                        <MdCurrencyRupee />
                      </span>
                      <span className="text-[#00B252]">{item.paid} Paid</span>
                    </button>
                    <button className="priority-button text-[#E40000]">
                      Due {item.due}
                    </button>
                    <button className="priority-button">
                      {item.doctorname}
                    </button>
                  </div>
                </div>

                <div className="flex flex-row justify-between items-center ">
                  <div className="priority-button">Document</div>
                  <div className="priority-button">Consultation</div>
                  <button className="priority-button">Get Estimate</button>

                  <Link to="/prescription/add" className="priority-button">
                    Start Visit
                  </Link>
                  <button className="priority-button">Prescription</button>
                  <button className="priority-button">Forms</button>
                  <div className="flex flex-row items-center gap-4">
                    <button
                      onClick={handleViewPatient}
                      className="xlg:text-2xl text-xl font-medium text-[#7F03FA]"
                    >
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
        <div
          className={`fixed top-0 right-0 h-screen w-[60%] xlg:w-[50%] overflow-scroll custom-scroll  bg-[#EDF4F7] shadow-lg transform transition-transform duration-300 ease-in-out ${
            showViewPatient ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4">
            <ViewPatient handleClose={handleClose} />
          </div>
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default Patients;
