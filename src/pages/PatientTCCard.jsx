import React, { useEffect, useRef, useState } from "react";
import AdminDashboardTemplate from "../template/AdminDashboardTemplate";
import Topheader from "../component/Topheader";
import { GoPlusCircle } from "react-icons/go";
import AddNewTC from "../component/AddNewTC";
import { useParams } from "react-router-dom"; // Import to get the patientId from URL params
import axios from "axios"; // Make sure axios is installed
import { IoPrintSharp } from "react-icons/io5";
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEdit } from "react-icons/fa";
import EditTcCard from "../component/EditTcCard";

const PatientTCCard = () => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [patientData, setPatientData] = useState(null); // Store the fetched patient data
  const modalRef = useRef(null);
  const { patientId } = useParams();
  const [selectedTcCard, setSelectedTcCard] = useState(null);
  const [mode, setMode] = useState("add");

  // Fetch patient data from the API when the component mounts
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/patients/get/${patientId}`)
      .then((response) => {
        setPatientData(response.data); // Store patient data
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
      });
  }, [patientId]);

  const handleAddNewClick = () => {
    setSelectedTcCard(null); // Reset for new TC card
    setMode("add");
    setIsModalShow(true);
  };

  // Open the modal to edit an existing TC card
  const handleEditClick = (tcCard) => {
    setSelectedTcCard(tcCard); // Set the selected TC card data for editing
    setMode("edit");
    setIsModalShow(true);
  };

  const handleClose = () => {
    setIsModalShow(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalShow]);

  return (
    <AdminDashboardTemplate>
      <Topheader />
      <div className="flex flex-col gap-6 pt-8">
        <button
          onClick={handleAddNewClick}
          className="flex w-fit items-center bg-custom-blue hover:bg-sky-600 gap-3 rounded px-2 xlg:px-3 h-[2.5rem] text-xs xl:text-base xlg:text-sm text-[#F5F5F5] transition-colors duration-300 ease-in-out"
        >
          <GoPlusCircle />
          <h3>Add New TC</h3>
        </button>
      </div>

      {/* Display Patient TC Cards */}
      <div className="mt-8">
        {patientData &&
        patientData.patientTcCard &&
        patientData.patientTcCard.length > 0 ? (
          <div>
            <h3 className="text-xl font-bold">Patient TC Cards</h3>
            <div className=" grid grid-cols-3 gap-6">
              {patientData.patientTcCard.map((tcCard, index) => {
                if (tcCard.tccardPdf && tcCard.tccardPdf.secure_url) {
                  return (
                    <div key={index} className="flex flex-col gap-2">
                      <div className="relative p-2 h-full flex flex-col items-center justify-center bg-white boxsh rounded">
                        <iframe
                          src={tcCard.tccardPdf.secure_url}
                          title={`TC Card ${index + 1}`}
                          className="!w-full !h-[15rem] no-scrollbar"
                        ></iframe>
                      </div>
                      <div className="flex flex-row gap-2">
                        <button className="flex flex-row gap-1 rounded items-center h-[2rem] justify-center px-2 bg-custom-blue text-white text-sm">
                          <IoPrintSharp />
                          Print
                        </button>
                        <button className="flex flex-row gap-1 rounded items-center h-[2rem] justify-center px-2 bg-custom-blue text-white text-sm">
                          <LiaDownloadSolid />
                          Download
                        </button>{" "}
                        <button
                          onClick={() => handleEditClick(tcCard.tcCardId)}
                          className="flex flex-row gap-1 rounded items-center h-[2rem] justify-center px-2 bg-custom-blue text-white text-sm"
                        >
                          <FaEdit />
                          Edit
                        </button>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ) : (
          <p>No TC Cards available.</p>
        )}
      </div>

      <div
        ref={modalRef}
        className={`fixed top-0 right-0 h-screen w-[80%] xl:w-[75%] overflow-scroll z-[100] custom-scroll bg-[#EDF4F7] shadow-lg transform transition-transform duration-300 ease-in-out ${
          isModalShow ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {mode === "add" ? (
          <AddNewTC handleClose={handleClose} />
        ) : (
          <EditTcCard handleClose={handleClose} tcCardId={selectedTcCard} />
        )}
      </div>
    </AdminDashboardTemplate>
  );
};

export default PatientTCCard;
