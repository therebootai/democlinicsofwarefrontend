import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const newMedicationTemplate = {
  medicineBrandName: "",
  medicineComposition: "",
  medicineStrength: "",
  dose: "",
  frequency: "",
  timing: "",
  duration: "",
  startFrom: "",
  instructions: "",
  qty: "",
  compositionOptions: [],
  strengthOptions: [],
  showBrandSuggestions: false,
  showCompositionSuggestions: false,
  showStrengthSuggestions: false,
  brandSuggestions: [],
};

const Medications = ({ onChange, existingMedications = [] }) => {
  const [medications, setMedications] = useState([
    { ...newMedicationTemplate },
  ]);

  const [suggestion, setSuggestion] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const formatFrequency = (value) => {
    value = value.replace(/[^01]/g, "").slice(0, 4);

    // Insert hyphens after each character
    value = value
      .split("")
      .map((char, idx) => (idx > 0 ? `-${char}` : char))
      .join("");

    return value;
  };

  useEffect(() => {
    if (
      Array.isArray(existingMedications) &&
      existingMedications.length > 0 &&
      existingMedications.some((item) => item.medicineBrandName) &&
      medications[0].medicineBrandName === ""
    ) {
      setMedications(
        existingMedications.map((med) => ({
          medicineBrandName: med.medicineBrandName || "",
          medicineComposition: med.medicineComposition || "",
          medicineStrength: med.medicineStrength || "",
          dose: med.medicineDose || "",
          frequency: med.medicineFrequency || "",
          timing: med.medicineTiming || "",
          duration: med.medicineDuration || "",
          startFrom: med.medicineStartfrom || "",
          instructions: med.medicineInstructions || "",
          qty: med.medicineQuantity || "",
          compositionOptions: [],
          strengthOptions: [],
          showBrandSuggestions: false,
          showCompositionSuggestions: false,
          showStrengthSuggestions: false,
          brandSuggestions: [],
        }))
      );
    }
  }, [existingMedications]);

  const suggestDuration = (input) => {
    input = input.toLowerCase();
    if (input.endsWith("d")) return `${input.replace(/\D/g, "")} Days`;
    if (input.endsWith("m")) return `${input.replace(/\D/g, "")} Months`;
    if (input.endsWith("y")) return `${input.replace(/\D/g, "")} Years`;
    if (/^\d+$/.test(input)) return `${input} Days`;
    return "";
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Tab" && suggestion) {
      event.preventDefault(); // Prevent the default tabbing behavior

      // Update the duration with the suggestion
      const updatedMedications = medications.map((med, i) =>
        i === index ? { ...med, duration: suggestion } : med
      );
      setMedications(updatedMedications);

      // Clear the suggestion after applying it
      setSuggestion("");
    }
  };

  const fetchSuggestions = async (query, index) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/medications/getdropdown`,
        { params: { query } }
      );
      setMedications((prev) =>
        prev.map((med, i) =>
          i === index
            ? {
                ...med,
                brandSuggestions: response.data.map((item) => ({
                  displayText: `${item.medicineBrandName} - ${item.medicineComposition} - ${item.medicineStrength}`,
                  ...item,
                })),
                showBrandSuggestions: true,
              }
            : med
        )
      );
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const fetchRandomSuggestions = async (index) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/medications/getdropdown/random`,
        { params: { limit: 5 } }
      );
      setMedications((prev) =>
        prev.map((med, i) =>
          i === index
            ? {
                ...med,
                brandSuggestions: response.data.map((item) => ({
                  displayText: `${item.medicineBrandName} - ${item.medicineComposition} - ${item.medicineStrength}`,
                  ...item,
                })),
                showBrandSuggestions: true,
              }
            : med
        )
      );
    } catch (error) {
      console.error("Error fetching random suggestions:", error);
    }
  };

  useEffect(() => {
    if (typeof onChange === "function") {
      const filteredData = medications.map((field) => ({
        medicineBrandName: field.medicineBrandName,
        medicineComposition: field.medicineComposition,
        medicineStrength: field.medicineStrength,
        medicineDose: field.dose,
        medicineFrequency: field.frequency,
        medicineTiming: field.timing,
        medicineDuration: field.duration,
        medicineStartfrom: field.startFrom,
        medicineInstructions: field.instructions,
        medicineQuantity: field.qty,
      }));
      onChange(filteredData);
    }
  }, [medications]);

  const handleAddField = () => {
    // Add a blank template entry to medications
    setMedications((prev) => [...prev, { ...newMedicationTemplate }]);
  };

  const handleRemoveField = (index) => {
    if (medications.length > 1) {
      setMedications(medications.filter((_, i) => i !== index));
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;

    if (name === "frequency") {
      const formattedValue = formatFrequency(value);
      setMedications((prev) =>
        prev.map((med, i) =>
          i === index ? { ...med, frequency: formattedValue } : med
        )
      );
    } else {
      setMedications((prev) =>
        prev.map((med, i) => (i === index ? { ...med, [name]: value } : med))
      );
    }

    if (name === "medicineBrandName") {
      if (value) {
        fetchSuggestions(value, index); // Fetch suggestions based on typed value
      } else {
        fetchRandomSuggestions(index); // Show random suggestions if input is cleared
      }
    } else if (name === "duration") {
      const suggestedText = suggestDuration(value);
      setSuggestion(suggestedText);
    }
  };

  const handleSelectSuggestion = (index, suggestion) => {
    setMedications((prev) =>
      prev.map((med, i) =>
        i === index
          ? {
              ...med,
              medicineBrandName: suggestion.medicineBrandName,
              medicineComposition: suggestion.medicineComposition,
              medicineStrength: suggestion.medicineStrength,
              showBrandSuggestions: false,
            }
          : med
      )
    );
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-9">
      <h1 className="text-custom-gray text-lg xl:text-xl font-semibold py-4 border-b border-black/20">
        Medications
      </h1>
      {medications.map((med, index) => (
        <div key={index} className="flex gap-5 pb-9">
          <div className="flex flex-col w-[90%] gap-2">
            <div className="flex flex-row gap-4 w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  name="medicineBrandName"
                  autoComplete="off"
                  placeholder="Search or select medicine"
                  value={
                    isEditing ||
                    (!med.medicineBrandName &&
                      !med.medicineComposition &&
                      !med.medicineStrength)
                      ? med.medicineBrandName || ""
                      : `${med.medicineBrandName} - ${med.medicineComposition} - ${med.medicineStrength}`
                  }
                  onChange={(e) => handleInputChange(index, e)}
                  onFocus={() => {
                    setIsEditing(true); // Enter edit mode
                    fetchRandomSuggestions(index);
                  }}
                  onBlur={() => {
                    setIsEditing(false);
                    setTimeout(
                      () =>
                        setMedications((prev) =>
                          prev.map((med, i) =>
                            i === index
                              ? { ...med, showBrandSuggestions: false }
                              : med
                          )
                        ),
                      150
                    );
                  }}
                  className="bg-white rounded py-4 w-full px-6 outline-none text-lg xl:text-xl"
                />

                {med.showBrandSuggestions &&
                  med.brandSuggestions.length > 0 && (
                    <div className="absolute bg-white w-[90%] z-10 shadow-lg rounded-md max-h-60 overflow-auto">
                      {med.brandSuggestions.map((suggestion, i) => (
                        <div
                          key={i}
                          onMouseDown={() =>
                            handleSelectSuggestion(index, suggestion)
                          }
                          className="p-2 cursor-pointer hover:bg-gray-100"
                        >
                          {suggestion.displayText}
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              <select
                name="dose"
                value={med.dose}
                onChange={(e) => handleInputChange(index, e)}
                className="bg-white rounded py-4 px-6 outline-none text-lg xl:text-xl"
              >
                <option value="">Choose Dose</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <input
                type="text"
                name="frequency"
                placeholder="Frequency"
                value={med.frequency}
                onChange={(e) => {
                  const formattedValue = formatFrequency(e.target.value);
                  handleInputChange(index, {
                    target: { name: "frequency", value: formattedValue },
                  });
                }}
                className="bg-white rounded py-4 px-6 outline-none text-lg xl:text-xl"
              />
              <select
                name="timing"
                value={med.timing}
                onChange={(e) => handleInputChange(index, e)}
                className="bg-white rounded py-4 px-6 outline-none text-lg xl:text-xl"
              >
                <option value="">Select Timing</option>
                <option value="After Meal">After Meal</option>
                <option value="Before Meal">Before Meal</option>
              </select>
            </div>
            <div className="flex flex-row gap-4">
              <div className="relative w-full">
                <input
                  type="text"
                  name="duration"
                  placeholder="Duration"
                  value={med.duration}
                  onChange={(e) => handleInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="bg-white rounded py-4 px-6 w-full outline-none text-lg xl:text-xl"
                />
                {suggestion && (
                  <span
                    className="absolute top-[6px] left-[32px] py-3 px-5 pointer-events-none text-gray-400"
                    style={{
                      display: med.duration ? "inline" : "none",
                      color: "gray",
                    }}
                  >
                    {suggestion.slice(med.duration.length)}
                  </span>
                )}
              </div>
              <input
                type="date"
                name="startFrom"
                placeholder="Start From"
                value={med.startFrom}
                onChange={(e) => handleInputChange(index, e)}
                className="bg-white rounded py-4 px-6 outline-none text-lg xl:text-xl"
                min={new Date().toISOString().split("T")[0]} // Sets minimum date to today
              />
              <input
                type="text"
                name="instructions"
                placeholder="Instructions"
                value={med.instructions}
                onChange={(e) => handleInputChange(index, e)}
                className="bg-white rounded py-4 w-full px-6 outline-none text-lg xl:text-xl"
              />
              <input
                type="text"
                name="qty"
                placeholder="Qty"
                value={med.qty}
                onChange={(e) => handleInputChange(index, e)}
                className="bg-white rounded py-4 w-full px-6 outline-none text-lg xl:text-xl"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 w-[10%] justify-between">
            <button
              type="button"
              className="text-[#E40000] inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base min-w-[6vmax] flex-1"
              onClick={() => handleRemoveField(index)}
              disabled={medications.length === 1}
            >
              <CiCircleMinus />
            </button>
            <button
              type="button"
              className="text-custom-green inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base min-w-[6vmax] flex-1"
              onClick={handleAddField}
            >
              <CiCirclePlus />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Medications;
