import React from "react";
import { RxCrossCircled } from "react-icons/rx";

const ViewPatient = ({ handleClose, patient }) => {
  const viewpatientdetails = [
    { name: "Patient Name", details: patient.patientName },
    { name: "Gender", details: patient.gender },
    { name: "Mobile", details: `+91 ${patient.mobileNumber}` },
    { name: "Age", details: `${patient.age} years` },
    { name: "Location", details: patient.location },
    { name: "Doctor", details: patient.chooseDoctorDetails?.name || "N/A" },
    { name: "Priority", details: patient.priority || "N/A" },
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
