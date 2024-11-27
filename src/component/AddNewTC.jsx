import axios from "axios";
import React, { useState } from "react";
import { FiMinusCircle } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { useParams } from "react-router-dom";
import SaveTcCardPdf from "./SaveTcCardPdf";

const AddNewTC = ({ handleClose }) => {
  const { patientId } = useParams();
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    typeOfWork: "",
    tc: "",
    stepDone: "",
    nextAppointment: "",
    nextStep: "",
    payment: "",
    due: "",
    comment: "",
  });
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [tcCardId, setTcCardId] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add new entry to the list
  const handleAdd = () => {
    if (formData.typeOfWork.trim() === "") {
      alert("Please select the Type of Work.");
      return;
    }

    setEntries([...entries, formData]);
    setFormData({
      typeOfWork: "",
      tc: "",
      stepDone: "",
      nextAppointment: "",
      nextStep: "",
      payment: "",
      due: "",
      comment: "",
    });
  };

  // Remove an entry from the list
  const handleRemove = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const handleSave = async () => {
    if (entries.length === 0) {
      alert("Please add at least one entry.");
      return;
    }

    try {
      const payload = {
        tcCardDetails: entries,
        tccardPdf: null,
      };

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/patients/add/tccard/${patientId}`,
        payload
      );

      if (response.status === 200) {
        const tcCardId = response.data.tcCardId;
        setTcCardId(tcCardId);
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error saving TC Card:", error);
      alert("Failed to save TC Card. Please try again.");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close popup
  };
  return (
    <div className="xlg:p-8 p-4 flex flex-col gap-16 w-full">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#333333]">
          Create New TC Card
        </h1>
        <button onClick={handleClose}>
          <RxCrossCircled size={24} />
        </button>
      </div>

      {/* Form Inputs */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2 w-fit">
          <select
            name="typeOfWork"
            value={formData.typeOfWork}
            onChange={handleInputChange}
            className="w-[20%] h-[2.5rem] rounded boxsh px-2 outline-none"
          >
            <option value="">Type of Work</option>
            <option value="Tooth Extraction">Tooth Extraction</option>
            <option value="Consultation Charges">Consultation Charges</option>
            <option value=" Restoration of (Cervical / Occlusal / Proximal / Composite/GIC)">
              Restoration of (Cervical / Occlusal / Proximal / Composite/GIC)
            </option>
          </select>
          <input
            name="tc"
            value={formData.tc}
            onChange={handleInputChange}
            type="text"
            placeholder="TC"
            className="w-[20%] h-[2.5rem] rounded boxsh px-2 outline-none"
          />
          <input
            name="stepDone"
            value={formData.stepDone}
            onChange={handleInputChange}
            type="text"
            placeholder="Step Done"
            className="w-[15%] h-[2.5rem] rounded boxsh px-2 outline-none"
          />
          <input
            name="nextAppointment"
            value={formData.nextAppointment}
            onChange={handleInputChange}
            type="date"
            placeholder="Next Appointment"
            className="w-[10%] h-[2.5rem] rounded boxsh px-2 outline-none"
          />
          <input
            name="nextStep"
            value={formData.nextStep}
            onChange={handleInputChange}
            type="text"
            placeholder="Next Step"
            className="w-[10%] h-[2.5rem] rounded boxsh px-2 outline-none"
          />
          <input
            name="payment"
            value={formData.payment}
            onChange={handleInputChange}
            type="text"
            placeholder="Payment"
            className="w-[10%] h-[2.5rem] rounded boxsh px-2 outline-none"
          />
          <input
            name="due"
            value={formData.due}
            onChange={handleInputChange}
            type="text"
            placeholder="Due"
            className="w-[10%] h-[2.5rem] rounded boxsh px-2 outline-none"
          />
          <input
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            type="text"
            placeholder="Comment"
            className="w-[10%] h-[2.5rem] rounded boxsh px-2 outline-none"
          />
          <button
            onClick={handleAdd}
            className="w-[5%] text-custom-green text-2xl px-2 font-semibold"
          >
            <GoPlusCircle />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="flex flex-row  border-b border-[#00000033] text-[#888888] text-base  gap-2"
            >
              <div className="w-[20%] px-2">{entry.typeOfWork}</div>
              <div className="w-[20%]  px-2">{entry.tc}</div>
              <div className="w-[15%]  px-2">{entry.stepDone}</div>
              <div className="w-[10%]  px-2">{entry.nextAppointment}</div>
              <div className="w-[10%]  px-2">{entry.nextStep}</div>

              <div className="w-[10%]  px-2">{entry.payment}</div>
              <div className="w-[10%]  px-2">{entry.due}</div>
              <div className="w-[10%]  px-2">{entry.comment}</div>
              <div className="w-[5%]  px-2">
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-500 text-2xl"
                >
                  <FiMinusCircle />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end items-end ">
          <button
            onClick={handleSave}
            className="px-8 h-[2.5rem] flex justify-center items-center bg-custom-blue rounded text-white text-lg font-medium "
          >
            Save
          </button>
        </div>
      </div>

      {showPopup && tcCardId && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button onClick={handleClosePopup} className="close-popup-btn">
              Close
            </button>
            <SaveTcCardPdf tcCardId={tcCardId} patientId={patientId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewTC;
