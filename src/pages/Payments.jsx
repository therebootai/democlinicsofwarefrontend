import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboardTemplate from "../template/AdminDashboardTemplate";
import Topheader from "../component/Topheader";
import { BsEye } from "react-icons/bs";
import { GoPerson, GoPlusCircle } from "react-icons/go";
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";

const Payments = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch patients data from the backend
  const fetchPatients = async (page = 1) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/patients/get",
        {
          params: { page, limit: 20 },
        }
      );
      setPatientsData(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Fetch data on component mount and when currentPage changes
  useEffect(() => {
    fetchPatients(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    const paginationButtons = [];
    for (let i = startPage; i <= endPage; i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 h-[2rem] flex justify-center items-center border ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white text-[#555555]"
          } rounded-md mx-1`}
        >
          {i}
        </button>
      );
    }
    return paginationButtons;
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
      <div className="xl:p-8 p-4 xlg:px-8 px-4 flex flex-col gap-8">
        <div className="bg-white rounded-lg flex flex-col gap-4">
          <h1 className="xlg:text-2xl text-xl font-semibold">Patients</h1>
          <div className="w-full flex flex-col gap-6">
            {patientsData.map((item, index) => (
              <section
                key={item.patientId}
                className={`xlg:p-4 xxl:p-6 p-3 rounded-md border border-[#E7E7E7] ${
                  index % 2 === 0 ? "bg-[#F5F5F5]" : " bg-transparent "
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row items-center gap-2">
                        <span className="xlg:text-sm text-sm xxl:text-xl text-[#888888] font-medium ">
                          {item.patientId}.
                        </span>
                        <div className="flex flex-row items-center gap-1 text-[13px] xxl:text-xl xlg:text-base font-medium text-[#555555]">
                          <GoPerson /> <span>{item.patientName}</span> |
                          <span>{item.gender}</span> |
                          <span>{item.age} Years</span>
                        </div>
                      </div>
                      <div className="xlg:text-base text-[13px] xxl:text-xl font-medium text-[#555555]">
                        +91 {item.mobileNumber}
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 xlg:gap-4">
                      <button className="priority-button bg-white">
                        Dr. {item.chooseDoctor}
                      </button>
                      <button className="priority-button text-[#00B252]">
                        <MdCurrencyRupee /> Paid {item.paymentDetails.paid || 0}
                      </button>
                      <button className="priority-button text-[#E40000]">
                        Due {item.paymentDetails.due || 0}
                      </button>
                      <button className="priority-button">
                        Total <MdCurrencyRupee />{" "}
                        {item.paymentDetails.total || 0}
                      </button>
                      <div className="flex flex-row items-center gap-2 xlg:gap-4">
                        <button className="xlg:text-2xl text-xl font-medium text-[#7F03FA]">
                          <BsEye />
                        </button>
                        <Link
                          to={`/patient/${item.patientId}/createinvoice`}
                          className="xlg:text-2xl text-xl font-medium text-[#00B252]"
                        >
                          <GoPlusCircle />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4">
          <button
            className="px-3 py-1 text-[#555555] mx-1"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {renderPagination()}
          <button
            className="px-3 py-1 text-[#555555] mx-1"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default Payments;
