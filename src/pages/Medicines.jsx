import React, { useState, useEffect, useContext } from "react";
import AdminDashboardTemplate from "../template/AdminDashboardTemplate";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import TopHeaderMini from "../component/TopHeaderMini";

const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const Medicines = () => {
  const [medicineBrandName, setMedicineBrandName] = useState("");
  const [medicineComposition, setMedicineComposition] = useState("");
  const [medicineStrength, setMedicineStrength] = useState("");
  const [medications, setMedications] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editMedicineBrandName, setEditMedicineBrandName] = useState("");
  const [editMedicineComposition, setEditMedicineComposition] = useState("");
  const [editMedicineStrength, setEditMedicineStrength] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [brandSuggestions, setBrandSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1); // For arrow key navigation
  const { favClinic } = useContext(AuthContext);
  const [pageNumbers, setPageNumbers] = useState([]);

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch medications from the server
  const fetchMedications = async (page = 1, searchQuery = "") => {
    try {
      setLoading(true);
      const response = await axios.get(`${VITE_BASE_URL}/api/medications/get`, {
        params: { page, limit: 20, medicineBrandName: searchQuery },
      });

      if (response.data && response.data.medications) {
        setMedications(response.data.medications);
        setCurrentPage(response.data.page);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching medications:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedications(currentPage, medicineBrandName); // Fetch with search query if any
  }, [currentPage, medicineBrandName]);

  // Handle search suggestion fetch
  const handleSearchChange = async (e) => {
    const searchQuery = e.target.value;
    setMedicineBrandName(searchQuery);

    setCurrentPage(1);

    if (searchQuery.length >= 1) {
      try {
        const response = await axios.get(
          `${VITE_BASE_URL}/api/medications/getdropdown`,
          {
            params: { query: searchQuery },
          }
        );
        setBrandSuggestions(response.data);

        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setBrandSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setMedicineBrandName(suggestion.medicineBrandName);
    setBrandSuggestions([]);
    setActiveIndex(-1);
    fetchMedications(1, suggestion.medicineBrandName);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex < brandSuggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : brandSuggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && brandSuggestions[activeIndex]) {
        handleSelectSuggestion(brandSuggestions[activeIndex]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (medicineBrandName && medicineComposition && medicineStrength) {
      try {
        const formattedBrandName = capitalizeWords(medicineBrandName);
        const formattedComposition = capitalizeWords(medicineComposition);
        const formattedStrength = capitalizeWords(medicineStrength);
        const response = await axios.post(
          ` ${VITE_BASE_URL}/api/medications/create`,
          {
            medicineBrandName: formattedBrandName,
            medicineComposition: formattedComposition,
            medicineStrength: formattedStrength,
          }
        );

        // Add the newly created medication to the list
        setMedications([response.data.data, ...medications]);

        // Clear the input fields
        setMedicineBrandName("");
        setMedicineComposition("");
        setMedicineStrength("");
      } catch (error) {
        console.error("Error creating medication:", error);
      }
    }
  };

  // Handle edit for a medication
  const handleEdit = (index) => {
    const medicationToEdit = medications[index];
    setEditingIndex(index);
    setEditMedicineBrandName(medicationToEdit.medicineBrandName);
    setEditMedicineComposition(medicationToEdit.medicineComposition);
    setEditMedicineStrength(medicationToEdit.medicineStrength);
  };

  // Handle updating a medication
  const handleUpdate = async () => {
    const updatedMedication = {
      medicineBrandName: capitalizeWords(editMedicineBrandName),
      medicineComposition: capitalizeWords(editMedicineComposition),
      medicineStrength: capitalizeWords(editMedicineStrength),
    };

    try {
      const response = await axios.put(
        `${VITE_BASE_URL}/api/medications/update/${medications[editingIndex].medicineId}`,
        updatedMedication
      );

      const updatedMedications = medications.map((medication, index) =>
        index === editingIndex ? response.data.data : medication
      );

      setMedications(updatedMedications);
      setEditingIndex(null);
      setEditMedicineBrandName("");
      setEditMedicineComposition("");
      setEditMedicineStrength("");
    } catch (error) {
      console.error("Error updating medication:", error);
    }
  };

  const handleDelete = async (index) => {
    const medicineId = medications[index].medicineId;

    const confirmed = window.confirm(
      "Are you sure you want to delete this medication?"
    );

    if (confirmed) {
      try {
        await axios.delete(
          `${VITE_BASE_URL}/api/medications/delete/${medicineId}`
        );

        const updatedMedications = medications.filter((_, i) => i !== index);
        setMedications(updatedMedications);
      } catch (error) {
        console.error("Error deleting medication:", error);
      }
    }
  };

  const updatePageNumbers = (currentPage, totalPages) => {
    // Calculate the start and end page numbers to display
    const maxPagesToShow = 5;
    let startPage =
      Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
    let endPage = startPage + maxPagesToShow - 1;

    // Ensure the last page number doesn't exceed total pages
    if (endPage > totalPages) {
      endPage = totalPages;
    }

    // Generate the page numbers to display
    const visiblePageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      visiblePageNumbers.push(i);
    }

    setPageNumbers(visiblePageNumbers);
  };

  useEffect(() => {
    updatePageNumbers(currentPage, totalPages);
  }, [currentPage, totalPages]);

  // Pagination handling
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBlur = () => {
    setBrandSuggestions([]); // Hide suggestions when the input loses focus
  };

  return (
    <AdminDashboardTemplate>
      <div>
        <TopHeaderMini />
      </div>
      <div className="flex flex-col gap-8 mt-8 xlg:px-8 px-4 ">
        {/* Medication Form */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="flex flex-col gap-2 ">
              <label className="text-[#555555] font-medium">
                Medicine Brand Name
              </label>
              <input
                type="text"
                className="h-[4rem] px-4 bg-[#F5F5F5] w-full rounded-md outline-none"
                placeholder="Medicine Brand Name"
                value={medicineBrandName}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
              />
              {/* Display suggestions */}
              {brandSuggestions.length > 0 && (
                <ul className="bg-white shadow-md max-h-[200px] overflow-y-auto">
                  {brandSuggestions.map((suggestion, index) => (
                    <li
                      key={suggestion.medicineId}
                      className={`p-2 cursor-pointer ${
                        activeIndex === index ? "bg-gray-200" : ""
                      }`}
                      onClick={() => handleSelectSuggestion(suggestion)}
                    >
                      {suggestion.medicineBrandName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Other Inputs */}
            <div className="flex flex-col gap-2">
              <label className="text-[#555555] font-medium">
                Medicine Composition
              </label>
              <input
                type="text"
                className="h-[4rem] px-4 bg-[#F5F5F5] w-full rounded-md outline-none"
                placeholder="Medicine Composition"
                value={medicineComposition}
                onChange={(e) => setMedicineComposition(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#555555] font-medium">
                Medicine Strength
              </label>
              <input
                type="text"
                className="h-[4rem] px-4 bg-[#F5F5F5] w-full rounded-md outline-none"
                placeholder="Medicine Strength"
                value={medicineStrength}
                onChange={(e) => setMedicineStrength(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-[15%] flex justify-center items-center h-[3rem] rounded border-2 border-custom-blue text-custom-blue transition-colors duration-300 ease-in-out bg-white hover:bg-custom-blue hover:text-white font-medium"
          >
            Submit
          </button>
        </form>

        {/* Medication List */}
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-row border-b pb-4 text-base font-semibold xxl:text-xl border-[#0000001A]">
            <div className="w-[30%]">Brand Name</div>
            <div className="w-[30%]">Composition</div>
            <div className="w-[30%]">Strength</div>
            <div className="w-[10%]">Actions</div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-[200px]">
              <div className="loader">
                <div className="dot dot-1"></div>
                <div className="dot dot-2"></div>
                <div className="dot dot-3"></div>
                <div className="dot dot-4"></div>
                <div className="dot dot-5"></div>
              </div>
            </div>
          ) : (
            medications.map((item, index) => (
              <div
                key={item.medicineId}
                className="flex flex-row gap-4 text-sm xxl:text-lg"
              >
                {editingIndex === index ? (
                  <>
                    <div className="w-[30%]">
                      <input
                        type="text"
                        value={editMedicineBrandName}
                        className="p-2 text-black w-[80%] rounded outline-none bg-slate-100"
                        onChange={(e) =>
                          setEditMedicineBrandName(e.target.value)
                        }
                      />
                    </div>
                    <div className="w-[30%]">
                      <input
                        type="text"
                        value={editMedicineComposition}
                        className="p-2 text-black w-[80%] rounded outline-none bg-slate-100"
                        onChange={(e) =>
                          setEditMedicineComposition(e.target.value)
                        }
                      />
                    </div>
                    <div className="w-[30%]">
                      <input
                        type="text"
                        value={editMedicineStrength}
                        className="p-2 text-black w-[80%] rounded outline-none bg-slate-100"
                        onChange={(e) =>
                          setEditMedicineStrength(e.target.value)
                        }
                      />
                    </div>
                    <button
                      onClick={handleUpdate}
                      className="text-custom-green p-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="text-custom-orange p-2"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-[30%]">{item.medicineBrandName}</div>
                    <div className="w-[30%]">{item.medicineComposition}</div>
                    <div className="w-[30%]">{item.medicineStrength}</div>
                    <div className="w-[10%] flex justify-start items-center gap-4 p-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-custom-purple p-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-custom-orange p-2"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}

          {/* Pagination */}
          <div className="flex gap-6 text-sm font-medium justify-center items-center w-full mt-4">
            <button
              className="h-[2rem] flex justify-center items-center px-4 text-custom-blue border-custom-blue border hover:bg-blue-500 hover:text-white rounded transition-colors duration-300 ease-in-out"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`page-btn h-[2rem] px-3 rounded transition-colors duration-300 ease-in-out ${
                  page === currentPage
                    ? "active border text-custom-orange border-custom-orange"
                    : "border text-custom-gray border-custom-gray"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              className="h-[2rem] flex justify-center items-center px-4 border border-custom-blue text-custom-blue hover:bg-blue-500 hover:text-white rounded transition-colors duration-300 ease-in-out"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default Medicines;
