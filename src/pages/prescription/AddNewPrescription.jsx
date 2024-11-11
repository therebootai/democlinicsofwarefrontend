import React, { useState } from "react";
import TopHeaderMini from "../../component/TopHeaderMini";

import { Link, useNavigate, useParams } from "react-router-dom";

import PatientMedicalHistory from "../../component/prescription/PatientMedicalHistory";

import Medications from "../../component/prescription/Medications";

import Advices from "../../component/prescription/Advices";
import ChiefComplain from "../../component/prescription/ChiefComplain";
import OnExamination from "../../component/prescription/OnExamination";
import Investigation from "../../component/prescription/Investigation";
import Radiography from "../../component/prescription/Radiography";
import axios from "axios";

const AddNewPrescription = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [chiefComplainData, setChiefComplainData] = useState([]);
  const [onExaminationData, setOnExaminationData] = useState([]);
  const [investigationData, setInvestigationData] = useState([]);
  const [radiographyData, setRadiographyData] = useState([]);
  const [adviceData, setAdviceData] = useState([]);
  const [medicationData, setMedicationData] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [medicalHistoryChanged, setMedicalHistoryChanged] = useState(false);
  const [prescriptionChanged, setPrescriptionChanged] = useState(false);

  const handleMedicalHistoryChange = (updatedMedicalHistory) => {
    setMedicalHistory(updatedMedicalHistory);
    setMedicalHistoryChanged(true);
  };

  const handlePrescriptionDataChange = (dataUpdater, data) => {
    dataUpdater();

    // Check if any prescription data exists; set prescriptionChanged to true only if there is data
    const hasPrescriptionData =
      chiefComplainData.length > 0 ||
      onExaminationData.length > 0 ||
      investigationData.length > 0 ||
      radiographyData.length > 0 ||
      adviceData.length > 0 ||
      medicationData.length > 0;

    if (hasPrescriptionData) {
      setPrescriptionChanged(true);
    }
  };

  const finishPrescription = async () => {
    setLoading(true);

    const updatedMedicalHistory = medicalHistory
      .filter((item) => item.checked)
      .map(({ checked, medicalHistoryMedicine, ...rest }) => ({
        ...rest,
        medicalHistoryMedicine:
          medicalHistoryMedicine.length > 0 ? medicalHistoryMedicine : [],
      }));

    try {
      // Update medical history if changed
      if (medicalHistoryChanged) {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/patients/update/${patientId}`,
          { medicalHistory: updatedMedicalHistory },
          { headers: { "Content-Type": "application/json" } }
        );
      }

      // Proceed with prescription save only if prescriptionChanged is true and data exists
      if (prescriptionChanged) {
        const prescription = {
          chiefComplain: chiefComplainData.length
            ? chiefComplainData
            : undefined,
          onExamination: onExaminationData.length
            ? onExaminationData
            : undefined,
          investigation: investigationData.length
            ? investigationData
            : undefined,
          radiography: radiographyData.length ? radiographyData : undefined,
          advices: adviceData.length ? adviceData : undefined,
          medications: medicationData.length ? medicationData : undefined,
        };

        // Filter out empty fields
        const cleanedPrescription = Object.fromEntries(
          Object.entries(prescription).filter(([_, v]) => v !== undefined)
        );

        // Only save if there is actual data in the prescription
        if (Object.keys(cleanedPrescription).length > 0) {
          const response = await axios.put(
            `${
              import.meta.env.VITE_BASE_URL
            }/api/patients/update/prescriptions/${patientId}`,
            { prescriptions: [cleanedPrescription] }
          );

          const savedPrescriptionId = response.data.prescriptionIds[0];
          navigate(`/prescription/${patientId}/details/${savedPrescriptionId}`);
        } else {
          alert("No prescription data to save.");
        }
      } else if (medicalHistoryChanged && !prescriptionChanged) {
        alert("Only medical history was updated.");
      }
    } catch (error) {
      console.error("Error saving prescription:", error);
      alert("Failed to save prescription");
    } finally {
      setLoading(false);
    }
  };

  const previewprescription = async () => {
    const cleanedChiefComplainData = chiefComplainData.map((item) => ({
      chiefComplainName: item.chiefComplainName,
    }));

    const cleanedMedicalHistoryData = medicalHistory.map((item) => ({
      medicalHistoryName: item.medicalHistoryName,
      duration: item.duration,
      medicalHistoryMedicine: item.medicalHistoryMedicine,
      checked: item.checked,
    }));

    const prescription = {
      chiefComplain: cleanedChiefComplainData,
      onExamination: onExaminationData,
      investigation: investigationData,
      radiography: radiographyData,
      advices: adviceData,
      medications: medicationData,
      medicalHistory: cleanedMedicalHistoryData,
    };

    console.log("Prescriptions data:", prescription);
  };
  return (
    <>
      <TopHeaderMini />
      <div className="p-6 xl:p-6 flex gap-6 bg-[#EDF4F7]">
        <div className="py-2 px-8 xl:px-6 flex flex-col gap-6">
          <PatientMedicalHistory
            patientId={patientId}
            onMedicalHistoryChange={handleMedicalHistoryChange}
          />
          <ChiefComplain
            onChange={(data) =>
              handlePrescriptionDataChange(() => setChiefComplainData(data))
            }
          />
          <OnExamination
            onChange={(data) =>
              handlePrescriptionDataChange(() => setOnExaminationData(data))
            }
          />
          <Investigation
            onChange={(data) =>
              handlePrescriptionDataChange(() => setInvestigationData(data))
            }
          />
          <Radiography
            onChange={(data) =>
              handlePrescriptionDataChange(() => setRadiographyData(data))
            }
          />
          <Advices
            onChange={(data) =>
              handlePrescriptionDataChange(() => setAdviceData(data))
            }
          />
          <Medications
            onChange={(data) =>
              handlePrescriptionDataChange(() => setMedicationData(data))
            }
          />
        </div>
      </div>
      <div className="border-t border-black/20 py-9 bg-[#EDF4F7] flex justify-between">
        <div className="pl-16 xlg:pl-20">
          <button
            type="button"
            className="text-lg xl:text-xl font-semibold text-center text-white bg-custom-blue py-4 px-8 xl:px-10 rounded"
          >
            Clear
          </button>
        </div>
        <div className="pr-16 xlg:pr-20 flex gap-9">
          <Link
            to={"/prescription/:id/details"}
            type="button"
            className="text-lg xl:text-xl font-semibold text-center text-white bg-custom-blue py-4 px-8 xl:px-10 rounded"
          >
            Preview
          </Link>
          <button
            type="button"
            onClick={previewprescription}
            className="text-lg xl:text-xl font-semibold text-center text-white bg-custom-blue py-4 px-8 xl:px-10 rounded"
          >
            Print
          </button>
          <button
            type="button"
            onClick={finishPrescription}
            className="text-lg xl:text-xl font-semibold text-center text-white bg-custom-blue py-4 px-8 xl:px-10 rounded"
          >
            Finish Prescription
          </button>
        </div>
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

export default AddNewPrescription;
