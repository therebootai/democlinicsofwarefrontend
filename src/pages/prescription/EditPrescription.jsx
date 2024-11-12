import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import TopHeaderMini from "../../component/TopHeaderMini";
import PatientMedicalHistory from "../../component/prescription/PatientMedicalHistory";
import ChiefComplain from "../../component/prescription/ChiefComplain";
import OnExamination from "../../component/prescription/OnExamination";
import Investigation from "../../component/prescription/Investigation";
import Radiography from "../../component/prescription/Radiography";
import Advices from "../../component/prescription/Advices";
import Medications from "../../component/prescription/Medications";
import axios from "axios";

const EditPrescription = () => {
  const { patientId, prescriptionId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Initialize state for each prescription field
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [chiefComplain, setChiefComplain] = useState([]);
  const [onExamination, setOnExamination] = useState([]);
  const [investigation, setInvestigation] = useState([]);
  const [radiography, setRadiography] = useState([]);
  const [advices, setAdvices] = useState([]);
  const [medications, setMedications] = useState([]);

  // Fetch data on component mount or when patientId/prescriptionId changes
  useEffect(() => {
    const fetchPrescriptionData = async () => {
      if (!patientId) return;

      const url = `${
        import.meta.env.VITE_BASE_URL
      }/api/patients/get/${patientId}`;
      const finalUrl = prescriptionId
        ? `${url}?prescriptionId=${prescriptionId}`
        : url;

      try {
        const response = await axios.get(finalUrl);
        const prescription = response.data?.prescriptions?.find(
          (prescription) => prescription._id === prescriptionId
        );

        if (prescription) {
          // Update states with the fetched data
          setMedicalHistory(prescription.medicalHistory || []);
          setChiefComplain(prescription.chiefComplain || []);
          setOnExamination(prescription.onExamination || []);
          setInvestigation(prescription.investigation || []);
          setRadiography(prescription.radiography || []);
          setAdvices(prescription.advices || []);
          setMedications(prescription.medications || []);
        }
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
    };

    fetchPrescriptionData();
  }, [patientId, prescriptionId]);

  // Save updated prescription
  const saveUpdatedPrescription = async () => {
    setLoading(true);
    try {
      const updatedPrescription = {
        chiefComplain,
        onExamination,
        investigation,
        radiography,
        advices,
        medications,
        medicalHistory,
      };

      // API call to update the prescription
      await axios.put(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/patients/update/prescriptions/${patientId}/${prescriptionId}`,
        updatedPrescription
      );

      navigate(`/prescription/${patientId}/details/${prescriptionId}`);
    } catch (error) {
      console.error("Error updating prescription:", error);
      alert("Failed to update prescription");
    } finally {
      setLoading(false);
    }
  };

  const previewprescription = async () => {
    const updatedPrescription = {
      chiefComplain,
      onExamination,
      investigation,
      radiography,
      advices,
      medications,
      medicalHistory,
    };

    console.log("Prescriptions data:", updatedPrescription);
  };

  return (
    <>
      <TopHeaderMini />
      <div className="p-6 xl:p-6 flex gap-6 bg-[#EDF4F7]">
        <div className="py-2 px-8 xl:px-6 flex flex-col gap-6">
          <PatientMedicalHistory
            patientId={patientId}
            onMedicalHistoryChange={setMedicalHistory}
          />
          <ChiefComplain
            onChange={setChiefComplain}
            existingComplaints={chiefComplain}
          />
          <OnExamination
            onChange={setOnExamination}
            existingData={onExamination}
          />
          <Investigation
            onChange={setInvestigation}
            existingData={investigation}
          />
          <Radiography onChange={setRadiography} existingData={radiography} />
          <Advices onChange={setAdvices} existingAdvices={advices} />
          <Medications
            onChange={setMedications}
            existingMedications={medications}
          />
        </div>
      </div>
      <div className="border-t border-black/20 py-9 bg-[#EDF4F7] flex justify-end px-16">
        <button
          type="button"
          onClick={saveUpdatedPrescription}
          className="text-lg xl:text-xl font-semibold text-center text-white bg-custom-blue py-4 px-8 xl:px-10 rounded"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={previewprescription}
          className="text-lg xl:text-xl font-semibold text-center text-white bg-custom-blue py-4 px-8 xl:px-10 rounded"
        >
          Preview
        </button>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="loader animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            <p className="text-white text-lg mt-4">Saving...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPrescription;
