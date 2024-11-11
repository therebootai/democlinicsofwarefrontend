import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminDashboardTemplate from "../../template/AdminDashboardTemplate";
import Topheader from "../../component/Topheader";

const PatientPrescriptions = () => {
  const { patientId } = useParams(); // Get the patientId from the route params
  const [prescriptions, setPrescriptions] = useState([]);
  const [patientName, setPatientName] = useState("");
  const navigate = useNavigate();

  // Fetch prescriptions for the patient
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/patients/get/${patientId}`
        );
        setPrescriptions(response.data.prescriptions);
        setPatientName(response.data.patientName);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };
    fetchPrescriptions();
  }, [patientId]);

  const handleViewPrescription = (prescription) => {
    navigate(`/prescription/${patientId}/details/${prescription}`);
  };

  return (
    <AdminDashboardTemplate>
      <Topheader />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">
          Prescriptions for Patient {patientName}
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {prescriptions.length > 0 ? (
            prescriptions.map((prescription, index) => (
              <div
                key={prescription._id}
                className={`border border-gray-300 p-4 mb-3 rounded-md shadow-sm ${
                  index % 2 === 0 ? "bg-[#F5F5F5]" : " bg-transparent "
                }`}
              >
                <p>Prescription ID: {prescription.prescriptionId}</p>
                <p>
                  Created At:{" "}
                  {new Date(prescription.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => handleViewPrescription(prescription._id)}
                  className="mt-2 px-4 py-2 bg-custom-orange text-white rounded hover:bg-blue-600 transition"
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <p>No prescriptions found for this patient.</p>
          )}
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default PatientPrescriptions;
