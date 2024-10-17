import React from "react";
import AdminDashboardTemplate from "../../template/AdminDashboardTemplate";
import PerformanceComponent from "../../component/PerformanceComponent";
import Topheader from "../../component/Topheader";

const Dashboard = () => {
  const data = [
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      doctor: "Dr. Saikat Paul",
      age: "32",
      gender: "Male",
    },
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      doctor: "Dr. Saikat Paul",
      age: "32",
      gender: "Male",
    },
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      doctor: "Dr. Saikat Paul",
      age: "32",
      gender: "Male",
    },
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      doctor: "Dr. Saikat Paul",
      age: "32",
      gender: "Male",
    },
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      doctor: "Dr. Saikat Paul",
      age: "32",
      gender: "Male",
    },
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      doctor: "Dr. Saikat Paul",
      age: "32",
      gender: "Male",
    },
    {
      id: "#44",
      patient: "Harish Malik Mohan",
      email: "healthcaredentalenter@gmail.com",
      mobilenumber: "+91 12345 67890",
      datetime: "12/07/24 - 3:00pm",
      service: "Dental Treatment",
      doctor: "Dr. Saikat Paul",
      age: "32",
      gender: "Male",
    },
  ];
  return (
    <AdminDashboardTemplate>
      <div className="">
        <Topheader />
      </div>
      <div className="xl:p-8 p-4 flex flex-col gap-8">
        <div>
          <PerformanceComponent />
        </div>
        <div className="p-2 bg-white rounded-lg flex flex-col gap-4">
          <h1 className="xlg:text-2xl text-xl font-semibold">
            Recent Appointments
          </h1>
          <div className="  w-full overflow-x-auto no-scrollbar ">
            <div className=" max-h-[400px] min-w-[1000px]">
              <div className="flex flex-col">
                <div className="px-4 h-[4rem] bg-[#27B3FF] rounded-t-lg font-semibold text-sm xlg:text-base text-white flex flex-row items-center justify-between gap-4 ">
                  <div className="w-[10%]">Id</div>
                  <div className="w-[30%]">Patient</div>
                  <div className="w-[15%]">Date and Time</div>
                  <div className="w-[15%]">Service</div>
                  <div className="w-[10%]">Doctor</div>
                  <div className="w-[10%]">Age</div>
                  <div className="w-[10%]">Gender</div>
                </div>
                <div className="flex flex-col ">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 flex flex-row items-center  text-[#555555] text-xs xlg:text-sm justify-between gap-4"
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
                      <div className="w-[10%]">{item.doctor}</div>
                      <div className="w-[10%]">{item.age}</div>
                      <div className="w-[10%]">{item.gender}</div>
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
