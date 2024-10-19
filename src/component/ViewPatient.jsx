import React from "react";
import { RxCrossCircled } from "react-icons/rx";

const ViewPatient = ({ handleClose }) => {
  const viewpatientdetails = [
    {
      name: "Patient Name",
      details: "Parakash C. Roy",
    },
    {
      name: "Gender",
      details: "Male",
    },
    {
      name: "Mobile",
      details: "+91 12345 67890",
    },
    {
      name: "Age",
      details: "35 years",
    },
    {
      name: "Location",
      details: "Bidhannagar (Kolkata)",
    },
    {
      name: "Doctor",
      details: " Dr. Saikat Paul",
    },
    {
      name: "Priority",
      details: "FAst",
    },
    {
      name: "Pay Mode",
      details: "Cash",
    },
  ];
  return (
    <div className="xlg:p-8 p-4 flex flex-col gap-16">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#333333]">View Patient</h1>
        <button onClick={handleClose}>
          <RxCrossCircled size={24} />
        </button>
      </div>
      <div className="flex flex-row justify-between ">
        <div className="flex flex-col gap-4">
          {viewpatientdetails.map((item, index) => (
            <div className="text-[#00000080] text-lg" key={index}>
              &#x2022; {item.name} : {item.details}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 justify-end items-center">
          <button className="px-6 h-[2.5rem] w-fit rounded-md border border-custom-blue text-custom-blue text-sm hover:bg-custom-blue hover:text-white">
            Consultation
          </button>
          <button className="px-6 h-[2.5rem] w-fit rounded-md border border-custom-blue text-custom-blue text-sm hover:bg-custom-blue hover:text-white">
            Prescription
          </button>
          <button className="px-6 h-[2.5rem] w-fit rounded-md border border-custom-blue text-custom-blue text-sm hover:bg-custom-blue hover:text-white">
            Get Estimate
          </button>
          <button className="px-6 h-[2.5rem] w-fit rounded-md border border-custom-blue text-custom-blue text-sm hover:bg-custom-blue hover:text-white">
            Start Visit Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPatient;
