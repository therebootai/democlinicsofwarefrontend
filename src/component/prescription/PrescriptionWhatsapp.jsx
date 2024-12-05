import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrescriptionWhatsapp = ({ patientId, prescriptionId, closeModal }) => {
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [prescriptionPdfUrl, setPrescriptionPdfUrl] = useState("");

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      try {
        const url = `${
          import.meta.env.VITE_BASE_URL
        }/api/patients/get/${patientId}`;
        const finalUrl = prescriptionId
          ? `${url}?prescriptionId=${prescriptionId}`
          : url;

        const response = await axios.get(finalUrl);
        setPrescriptionData(response.data);

        const prescription = response.data.prescriptions[0];
        setPrescriptionPdfUrl(prescription.prescriptionPdf.secure_url);
        setPhoneNumber(response.data.mobileNumber);
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
    };

    fetchPrescriptionData();
  }, [patientId, prescriptionId]);

  if (!prescriptionData) {
    return <div>Loading...</div>;
  }

  const handleSendPrescription = async () => {
    try {
      const formattedPhoneNumber = phoneNumber.startsWith("91")
        ? phoneNumber
        : "91" + phoneNumber;

      const payload = {
        "auth-key": "your-auth-key",
        "app-key": "your-app-key",
        destination_number: formattedPhoneNumber,
        template_id: "your-template-id",
        device_id: "your-device-id",
        variables: [],
        media: prescriptionPdfUrl,
      };

      const response = await axios.post(
        "https://web.wabridge.com/api/createmessage",
        payload
      );

      if (response.data.status === true) {
        toast.success("Prescription sent successfully!", {
          position: "bottom-center",
          icon: "✅",
        });
        closeModal();
      } else {
        toast.error("Failed to send prescription.", {
          position: "bottom-center",
          icon: "❌",
        });
      }
    } catch (error) {
      console.error("Error sending prescription:", error);
      toast.error("An error occurred while sending the prescription.", {
        position: "bottom-center",
        icon: "❌",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[50%]">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Send Prescription via WhatsApp
          </h2>
          <button onClick={closeModal} className="text-custom-orange text-2xl">
            <IoMdCloseCircleOutline />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-2">
          {prescriptionPdfUrl && (
            <iframe
              src={prescriptionPdfUrl}
              width="100%"
              title="Prescription PDF"
              className="border-none h-[20rem]"
            ></iframe>
          )}

          <p className="text-xl font-medium text-custom-blue">
            {prescriptionData.patientName}
          </p>
          <p className="text-xl font-medium text-custom-blue">{phoneNumber}</p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleSendPrescription}
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
          >
            Send Prescription
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PrescriptionWhatsapp;
