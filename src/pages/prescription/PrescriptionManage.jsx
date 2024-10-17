import React from "react";
import AdminDashboardTemplate from "../../template/AdminDashboardTemplate";
import Topheader from "../../component/Topheader";
import PrescriptionList from "../../component/PrescriptionList";

const PrescriptionManage = () => {
  const prescriptionlist = [
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
      <div className=" flex flex-col gap-4">
        <Topheader />
        <div className="flex flex-col gap-6 p-8">
          <PrescriptionList prescriptionlist={prescriptionlist} />
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default PrescriptionManage;
