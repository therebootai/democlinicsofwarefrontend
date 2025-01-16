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

const Stocks = () => {
  const [stockProductName, setStockProductName] = useState("");
  const [productStock, setProductStock] = useState("");
  const [stocks, setStocks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editStockProductName, setEditStockProductName] = useState("");
  const [editProductStock, setEditProductStock] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1); // For arrow key navigation
  const { favClinic } = useContext(AuthContext);
  const [pageNumbers, setPageNumbers] = useState([]);

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch medications from the server
  const fetchMedications = async (page = 1, showOutOfStock = false) => {
    let params = { page, limit: 20, clinicId: favClinic._id };

    if (showOutOfStock) {
      params = { ...params, stockQuantity: 0 };
    }
    try {
      setLoading(true);
      const response = await axios.get(`${VITE_BASE_URL}/api/stocks`, {
        params: params,
      });

      if (response.data && response.data.stocks) {
        setStocks(response.data.stocks);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching stocks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedications(currentPage, showOutOfStock); // Fetch with search query if any
  }, [currentPage, favClinic, showOutOfStock]);

  // Handle search suggestion fetch
  const handleSearchChange = async (e) => {
    const searchQuery = e.target.value;
    setStockProductName(searchQuery);

    setCurrentPage(1);

    if (searchQuery.length >= 1) {
      try {
        const response = await axios.get(
          `${VITE_BASE_URL}/api/stocks/getdropdown`,
          {
            params: { query: searchQuery },
          }
        );
        setProductSuggestions(response.data);

        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setProductSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setStockProductName(suggestion.stockProductName);
    setProductSuggestions([]);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex < productSuggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : productSuggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && productSuggestions[activeIndex]) {
        handleSelectSuggestion(productSuggestions[activeIndex]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (stockProductName && productStock) {
      try {
        const formattedBrandName = capitalizeWords(stockProductName);
        const formattedComposition = capitalizeWords(productStock);
        const response = await axios.post(` ${VITE_BASE_URL}/api/stocks/add`, {
          stockProductName: formattedBrandName,
          stockQuantity: formattedComposition,
          clinicId: favClinic._id,
        });

        // Add the newly created medication to the list
        setStocks([response.data, ...stocks]);

        // Clear the input fields
        setStockProductName("");
        setProductStock("");
      } catch (error) {
        console.error("Error creating medication:", error);
      }
    }
  };

  // Handle edit for a medication
  const handleEdit = (index) => {
    const stockToEdit = stocks[index];
    setEditingIndex(index);
    setEditStockProductName(stockToEdit.stockProductName);
    setEditProductStock(stockToEdit.stockQuantity);
  };

  // Handle updating a medication
  const handleUpdate = async () => {
    const updatedStocks = {
      stockProductName: capitalizeWords(editStockProductName),
      stockQuantity: editProductStock,
    };

    try {
      const response = await axios.put(
        `${VITE_BASE_URL}/api/stocks/${stocks[editingIndex].stockId}`,
        updatedStocks
      );

      const updatedStock = stocks.map((stock, index) =>
        index === editingIndex ? response.data : stock
      );

      setStocks(updatedStock);
      setEditingIndex(null);
      setEditStockProductName("");
      setEditProductStock("");
    } catch (error) {
      console.error("Error updating medication:", error);
    }
  };

  const handleDelete = async (index) => {
    const stockId = stocks[index].stockId;

    const confirmed = window.confirm(
      "Are you sure you want to delete this stock?"
    );

    if (confirmed) {
      try {
        await axios.delete(`${VITE_BASE_URL}/api/stocks/${stockId}`);

        const updatedStocks = stocks.filter((_, i) => i !== index);
        setStocks(updatedStocks);
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
    setProductSuggestions([]); // Hide suggestions when the input loses focus
  };

  return (
    <AdminDashboardTemplate>
      <div>
        <TopHeaderMini />
      </div>
      <div className="flex flex-col gap-8 mt-8 xlg:px-8 px-4 ">
        {/* Medication Form */}
        <form
          className="w-full flex items-center gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 relative flex-1">
            <label className="text-[#555555] font-medium">Product Name</label>
            <input
              type="text"
              className="h-[4rem] px-4 bg-[#F5F5F5] w-full rounded-md outline-none"
              placeholder="Product Brand Name"
              value={stockProductName}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
            {/* Display suggestions */}
            {productSuggestions.length > 0 && (
              <ul className="bg-white shadow-md max-h-[200px] overflow-y-auto absolute top-full left-0 w-full">
                {productSuggestions.map((suggestion, index) => (
                  <li
                    key={suggestion.stockId}
                    className={`p-2 cursor-pointer ${
                      activeIndex === index ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    {suggestion.stockProductName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Other Inputs */}
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[#555555] font-medium">Product Stock</label>
            <input
              type="text"
              className="h-[4rem] px-4 bg-[#F5F5F5] w-full rounded-md outline-none"
              placeholder="Product Stock"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-[15%] flex justify-center items-center h-[4rem] self-end rounded border-2 border-custom-blue text-custom-blue transition-colors duration-300 ease-in-out bg-white hover:bg-custom-blue hover:text-white font-medium"
          >
            Submit
          </button>
        </form>

        <div className="flex w-full justify-end">
          <button
            type="button"
            className={`text-base font-medium p-2 xxl:text-lg border rounded-sm ${
              showOutOfStock
                ? "border-red-500 text-red-500"
                : "border-custom-blue text-custom-gray"
            }`}
            onClick={() => setShowOutOfStock(!showOutOfStock)}
          >
            Show Out of Stock only
          </button>
        </div>

        {/* Medication List */}
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-row border-b pb-4 text-base font-semibold xxl:text-xl border-[#0000001A]">
            <div className="w-[30%]">Product Name</div>
            <div className="w-[30%]">Quantity</div>
            <div className="w-[30%]">Created At</div>
            <div className="w-[30%]">Last Updated</div>
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
            stocks.map((item, index) => (
              <div
                key={item.stockId}
                className="flex flex-row gap-4 text-sm xxl:text-lg"
              >
                {editingIndex === index ? (
                  <>
                    <div className="w-[45%]">
                      <input
                        type="text"
                        value={editStockProductName}
                        className="p-2 text-black w-[80%] rounded outline-none bg-slate-100"
                        onChange={(e) =>
                          setEditStockProductName(e.target.value)
                        }
                      />
                    </div>
                    <div className="w-[45%]">
                      <input
                        type="text"
                        value={editProductStock}
                        className="p-2 text-black w-[80%] rounded outline-none bg-slate-100"
                        onChange={(e) => setEditProductStock(e.target.value)}
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
                    <div className="w-[30%]">{item.stockProductName}</div>
                    <div className="w-[30%]">{item.stockQuantity}</div>
                    <div className="w-[30%]">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                    <div className="w-[30%]">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </div>
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

export default Stocks;
