import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";
import { CiCirclePlus } from "react-icons/ci";

const AddNewPatient = ({ handleClose, currentClinic }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showMoreInputFiled, setShowMoreInputFiled] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [messages, setMessages] = useState("");

  const [medicalHistory, setMedicalHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState({
    patientMedicalHistoryName: "",
    duration: "",
    medicines: [],
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const inputRef = useRef(null);
  const medicineInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const medicineDropdownRef = useRef(null);
  const [medicineSuggestions, setMedicineSuggestions] = useState([]);
  const [showMedicineSuggestions, setShowMedicineSuggestions] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");

  const suggestDuration = (input) => {
    input = input.toLowerCase();
    if (input.endsWith("d")) return `${input.replace(/\D/g, "")} Days`;
    if (input.endsWith("m")) return `${input.replace(/\D/g, "")} Months`;
    if (input.endsWith("y")) return `${input.replace(/\D/g, "")} Years`;
    if (/^\d+$/.test(input)) return `${input} Days`;
    return "";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "patientMedicalHistoryName") {
      setCurrentInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));

      if (value) {
        fetchSearchSuggestions(value);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
        setShowMedicineSuggestions(false); // Hide medicine dropdown if name is cleared
      }
    } else if (name === "duration") {
      setCurrentInput((prevInput) => ({
        ...prevInput,
        duration: value,
      }));
      setSuggestion(suggestDuration(value));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab" && suggestion) {
      // Accept suggestion on Tab
      event.preventDefault();
      setCurrentInput((prev) => ({
        ...prev,
        duration: suggestion,
      }));
      setSuggestion("");
    }
  };

  // Fetch random suggestions when input is focused
  const fetchRandomSuggestions = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/patientmedicalhistory/getdropdown/random`,
        { params: { limit: 5 } }
      );
      setSuggestions(response.data || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching random suggestions:", error);
    }
  };

  // Fetch search suggestions as user types
  const fetchSearchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/patientmedicalhistory/getdropdown`,
        { params: { query } }
      );
      setSuggestions(response.data || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  // Add new medical history item
  const handleAddHistory = async () => {
    const { patientMedicalHistoryName, duration, medicines } = currentInput;

    if (!patientMedicalHistoryName) return; // Exit if no name is selected

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/patientmedicalhistory/getdropdown`,
        { params: { query: patientMedicalHistoryName } }
      );

      const itemExists = response.data.some(
        (item) =>
          item.patientMedicalHistoryName.toLowerCase() ===
          patientMedicalHistoryName.toLowerCase()
      );

      if (itemExists) {
        // Update if item exists
        await axios.put(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/patientmedicalhistory/update/${patientMedicalHistoryName}`,
          { patientMedicalHistoryMedicine: medicines }
        );
      } else {
        // Create new if it doesn't exist
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/patientmedicalhistory/create`,
          {
            patientMedicalHistoryName,
            patientMedicalHistoryMedicine: medicines,
          }
        );
      }

      // Add to frontend state
      setMedicalHistory((prev) => [
        ...prev,
        {
          _id: Date.now().toString(),
          patientMedicalHistoryName,
          duration,
          medicines, // Include medicines in the state
          checked: true,
        },
      ]);

      setCurrentInput({
        patientMedicalHistoryName: "",
        duration: "",
        medicines: [], // Reset medicines after adding
      });
    } catch (error) {
      console.error("Error handling medical history:", error);
    }
  };

  useEffect(() => {
    const fetchDefaultMedicalHistory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/patientmedicalhistory/get`
        );
        const fetchedData = response.data.map((item) => ({
          ...item,
          checked: false, // Set default checked status to false
        }));
        setMedicalHistory(fetchedData); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching default medical history:", error);
      }
    };

    fetchDefaultMedicalHistory();
  }, []);

  const fetchMedicineSuggestions = async (
    patientMedicalHistoryName,
    search = ""
  ) => {
    if (!patientMedicalHistoryName) {
      setShowMedicineSuggestions(false); // Hide dropdown if no medical history name
      return;
    }

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/patientmedicalhistory/getMedicinesByHistoryName`,
        { params: { patientMedicalHistoryName, search } } // Send search query to backend
      );
      setMedicineSuggestions(response.data.medicines || []);
      setShowMedicineSuggestions(true);
    } catch (error) {
      console.error("Error fetching medicine suggestions:", error);
      setMedicineSuggestions([]);
    }
  };
  // Handle selection from suggestions
  const handleSelectSuggestion = (suggestion) => {
    if (!suggestion || !suggestion.patientMedicalHistoryName) {
      console.warn("Invalid suggestion:", suggestion);
      return;
    }

    setCurrentInput({
      patientMedicalHistoryName: suggestion.patientMedicalHistoryName,
      duration: "",
      medicines: [],
    });

    setShowSuggestions(false);

    fetchMedicineSuggestions(suggestion.patientMedicalHistoryName);
  };

  const handleMedicineInputChange = async (event) => {
    const searchQuery = event.target.value;
    setCurrentInput((prev) => ({
      ...prev,
      medicineSearch: searchQuery,
    }));

    if (currentInput.patientMedicalHistoryName) {
      fetchMedicineSuggestions(
        currentInput.patientMedicalHistoryName,
        searchQuery
      );
    }
  };

  const handleMedicineSelect = (medicine) => {
    if (!currentInput.medicines.includes(medicine)) {
      setCurrentInput((prev) => ({
        ...prev,
        medicines: [...prev.medicines, medicine],
        medicineSearch: "",
      }));
    }
    setShowMedicineSuggestions(false); // Hide dropdown after selection
  };

  const handleMedicineRemove = (medicine) => {
    setCurrentInput((prev) => ({
      ...prev,
      medicines: prev.medicines.filter((m) => m !== medicine),
    }));
  };

  const handleMedicineKeyPress = (event) => {
    if (event.key === "Enter" && event.target.value) {
      event.preventDefault();
      const newMedicine = event.target.value.trim();
      if (!currentInput.medicines.includes(newMedicine)) {
        setCurrentInput((prev) => ({
          ...prev,
          medicines: [...prev.medicines, newMedicine],
        }));
      }
      event.target.value = ""; // Clear input
    }
  };

  // Toggle checkbox
  const toggleCheckbox = (id) => {
    setMedicalHistory((prevHistory) =>
      prevHistory.map((entry) =>
        entry._id === id ? { ...entry, checked: !entry.checked } : entry
      )
    );
  };

  const handlePatientHistoryFocus = () => {
    fetchRandomSuggestions(); // Fetch random suggestions on focus
    setShowSuggestions(true); // Show the patientMedicalHistoryName dropdown
  };

  const handleMedicineFocus = () => {
    if (currentInput.patientMedicalHistoryName) {
      fetchMedicineSuggestions(currentInput.patientMedicalHistoryName); // Fetch medicines based on selected history
      setShowMedicineSuggestions(true); // Show the medicine dropdown
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false); // Hide patientMedicalHistoryName dropdown
      }

      if (
        medicineDropdownRef.current &&
        !medicineDropdownRef.current.contains(event.target) &&
        medicineInputRef.current &&
        !medicineInputRef.current.contains(event.target)
      ) {
        setShowMedicineSuggestions(false); // Hide medicine dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const basicPatientDetails = [
    { label: "Pulse Rate", placeholder: "98", unit: "/min", key: "pulseRate" },
    {
      label: "Blood Pressure",
      placeholder: "120",
      unit: "mmHg",
      key: "bloodPressure",
    },
    {
      label: "Blood Temperature",
      placeholder: "87",
      unit: "C",
      key: "bloodTemperature",
    },
    {
      label: "Respiratory Rate",
      placeholder: "98",
      unit: "/min",
      key: "respiratoryRate",
    },
    { label: "Body Width", placeholder: "55", unit: "Kg", key: "bodyWidth" },
    {
      label: "Body Height",
      placeholder: "8.7",
      unit: "cms",
      key: "bodyHeight",
    },
    {
      label: "Systolic Blood Pressure",
      placeholder: "122",
      unit: "mmHg",
      key: "systolicBloodPressure",
    },
    {
      label: "Diastolic Blood Pressure",
      placeholder: "87",
      unit: "mmHg",
      key: "diastolicBloodPressure",
    },
    {
      label: "Hemoglobin",
      placeholder: "120",
      unit: "g/dL",
      key: "hemoglobin",
    },
    {
      label: "Blood Sugar Random",
      placeholder: "120",
      unit: "mg/dL",
      key: "bloodSugarRandom",
    },
    {
      label: "Blood Sugar Fasting",
      placeholder: "120",
      unit: "mg/dL",
      key: "bloodSugarFasting",
    },
    {
      label: "Blood Sugar P.P",
      placeholder: "120",
      unit: "mg/dL",
      key: "bloodSugarPP",
    },
  ];
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/users`,
        {
          params: { designation: "Doctor" },
        }
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // Call `fetchDoctors` in `useEffect` to load doctors on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDoctorChange = (event) => {
    setSelectedDoctorId(event.target.value); // Store the userId of the selected doctor
  };

  // Handle form submission
  const onSubmit = async (data) => {
    data.age = parseInt(data.age, 10);
    basicPatientDetails.forEach(({ key, unit }) => {
      if (data[key]) {
        data[key] = `${data[key]} ${unit}`;
      }
    });

    const checkedMedicalHistory = medicalHistory
      .filter((item) => item.checked)
      .map((item) => ({
        medicalHistoryName: item.patientMedicalHistoryName,
        duration: item.duration || "", // default to empty if not provided
        medicines: item.medicines || [], // default to empty array if not provided
      }));

    const patientData = {
      ...data,
      clinicId: currentClinic.clinicId,
      medicalHistory: checkedMedicalHistory, // Add medical history to patient data
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/patients/create`,
        patientData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessages("Patient created successfully.");
      setErrormsg("");
      reset();
    } catch (error) {
      const errorMessage = error.response.data.error;
      if (errorMessage.includes("Patient already exists")) {
        setErrormsg("Patient with this number already exists.");
      } else {
        setErrormsg("Error creating patient.");
      }
      console.error("Error creating patient:", error);
    }
  };

  return (
    <div className="xlg:p-8 p-4 flex flex-col gap-16">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#333333]">
          Create New Patient
        </h1>
        <button onClick={handleClose}>
          <RxCrossCircled size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Patient Name */}
          <div>
            <input
              type="text"
              placeholder="Patient Name"
              {...register("patientName", {
                required: "Patient Name is required",
              })}
              className="priority-input"
            />
            {errors.patientName && (
              <span className="error">{errors.patientName.message}</span>
            )}
          </div>

          {/* Gender */}
          <div>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="priority-input"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            {errors.gender && (
              <span className="error">{errors.gender.message}</span>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <input
              type="text"
              placeholder="Mobile Number"
              maxLength={10}
              {...register("mobileNumber", {
                required: "Mobile Number is required",

                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Mobile Number must be exactly 10 digits",
                },
              })}
              className="priority-input"
            />
            {errors.mobileNumber && (
              <span className="error">{errors.mobileNumber.message}</span>
            )}
          </div>

          {/* Age */}
          <div>
            <input
              type="number"
              placeholder="Age"
              {...register("age", { required: "Age is required" })}
              className="priority-input"
            />
            {errors.age && <span className="error">{errors.age.message}</span>}
          </div>

          {/* Location */}
          <div>
            <input
              type="text"
              placeholder="Location"
              {...register("location", { required: "Location is required" })}
              className="priority-input"
            />
            {errors.location && (
              <span className="error">{errors.location.message}</span>
            )}
          </div>

          {/* Choose Doctor */}
          <div>
            <select
              {...register("chooseDoctor", { required: "Doctor is required" })}
              onChange={handleDoctorChange}
              className="priority-input"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.userId} value={doctor.userId}>
                  {doctor.name}
                </option>
              ))}
            </select>
            {errors.chooseDoctor && (
              <span className="error">{errors.chooseDoctor.message}</span>
            )}
          </div>

          {/* Submit and Cancel Buttons */}
        </div>

        {/* Show More / Show Less Button */}
        <button
          type="button"
          onClick={() => setShowMoreInputFiled(!showMoreInputFiled)}
          className="w-fit h-[2.5rem] px-6 flex justify-center items-center rounded-md bg-transparent border border-custom-blue hover:text-white hover:bg-custom-blue text-custom-blue text-base font-medium"
        >
          {showMoreInputFiled ? "▲ Show Less" : "▼ Show More"}
        </button>

        {/* Additional Fields */}
        {showMoreInputFiled && (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  {...register("address")}
                  className="priority-input"
                />
              </div>
              <div>
                <select {...register("city")} className="priority-input">
                  <option value="">City</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Asansol">Asansol</option>
                  <option value="Durgapur">Durgapur</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Pin Code"
                  {...register("pinCode")}
                  className="priority-input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <select {...register("priority")} className="priority-input">
                  <option value="">Priority</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <select
                  {...register("paymentMethod")}
                  className="priority-input"
                >
                  <option value="">Payment Method</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
            </div>
            <div className=" grid grid-cols-2 gap-4 !w-full">
              {basicPatientDetails.map(
                ({ label, placeholder, unit, key }, index) => (
                  <div className="flex flex-col gap-2 !w-full" key={index}>
                    <h3 className="text-black text-xs xlg:text-sm">{label}</h3>
                    <div className="bg-white flex px-4 xl:px-6 py-2 xlg:py-4 justify-between rounded gap-2 !w-full">
                      <input
                        type="number"
                        placeholder={placeholder}
                        {...register(key)}
                        className="bg-transparent outline-none text-sm xl:text-sm text-custom-gray !w-full"
                      />
                      <span className="px-3 py-1 items-center justify-center text-sm text-custom-gray">
                        {unit}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="pb-2 border-b border-[#00000033]">
                <label htmlFor="">Medical History</label>
              </div>
              <div className="py-9 grid grid-cols-3 gap-3">
                {medicalHistory.map((data) => (
                  <div className="flex gap-2 items-center" key={data._id}>
                    <input
                      type="checkbox"
                      id={`checkbox-${data._id}`}
                      checked={data.checked}
                      onChange={() => toggleCheckbox(data._id)}
                      className="size-4 accent-custom-gray cursor-pointer"
                    />
                    <label
                      htmlFor={`checkbox-${data._id}`}
                      className="whitespace-nowrap text-sm xl:text-base text-custom-gray cursor-pointer"
                    >
                      {data.patientMedicalHistoryName}
                    </label>
                    {data.duration && (
                      <span className="text-[#bcbcbc] text-sm py-1 px-3 rounded bg-white whitespace-nowrap">
                        {data.duration}
                      </span>
                    )}
                    {data.medicines && data.medicines.length > 0 && (
                      <span className="text-[#bcbcbc] text-sm py-1 px-3 rounded bg-white whitespace-nowrap">
                        {data.medicines.join(", ")}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 pb-9 relative">
                <div className="relative flex flex-col   rounded min-w-[20.4vmax] ">
                  <input
                    type="text"
                    ref={inputRef}
                    name="patientMedicalHistoryName"
                    placeholder="Medical History"
                    value={currentInput.patientMedicalHistoryName}
                    onChange={handleInputChange}
                    onFocus={handlePatientHistoryFocus}
                    className=" p-3 h-[3rem] bg-white rounded outline-none"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-12 left-0 bg-white border border-gray-300 shadow-lg rounded w-full z-50"
                    >
                      {suggestions.map((suggestion, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleSelectSuggestion(suggestion)}
                          className="p-2 cursor-pointer hover:bg-gray-100"
                        >
                          {suggestion.patientMedicalHistoryName}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="duration"
                    placeholder="2 Months"
                    value={currentInput.duration}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="p-3 h-[3rem] bg-white rounded outline-none w-full"
                  />
                  {suggestion && (
                    <span
                      className="absolute top-0 left-[26px] py-3 px-5 pointer-events-none text-gray-400"
                      style={{
                        display: currentInput.duration ? "inline" : "none",
                        color: "gray",
                      }}
                    >
                      {suggestion.slice(currentInput.duration.length)}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="bg-white flex flex-wrap items-center gap-2 px-4 py-2 rounded">
                    {currentInput.medicines.map((medicine, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded bg-[#f3f3f3] text-sm text-custom-gray flex items-center gap-2"
                      >
                        {medicine}
                        <button
                          type="button"
                          className="text-custom-orange"
                          onClick={() => handleMedicineRemove(medicine)}
                        >
                          x
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      ref={medicineInputRef}
                      placeholder="Add Medicine"
                      value={currentInput.medicineSearch || ""}
                      onChange={handleMedicineInputChange}
                      onKeyDown={(e) => handleMedicineKeyPress(e)}
                      onFocus={handleMedicineFocus}
                      className="outline-none text-sm text-gray-600 w-full"
                    />
                  </div>
                  {showMedicineSuggestions &&
                    medicineSuggestions.length > 0 && (
                      <div
                        ref={medicineDropdownRef}
                        className="absolute top-full mt-1 bg-white w-full shadow-lg rounded-md z-10"
                      >
                        {medicineSuggestions.map((medicine, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleMedicineSelect(medicine)}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                          >
                            {medicine}
                          </div>
                        ))}
                      </div>
                    )}
                </div>

                <button
                  type="button"
                  onClick={handleAddHistory}
                  className="h-[3rem] flex px-4 gap-2 items-center text-base text-custom-gray bg-white rounded"
                >
                  <CiCirclePlus />
                  Add More
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-6">
            <button
              type="button"
              onClick={handleClose}
              className="h-[2.5rem] transition-colors duration-300 ease-in-out boxsh flex w-full justify-center items-center bg-white rounded-md text-base hover:bg-[#FA5503] hover:text-white text-[#FA5503] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-[2.5rem] transition-colors duration-300 ease-in-out boxsh flex w-full justify-center items-center bg-custom-blue hover:text-custom-blue hover:bg-white hover:border-2 border-custom-blue rounded-md text-base text-white font-medium"
            >
              Submit
            </button>
          </div>
          <div className="text-red-600 text-sm font-medium">{errormsg}</div>
          <div className="text-green-600 text-sm font-medium">{messages}</div>
        </div>
      </form>
    </div>
  );
};

export default AddNewPatient;
