import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import axios from "axios";

const OnExamination = ({ onChange, existingData = [] }) => {
  const [fields, setFields] = useState([
    {
      onExamination: "",
      area: [],
      notes: "",
      searchTerm: "",
      availableAreas: [],
      showSuggestions: false,
      searchResults: [],
      showAreaDropdown: false,
    },
  ]);

  const fetchRandomSuggestions = async (index) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/onexamination/getdropdown/random`,
        { params: { limit: 5 } }
      );
      updateField(index, {
        searchResults: Array.isArray(response.data) ? response.data : [],
      });
    } catch (error) {
      console.error("Error fetching random suggestions:", error);
      updateField(index, { searchResults: [] });
    }
  };

  const fetchSuggestions = async (index) => {
    const searchTerm = fields[index].searchTerm;
    if (searchTerm) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/onexamination/getdropdown`,
          { params: { query: searchTerm } }
        );
        updateField(index, {
          searchResults: Array.isArray(response.data) ? response.data : [],
        });
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        updateField(index, { searchResults: [] });
      }
    }
  };

  useEffect(() => {
    if (
      Array.isArray(existingData) &&
      existingData.length > 0 &&
      existingData.some((examination) => examination.onExaminationName) &&
      fields[0].onExamination === ""
    ) {
      const initialFields = existingData.map((examination) => ({
        onExamination: examination.onExaminationName || "",
        area: examination.onExaminationArea || [],
        notes: examination.onExaminationAdditionalNotes || "",
        searchTerm: examination.onExaminationName || "",
        searchResults: [],
        showSuggestions: false,
      }));
      setFields(initialFields);
    }
  }, [existingData]);

  const updateField = (index, updates) => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, ...updates } : field
      )
    );
  };

  useEffect(() => {
    if (typeof onChange === "function") {
      const filteredData = fields.map((field) => ({
        onExaminationName: field.onExamination,
        onExaminationArea: field.area,
        onExaminationAdditionalNotes: field.notes,
      }));
      onChange(filteredData);
    }
  }, [fields]);

  const handleAddOnExamination = async (index) => {
    const { searchTerm, area } = fields[index];
    const existing = fields.some((field) => field.onExamination === searchTerm);
    if (existing) {
      alert("On Examination already exists.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/onexamination/create`,
        { onExaminationName: searchTerm, onExaminationArea: area }
      );

      if (response.status === 201) {
        alert("On Examination Created Successfully");
        updateField(index, {
          onExamination: searchTerm,
          availableAreas: [],
          area: [],
        });
      }
    } catch (error) {
      console.error("Error creating On Examination:", error);
    }
  };

  const updateOnExaminationAreas = async (index, areas) => {
    const searchTerm = fields[index].searchTerm;
    try {
      await axios.put(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/onexamination/update/${searchTerm}`,
        { onExaminationArea: areas }
      );
      updateField(index, { area: areas });
    } catch (error) {
      console.error("Error updating On Examination areas:", error);
    }
  };

  const handleAreaInputKeyPress = (event, index) => {
    if (event.key === "Enter" && event.target.value) {
      handleAddArea(event.target.value, index);
      event.target.value = ""; // Clear input
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    updateField(index, { [name]: value });
  };

  const handleSelectSuggestion = (selectedItem, index) => {
    updateField(index, {
      onExamination: selectedItem.onExaminationName,
      availableAreas: selectedItem.onExaminationArea,
      searchTerm: selectedItem.onExaminationName,
      searchResults: [],
      showSuggestions: false,
    });
  };

  const handleAddArea = (area, index) => {
    if (area && !fields[index].area.includes(area)) {
      const updatedAreas = [...fields[index].area, area];
      updateField(index, { area: updatedAreas });
      updateOnExaminationAreas(index, updatedAreas); // Update backend with new areas
    }
  };

  const handleRemoveArea = (areaToRemove, index) => {
    const updatedAreas = fields[index].area.filter(
      (area) => area !== areaToRemove
    );
    updateField(index, { area: updatedAreas });
    updateOnExaminationAreas(index, updatedAreas);
  };

  const addField = () => {
    setFields([
      ...fields,
      {
        onExamination: "",
        area: [],
        notes: "",
        searchTerm: "",
        availableAreas: [],
        showSuggestions: false,
        searchResults: [],
        showAreaDropdown: false,
      },
    ]);
  };

  const removeField = (index) => {
    if (fields.length > 1) {
      setFields(fields.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="flex flex-col py-4 ">
      <div className="flex gap-5 pb-4 border-b border-black/20">
        <h3 className="text-black text-lg xl:text-xl min-w-[26.4vmax]">
          On Examination
        </h3>
      </div>

      <div className="pt-4">
        {fields.map((field, index) => (
          <div key={index} className="flex gap-5 py-1">
            <div className="flex flex-col gap-2 min-w-[26.4vmax] relative">
              <div className="bg-white flex px-4 xl:px-6 py-3 xl:py-4 rounded gap-2">
                <input
                  type="text"
                  name="searchTerm"
                  autoComplete="off"
                  placeholder="On Examination"
                  className="bg-transparent outline-none text-lg xl:text-xl placeholder:text-[#d5d5d5] w-full"
                  value={field.searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateField(index, { searchTerm: value });

                    if (value.trim() === "") {
                      fetchRandomSuggestions(index); // Show random suggestions if input is cleared
                    } else {
                      fetchSuggestions(index); // Fetch specific suggestions when there is input
                    }
                  }}
                  onFocus={() => {
                    if (!field.searchTerm) fetchRandomSuggestions(index); // Show random suggestions on focus if input is empty
                    updateField(index, { showSuggestions: true });
                  }}
                  onBlur={() =>
                    setTimeout(
                      () => updateField(index, { showSuggestions: false }),
                      150
                    )
                  }
                />
                <button
                  type="button"
                  className="px-3 py-1 rounded bg-[#f3f3f3] items-center justify-center text-sm text-custom-gray"
                  onClick={() => handleAddOnExamination(index)}
                >
                  Add
                </button>
              </div>

              {field.showSuggestions && field.searchResults.length > 0 && (
                <div className="absolute top-[4rem] bg-white w-full z-10 shadow-lg rounded-md">
                  {field.searchResults.map((item, idx) => (
                    <div
                      key={idx}
                      onMouseDown={() => handleSelectSuggestion(item, index)}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {item.onExaminationName}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white flex flex-wrap items-center gap-2 px-4 xl:px-6 py-3 xl:py-4 rounded min-w-[26.4vmax] relative">
              {field.area.map((area, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded bg-[#f3f3f3] text-sm text-custom-gray gap-2 whitespace-nowrap"
                >
                  {area}
                  <button
                    type="button"
                    className="text-custom-orange"
                    onClick={() => handleRemoveArea(area, index)}
                  >
                    <IoClose />
                  </button>
                </span>
              ))}

              <input
                type="text"
                name="area"
                autoComplete="off"
                placeholder="Add area and press Enter"
                className="bg-transparent outline-none text-lg xl:text-xl placeholder:text-[#d5d5d5] w-full"
                onKeyDown={(e) => handleAreaInputKeyPress(e, index)}
                onFocus={() => updateField(index, { showAreaDropdown: true })}
                onBlur={() =>
                  setTimeout(
                    () => updateField(index, { showAreaDropdown: false }),
                    150
                  )
                }
              />

              {field.showAreaDropdown && field.availableAreas.length > 0 && (
                <div className="absolute top-full mt-1 bg-white w-full z-10 shadow-lg rounded-md">
                  {field.availableAreas.map((area, idx) => (
                    <div
                      key={idx}
                      onMouseDown={() => handleAddArea(area, index)}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {area}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white flex px-4 xl:px-6 py-3 xl:py-4 rounded gap-2 min-w-[26.4vmax]">
              <input
                type="text"
                name="notes"
                placeholder="Notes..."
                className="bg-transparent outline-none text-lg xl:text-xl placeholder:text-[#d5d5d5] w-full"
                value={field.notes}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>

            <div className="flex flex-col gap-5 flex-1">
              <div className="flex flex-row gap-2 justify-between flex-1">
                <button
                  type="button"
                  className="text-custom-green inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base"
                  onClick={addField}
                >
                  <CiCirclePlus />
                </button>
                <button
                  type="button"
                  className="text-[#E40000] inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base"
                  onClick={() => removeField(index)}
                  disabled={fields.length === 1}
                >
                  <CiCircleMinus />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnExamination;
