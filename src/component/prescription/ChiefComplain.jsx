import React, { useCallback, useEffect, useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import axios from "axios";

const useDebounce = (callback, delay) => {
  const debounceCallback = useCallback(debounce(callback, delay), [
    callback,
    delay,
  ]);

  return debounceCallback;
};

const ChiefComplain = ({ onChange, existingComplaints = [] }) => {
  const [fields, setFields] = useState([
    {
      chiefComplainName: "",
      searchTerm: "",
      searchResults: [],
      showSuggestions: false,
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = (e, index) => {
    if (fields[index].searchResults.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex < fields[index].searchResults.length - 1 ? prevIndex + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : fields[index].searchResults.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && fields[index].searchResults[activeIndex]) {
          const selected = fields[index].searchResults[activeIndex];
          handleSelectSuggestion(selected, index); // Select suggestion
          setActiveIndex(-1); // Reset index
        }
      }
    }
  };

  // Fetch random suggestions when the input is empty
  const fetchRandomSuggestions = async (index) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/chiefcomplain/getdropdown/random`,
        { params: { limit: 5 } }
      );
      updateField(index, {
        searchResults: Array.isArray(response.data) ? response.data : [],
        showSuggestions: true,
      });
    } catch (error) {
      console.error("Error fetching random suggestions:", error);
      updateField(index, { searchResults: [] });
    }
  };

  // Fetch suggestions based on search term
  const fetchSuggestions = useDebounce(async (index) => {
    const searchTerm = fields[index].searchTerm;
    if (searchTerm) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/chiefcomplain/getdropdown`,
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
  }, 300);

  useEffect(() => {
    if (
      Array.isArray(existingComplaints) &&
      existingComplaints.length > 0 &&
      existingComplaints.some(
        (existingComplaints) => existingComplaints.chiefComplainName
      ) &&
      fields[0].chiefComplainName === ""
    ) {
      setFields(
        existingComplaints.map((complaint) => ({
          chiefComplainName: complaint.chiefComplainName,
          searchTerm: complaint.chiefComplainName,
          searchResults: [],
          showSuggestions: false,
        }))
      );
    }
  }, [existingComplaints]);

  // Update field based on index and changes
  const updateField = (index, updates) => {
    setFields((prevFields) => {
      return prevFields.map((field, i) =>
        i === index ? { ...field, ...updates } : field
      );
    });
    onChange(fields); // Ensure onChange is called after the state is updated
  };

  // Handle adding new chief complaint
  const handleAddChiefComplain = async (index) => {
    const { searchTerm } = fields[index];
    const existing = fields.some(
      (field) => field.chiefComplainName === searchTerm
    );
    if (existing) {
      alert("Chief Complaint already exists.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/chiefcomplain/create`,
        { chiefComplainName: searchTerm }
      );

      if (response.status === 201) {
        alert("Chief Complaint Created Successfully");
      }
    } catch (error) {
      console.error("Error creating Chief Complaint:", error);
    }
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (selectedItem, index) => {
    updateField(index, {
      chiefComplainName: selectedItem.chiefComplainName,
      searchTerm: selectedItem.chiefComplainName,
      searchResults: [],
      showSuggestions: false,
    });
  };

  // Add a new input field for chief complaint
  const addField = () => {
    setFields([
      ...fields,
      {
        chiefComplainName: "",
        searchTerm: "",
        searchResults: [],
        showSuggestions: false,
      },
    ]);
  };

  // Remove an input field for chief complaint
  const removeField = (index) => {
    if (fields.length > 1) {
      const updatedFields = fields.filter((_, i) => i !== index);
      setFields(updatedFields);

      // Pass the updated data back to the parent
      onChange(updatedFields);
    }
  };

  return (
    <div className="flex flex-col  ">
      <div className="flex gap-5 pb-4 border-b border-[#00000033]">
        <h3 className="text-black text-lg xl:text-xl min-w-[26.4vmax]">
          Chief Complaints
        </h3>
      </div>
      <div className="pt-4">
        {fields.map((field, index) => (
          <div key={index} className="flex gap-5 py-1">
            <div className="flex flex-col gap-2 w-full relative">
              <div className="bg-white flex px-4 xl:px-6 py-3 xl:py-4 rounded gap-2">
                <input
                  type="text"
                  name="searchTerm"
                  autoComplete="off"
                  placeholder="Chief Complaint"
                  className="bg-transparent outline-none text-lg xl:text-xl placeholder:text-[#d5d5d5] w-full"
                  value={field.searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateField(index, { searchTerm: value });

                    fetchSuggestions(index);
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
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
                <button
                  type="button"
                  className="px-3 py-1 rounded bg-[#f3f3f3] items-center justify-center text-sm text-custom-gray"
                  onClick={() => handleAddChiefComplain(index)}
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
                      className={`p-2 cursor-pointer hover:bg-gray-100 ${
                        idx === activeIndex ? "bg-gray-200" : ""
                      }`}
                    >
                      {item.chiefComplainName}
                    </div>
                  ))}
                </div>
              )}
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

export default ChiefComplain;

function debounce(func, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}
