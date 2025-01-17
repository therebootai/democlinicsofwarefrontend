import React, { useState } from "react";
import axios from "axios";
import { FiMinusCircle } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { useParams } from "react-router-dom";
import DentalChartDesign from "./DentalChartDesign";
import { CiCirclePlus } from "react-icons/ci";
import SaveTcCardPdf from "./SaveTcCardPdf";

const AddNewTC = ({ handleClose, fetchTCCards }) => {
  const { patientId } = useParams();
  const [form1Data, setForm1Data] = useState({ typeOfWork: "", tcamount: "" });
  const [form2Data, setForm2Data] = useState({
    stepDone: "",
    nextAppointment: "",
    nextStep: "",
    payment: "",
    due: "",
    paymentMethod: "",
    comment: "",
  });
  const [form1Entries, setForm1Entries] = useState([]);
  const [form2Entries, setForm2Entries] = useState([]);
  const [showDentalChart, setShowDentalChart] = useState(false);
  const [selectedDentalValues, setSelectedDentalValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [tcCardId, setTcCardId] = useState(null);

  const handleForm1Change = (e) => {
    const { name, value } = e.target;
    setForm1Data({ ...form1Data, [name]: value });
  };

  const handleForm2Change = (e) => {
    const { name, value } = e.target;
    setForm2Data({ ...form2Data, [name]: value });
  };

  const addForm1Entry = () => {
    if (!form1Data.typeOfWork || !form1Data.tcamount) {
      alert("Please fill all fields in Form 1");
      return;
    }
    setForm1Entries([
      ...form1Entries,
      { ...form1Data, dentalChart: selectedDentalValues },
    ]);
    setForm1Data({ typeOfWork: "", tcamount: "" });
    setSelectedDentalValues([]);
  };

  const addForm2Entry = () => {
    if (!form2Data.stepDone) {
      alert("Please fill all fields in Form 2");
      return;
    }
    setForm2Entries([...form2Entries, form2Data]);
    setForm2Data({
      stepDone: "",
      nextAppointment: "",
      nextStep: "",
      payment: "",
      due: "",
      paymentMethod: "",
      comment: "",
    });
  };

  const removeForm1Entry = (index) => {
    setForm1Entries(form1Entries.filter((_, i) => i !== index));
  };

  const removeForm2Entry = (index) => {
    setForm2Entries(form2Entries.filter((_, i) => i !== index));
  };

  const handleDentalChart = () => {
    setShowDentalChart(true);
  };

  const handleCloseDentalChart = () => {
    setShowDentalChart(false);
  };

  const handleSave = async () => {
    if (form1Entries.length === 0 || form2Entries.length === 0) {
      alert("Please add entries to both forms before saving");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/patients/add/tccard/${patientId}`,
        {
          tcTypeOfWork: form1Entries,
          tcCardDetails: form2Entries,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data && response.data.tcCardId) {
        const tcCardId = response.data.tcCardId;
        setTcCardId(tcCardId);
        setShowPopup(true);
        setForm1Entries([]);
        setForm2Entries([]);
        fetchTCCards();
      } else {
        alert("Failed to create TC Card. Please try again.");
      }
    } catch (error) {
      console.error("Error saving TC Card:", error);
      alert("Failed to save TC Card. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close popup
  };

  return (
    <div className="p-8 flex flex-col gap-16 w-full relative">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#333333]">
          Add Types Work
        </h1>
        <button onClick={handleClose}>
          <RxCrossCircled size={24} />
        </button>
      </div>

      {/* Form 1 */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold"> Add Work Type</h2>
        <div className="flex flex-row gap-4">
          <input
            name="typeOfWork"
            value={form1Data.typeOfWork}
            onChange={handleForm1Change}
            type="text"
            placeholder="Type Of Work"
            className="w-[50%] h-[2.5rem] rounded px-2 outline-none"
          />
          <input
            name="tcamount"
            value={form1Data.tcamount}
            onChange={handleForm1Change}
            type="text"
            placeholder="TC Amount"
            className="w-[25%] h-[2.5rem] rounded px-2 outline-none"
          />
          <button
            onClick={handleDentalChart}
            className="w-[20%] h-[2.5rem] flex items-center justify-center bg-white rounded"
          >
            <CiCirclePlus /> Dental Chart
          </button>
          <button
            onClick={addForm1Entry}
            className="w-[5%] text-green-500 text-2xl"
          >
            <GoPlusCircle />
          </button>
        </div>
        <div
          className={` transform transition-transform duration-300 ease-in-out ${
            showDentalChart ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {showDentalChart && (
            <DentalChartDesign
              handleClose={handleCloseDentalChart}
              onSelect={setSelectedDentalValues}
              selectedValues={selectedDentalValues}
            />
          )}
        </div>
        <div>
          {form1Entries.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-[50%]">{entry.typeOfWork}</span>
              <span className="w-[25%]">{entry.tcamount}</span>
              <span className="w-[20%]">{entry.dentalChart.join(", ")}</span>
              <button onClick={() => removeForm1Entry(index)}>
                <FiMinusCircle className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Form 2 */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Add Appointment Details</h2>
        <div className="flex flex-row gap-2">
          <input
            name="stepDone"
            value={form2Data.stepDone}
            onChange={handleForm2Change}
            type="text"
            placeholder="Step Done"
            className="w-[20%] h-[2.5rem] rounded px-2 outline-none"
          />
          <input
            name="nextAppointment"
            value={form2Data.nextAppointment}
            onChange={handleForm2Change}
            type="date"
            className="w-[20%] h-[2.5rem] rounded px-2 outline-none"
          />
          <input
            name="nextStep"
            value={form2Data.nextStep}
            onChange={handleForm2Change}
            type="text"
            placeholder="Next Step"
            className="w-[10%] h-[2.5rem] rounded px-2 outline-none"
          />
          <input
            name="payment"
            value={form2Data.payment}
            onChange={handleForm2Change}
            type="text"
            placeholder="Payment"
            className="w-[10%] h-[2.5rem] rounded px-2 outline-none"
          />
          <input
            name="due"
            value={form2Data.due}
            onChange={handleForm2Change}
            type="text"
            placeholder="Due"
            className="w-[10%] h-[2.5rem] rounded px-2 outline-none"
          />
          <select
            name="paymentMethod"
            value={form2Data.paymentMethod}
            onChange={handleForm2Change}
            className="w-[10%] h-[2.5rem] rounded px-2 outline-none"
          >
            <option value="">Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Online">Online</option>
          </select>
          <input
            name="comment"
            value={form2Data.comment}
            onChange={handleForm2Change}
            type="text"
            placeholder="Comment"
            className="w-[15%] h-[2.5rem] rounded px-2 outline-none"
          />
          <button
            onClick={addForm2Entry}
            className="w-[5%] text-green-500 text-2xl"
          >
            <GoPlusCircle />
          </button>
        </div>
        <div>
          {form2Entries.map((entry, index) => (
            <div key={index} className="flex  gap-2">
              <span className="w-[20%] ">{entry.stepDone}</span>
              <span className="w-[20%]">{entry.nextAppointment}</span>
              <span className="w-[10%]">{entry.nextStep}</span>
              <span className="w-[10%]">{entry.payment}</span>
              <span className="w-[10%]">{entry.due}</span>
              <span className="w-[10%]">{entry.paymentMethod}</span>
              <span className="w-[15%]">{entry.comment}</span>
              <button
                className="w-[5%]"
                onClick={() => removeForm2Entry(index)}
              >
                <FiMinusCircle className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-8 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
      {showPopup && tcCardId && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button
              onClick={handleClosePopup}
              className="close-popup-btn fixed left-3 inset-0 top-5 w-fit h-fit"
            >
              Close
            </button>
            <SaveTcCardPdf
              tcCardId={tcCardId}
              patientId={patientId}
              fetchTCCards={fetchTCCards}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewTC;
