import React, { useState } from "react";
import axios from "axios";
import { RxCrossCircled } from "react-icons/rx";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const PatientDocumentAdd = ({ patient, handleClose, onUpdate }) => {
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!patient || !patient.patientId) {
      setError("Patient information is missing.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("patientId", patient.patientId);
    formData.append("title", documentTitle);
    formData.append("file", documentFile);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/patients/add/patient/${
          patient.patientId
        }/document`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (onUpdate) onUpdate(response.data.data);
      handleClose();
    } catch (err) {
      setError("Error adding document. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    if (!patient || !documentId) {
      setError("Invalid document or patient ID.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/patients//delete/patient/${
          patient.patientId
        }/document/${documentId}`
      );

      if (response.status === 200) {
        const updatedDocuments = patient.patientDocuments.filter(
          (doc) => doc.documentId !== documentId
        );
        patient.patientDocuments = updatedDocuments;
        if (onUpdate) onUpdate(patient);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      setError("Error deleting document. Please try again.");
    }
  };

  return (
    <div className="xlg:p-8 p-4 flex flex-col gap-16">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#333333]">
          Add Document for {patient?.patientName || "Unknown Patient"}
        </h1>
        <button type="button" onClick={handleClose}>
          <RxCrossCircled size={24} />
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <input
              type="text"
              value={documentTitle}
              className="priority-input"
              onChange={(e) => setDocumentTitle(e.target.value)}
              required
            />
          </div>
          <div className="priority-input flex items-center relative">
            <input
              type="file"
              onChange={(e) => setDocumentFile(e.target.files[0])}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className=" h-[2.5rem] transition-colors duration-300 ease-in-out boxsh px-6 flex w-fit justify-center items-center bg-white rounded-md text-base hover:bg-[#FA5503] hover:text-white text-[#FA5503] font-medium"
        >
          {loading ? "Uploading..." : "Add Document"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#333333]">
          Existing Documents
        </h2>
        {patient?.patientDocuments && (
          <div className="document-list mb-8">
            <div className="grid grid-cols-2 gap-4">
              {patient.patientDocuments.map((doc) => (
                <div
                  key={doc.documentId}
                  className="document-item  p-2 rounded shadow"
                >
                  {doc.documentFile.endsWith(".pdf") ? (
                    <button
                      onClick={() => window.open(doc.documentFile, "_blank")}
                    >
                      <iframe
                        src={doc.documentFile}
                        title={doc.documentTitle}
                        className="w-full h-40 overflow-y-hidden"
                      ></iframe>
                    </button>
                  ) : (
                    <img
                      src={doc.documentFile}
                      alt={doc.documentTitle}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="flex justify-between items-center gap-4">
                    <p className="text-center font-medium ">
                      {doc.documentTitle}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open(doc.documentFile, "_blank")}
                        className="text-custom-green"
                      >
                        <FaExternalLinkAlt />
                      </button>
                      <button
                        onClick={() => handleDeleteDocument(doc.documentId)}
                        className=" text-custom-orange text-2xl"
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDocumentAdd;
