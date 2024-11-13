import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import AdminDashboardTemplate from "../template/AdminDashboardTemplate";
import Topheader from "../component/Topheader";
import { MdCurrencyRupee } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { GoPlusCircle } from "react-icons/go";

const CreateInvoice = () => {
  const { patientId } = useParams();
  const [estimate, setEstimate] = useState([]);
  const [patientData, setPatientData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const estimateRef = useRef();
  const [isSaved, setIsSaved] = useState(false); // Track if saved
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currentPaymentId, setCurrentPaymentId] = useState(null);
  const [totalCharges, setTotalCharges] = useState(0);
  const [totalPaid, setTotalPaid] = useState("");
  const [anyDue, setAnyDue] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/patients/get/${patientId}`
        );
        setPatientData(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchPatientData();
  }, [patientId]);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/patients/get/${patientId}`
        );
        const existingPayment = response.data.paymentDetails.find(
          (payment) => payment.paymentId === currentPaymentId
        );
        if (existingPayment) {
          setCurrentPaymentId(existingPayment.paymentId);
          setEstimate(existingPayment.paymentDetails); // Load existing items
          setPaymentMethod(existingPayment.paymentMethod);
          setTotalCharges(existingPayment.totalCharges);
        }
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [patientId]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/addpayment/getdropdown`,
          { params: { query: searchTerm } }
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsSearching(false);
      }
    };
    fetchSearchResults();
  }, [searchTerm]);

  const handleAddItem = () => {
    if (selectedItem) {
      const itemExists = estimate.some(
        (item) => item.iteamName === selectedItem.iteamName
      );
      if (itemExists) {
        alert("Item already added.");
        return;
      }
      setEstimate((prevEstimate) => [
        ...prevEstimate,
        { ...selectedItem, description: description || "N/A" },
      ]);
      setSelectedItem("");
      setSearchTerm("");
      setDescription("");
      setIsSaved(false);
    }
  };

  const handleDeleteItem = (index) => {
    setEstimate((prevEstimate) => prevEstimate.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const calculateTotalCharges = () => {
      const total = estimate.reduce(
        (acc, item) => acc + Number(item.iteamCharges),
        0
      );
      setTotalCharges(total);
    };

    calculateTotalCharges();
  }, [estimate]); // Recalculate total charges whenever `estimate` changes

  const handleSave = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Default totalPaid to totalCharges if not entered
    const paidAmount = totalPaid ? Number(totalPaid) : totalCharges;
    const dueAmount = totalCharges - paidAmount;

    try {
      if (currentPaymentId) {
        await axios.put(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/patients/update/payment/${patientId}/${currentPaymentId}`,
          {
            paymentDetails: estimate,
            totalCharges: totalCharges,
            totalPaid: paidAmount,
            anyDue: dueAmount,
          }
        );
      } else {
        // Save as a new payment if no existing paymentId
        const response = await axios.put(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/patients/add/payment/${patientId}`,
          {
            paymentMethod,
            paymentDetails: estimate,
            totalCharges,
            totalPaid: paidAmount,
            anyDue: dueAmount,
          }
        );
        setCurrentPaymentId(response.data.paymentId);
      }

      alert("Payment details saved successfully.");
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving payment details:", error);
      alert("Failed to save payment details.");
    }
  };

  // Prevent download if not saved
  const handleDownload = () => {
    if (!isSaved) {
      alert("Please save the data before downloading.");
      return;
    }

    const element = estimateRef.current;
    element.classList.add("hide-action");
    html2pdf()
      .from(element)
      .set({
        margin: 1,
        filename: `${patientData.patientName}-Invoice.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { orientation: "portrait" },
      })
      .save()
      .finally(() => {
        element.classList.remove("hide-action");
      });
  };
  const handleKeyDown = (e) => {
    if (searchResults.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && searchResults[activeIndex]) {
          const selected = searchResults[activeIndex];
          setSelectedItem(selected);
          setSearchTerm(`${selected.iteamName} - ${selected.iteamCharges}`);
          setSearchResults([]);
          setActiveIndex(-1);
        }
      }
    }
  };
  return (
    <AdminDashboardTemplate>
      <div>
        <Topheader>
          <Link
            to="/payments/add-payment-charges"
            className="flex items-center bg-custom-orange hover:bg-custom-blue gap-3 rounded px-3 h-[2.5rem] text-xs xl:text-base xlg:text-sm text-[#F5F5F5] transition-colors duration-300 ease-in-out"
          >
            <GoPlusCircle />
            <h3>Create Invoice</h3>
          </Link>
        </Topheader>
      </div>
      <div className="flex flex-col gap-10 mt-6 px-4 xl:px-8 ">
        <div
          className="p-4 xxl:p-8 border-2 border-[#E7E7E7] rounded-lg "
          ref={estimateRef}
        >
          <div className="flex flex-col">
            {/* Doctor and Patient Info */}
            <div className="flex justify-between py-3 border-b border-black/20">
              <div className="flex items-center gap-5 justify-center">
                <img
                  src="/icons/tooth-prescription.svg"
                  alt="dental prescribe"
                  width={71}
                  height={71}
                />
                <div className="flex flex-col gap-2">
                  <h1 className="xlg:text-base text-sm xxl:text-xl font-semibold text-custom-gray">
                    {patientData
                      ? `Dr. ${patientData.chooseDoctorDetails?.name}`
                      : "Doctor Unavailable"}
                  </h1>
                  <p className="xlg:text-base text-sm xxl:text-xl text-[#9C9C9C]">
                    {patientData
                      ? `${patientData.chooseDoctorDetails?.doctorDegree}`
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 justify-center">
                <div className="flex flex-col">
                  <h1 className="xlg:text-base text-sm xxl:text-xl font-semibold text-custom-gray text-right">
                    Dentity Dental
                  </h1>
                  <p className="xlg:text-base text-sm xxl:text-xl text-[#9C9C9C] text-right">
                    Rajarhat Newtown, Kolkata
                  </p>
                </div>
                <img
                  src="/icons/hospital.svg"
                  alt="dental prescribe"
                  width={71}
                  height={71}
                  className="size-[3.8vmax]"
                />
              </div>
            </div>
            <div className="flex justify-between py-3 border-b border-black/20">
              <div className="flex flex-col gap-2">
                <h1 className="xlg:text-base text-sm xxl:text-xl font-semibold text-custom-gray">
                  {patientData?.patientName || "Patient Name"}
                </h1>
                <p className="xlg:text-base text-sm xxl:text-xl text-[#9C9C9C]">
                  {patientData?.gender}, {patientData?.age} Years | +91{" "}
                  {patientData?.mobileNumber}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="xlg:text-base text-sm xxl:text-xl font-semibold text-custom-gray text-right">
                  {new Date(patientData?.createdAt).toLocaleDateString(
                    "en-GB",
                    { weekday: "long" }
                  )}
                </h1>
                <p className="xlg:text-base text-sm xxl:text-xl font-semibold text-custom-gray text-right">
                  {new Date(patientData?.createdAt).toLocaleDateString("en-GB")}
                  <span> | </span>
                  {new Date(patientData?.createdAt).toLocaleTimeString(
                    "en-GB",
                    {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }
                  )}
                </p>
              </div>
            </div>

            {/* Estimate Table */}
            <div className="flex flex-col gap-4 py-4">
              <div className="border-b border-[#0000001A] flex flex-row pb-2 font-semibold text-sm xxl:text-lg text-[#333333]">
                <div className="flex-1">Name of Item</div>
                <div className="flex-1">Charges</div>
                <div className="flex-1">Description</div>
                <div className="flex-1 action-column">Action</div>
              </div>
              <div className="flex flex-col gap-2">
                {estimate.map((item, index) => (
                  <div
                    className="flex flex-row text-sm xxl:text-lg text-custom-gray"
                    key={index}
                  >
                    <div className="flex-1">
                      {index + 1}. {item.iteamName}
                    </div>
                    <div className="flex-1 flex items-center">
                      <MdCurrencyRupee className="action-column" />
                      {item.iteamCharges}
                    </div>
                    <div className="flex-1">{item.description || "N/A"}</div>
                    <div className="flex-1 action-column">
                      <button
                        onClick={() => handleDeleteItem(index)}
                        className="text-red-500 hover:text-red-700 ml-4 "
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="py-2 border-t border-[#0000001A]">
                  {estimate.length > 0 && (
                    <div className="py-2 border-t border-[#0000001A]">
                      <div className="flex flex-row ">
                        <div className="flex-1">Total</div>
                        <div className="flex-1 flex items-center">
                          <MdCurrencyRupee className="action-column" />
                          {totalCharges}
                        </div>
                        <div className="flex-1">
                          <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className=" bg-[#0000001A] action-column outline-none text-custom-gray rounded"
                          >
                            <option value="">Payment Method</option>
                            <option value="Online">Online</option>
                            <option value="Cash">Cash</option>
                          </select>
                        </div>
                        <div className="flex-1 flex justify-center items-center gap-2">
                          <div className="action-column" onClick={handleSave}>
                            <button className=" px-4  bg-custom-blue h-[1.5rem]  rounded flex justify-center items-center text-white">
                              Save
                            </button>
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="Total Pay if Any Due"
                              value={totalPaid}
                              onChange={(e) => {
                                const paidValue = e.target.value;
                                setTotalPaid(paidValue);
                                const paidAmount = Number(paidValue) || 0;
                                setAnyDue(totalCharges - paidAmount);
                              }}
                              className="bg-[#0000001A] px-2 action-column outline-none text-custom-gray rounded"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Add Item Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-8">
            <div className="relative w-[40%]">
              <input
                type="text"
                placeholder="Search Item"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-[4rem] px-4 bg-[#F5F5F5] w-full rounded-md outline-none"
              />
              {isSearching ? (
                <div className="absolute top-[4rem] bg-white w-full z-10">
                  <p className="p-4">Loading...</p>
                </div>
              ) : (
                searchResults.length > 0 && (
                  <div className="absolute top-[4rem] bg-white w-full z-10 shadow-lg rounded-md">
                    {searchResults.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedItem(item);
                          setSearchTerm(
                            `${item.iteamName} - ${item.iteamCharges}`
                          );
                          setSearchResults([]);
                        }}
                        className={`p-2 cursor-pointer hover:bg-gray-100 ${
                          index === activeIndex ? "bg-gray-200" : ""
                        }`}
                      >
                        {item.iteamName} - {item.iteamCharges}
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
            <div className="w-[40%]">
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-[4rem] px-4 bg-[#F5F5F5] w-full rounded-md outline-none"
              />
            </div>
          </div>
          <div className="w-full flex flex-row gap-6">
            <button
              onClick={handleAddItem}
              className="w-[15%] flex justify-center items-center h-[3rem] xxl:h-[4rem] rounded border-2 border-custom-blue text-custom-blue bg-white hover:bg-custom-blue xxl:text-lg hover:text-white font-medium"
            >
              Add Item
            </button>
            <button
              onClick={handleDownload}
              className="w-[15%] flex justify-center items-center h-[3rem] xxl:h-[4rem] rounded border-2 border-custom-blue text-custom-blue bg-white hover:bg-custom-blue xxl:text-lg hover:text-white font-medium"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default CreateInvoice;
