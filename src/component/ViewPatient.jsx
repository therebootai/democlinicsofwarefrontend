import React, { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom"; // Import Link for routing

const ViewPatient = ({ handleClose, patient }) => {
  const [clinicName, setClinicName] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");

  useEffect(() => {
    const fetchClinicData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/clinic/all?clinicId=${
            patient.clinicId
          }`
        );
        const clinics = await response.json();
        console.log("Clinics is ", clinics);
        if (clinics.length > 0) {
          setClinicName(clinics[0].clinic_name);
          setClinicAddress(clinics[0].clinic_address);
        } else {
          setClinicName("N/A");
          setClinicAddress("N/A");
        }
      } catch (error) {
        console.error("Error fetching clinic data:", error);
      }
    };

    if (patient.clinicId) {
      fetchClinicData();
    }
  }, [patient.clinicId]);

  const viewpatientdetails = [
    { name: "Patient Name", details: patient.patientName },
    { name: "Gender", details: patient.gender },
    { name: "Mobile", details: `+91 ${patient.mobileNumber}` },
    { name: "Age", details: `${patient.age} years` },
    { name: "Location", details: patient.location },
    { name: "Doctor", details: patient.chooseDoctorDetails?.name || "N/A" },
    { name: "Priority", details: patient.priority || "N/A" },
    {
      name: "Appointment Date",
      details: new Date(patient.appointmentdate).toLocaleDateString() || "N/A",
    },
    { name: "Clinic Name", details: clinicName || "N/A" },
    { name: "Clinic Address", details: clinicAddress || "N/A" },
  ];

  return (
    <div className="xlg:p-8 p-4 flex flex-col gap-16">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#333333]">View Patient</h1>
        <button onClick={handleClose}>
          <RxCrossCircled size={24} />
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-4">
          {viewpatientdetails.map((item, index) => (
            <div className="text-[#00000080] text-lg" key={index}>
              &#x2022; {item.name} : {item.details}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 justify-end items-center">
          {/* TC Card */}
          <Link
            to={`/patient/${patient.patientId}/tccard`}
            className="px-6 h-[2.5rem] w-fit rounded-md border flex justify-center items-center border-custom-blue text-custom-blue text-sm hover:bg-custom-blue hover:text-white transition-colors duration-300 ease-in-out"
          >
            TC Card
          </Link>

          {/* Prescription */}
          <Link
            to={`/patient/${patient.patientId}/prescriptions`}
            className="px-6 h-[2.5rem] w-fit rounded-md border flex justify-center items-center border-custom-blue text-custom-blue text-sm hover:bg-custom-blue hover:text-white transition-colors duration-300 ease-in-out"
          >
            Prescription
          </Link>

          {/* Estimate */}
          <Link
            to={`/patient/${patient.patientId}/estimate`}
            className="px-6 h-[2.5rem] w-fit rounded-md border flex justify-center items-center border-custom-blue text-custom-blue text-sm hover:bg-custom-blue hover:text-white transition-colors duration-300 ease-in-out"
          >
            Get Estimate
          </Link>

          {/* Start Visit */}
          <Link
            to={`/prescription/add/${patient.patientId}`}
            className="px-6 h-[2.5rem] w-fit rounded-md border flex justify-center items-center border-custom-blue text-custom-blue text-sm hover:bg-custom-blue hover:text-white transition-colors duration-300 ease-in-out"
          >
            Start Visit Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewPatient;
