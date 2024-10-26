import React, { useState, useEffect } from "react";
import AdminDashboardTemplate from "../template/AdminDashboardTemplate";
import Topheader from "../component/Topheader";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdCurrencyRupee } from "react-icons/md";
import axios from "axios";

const AddPaymentCharges = () => {
  const [nameOfItem, setNameOfItem] = useState("");
  const [charges, setCharges] = useState("");
  const [chargeList, setChargeList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editNameOfItem, setEditNameOfItem] = useState("");
  const [editCharges, setEditCharges] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchPayments = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${VITE_BASE_URL}/api/addpayment/get`, {
        params: { page, limit: 20 },
      });

      if (response.data && response.data.data) {
        setChargeList(response.data.data);
        setCurrentPage(response.data.page);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching payment charges:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(currentPage);
  }, [currentPage]);

  const handleSubmit = async () => {
    if (nameOfItem && charges) {
      try {
        const response = await axios.post(
          `${VITE_BASE_URL}/api/addpayment/create`,
          {
            iteamName: nameOfItem,
            iteamCharges: charges,
          }
        );

        setChargeList([response.data.data, ...chargeList]);

        setNameOfItem("");
        setCharges("");
      } catch (error) {
        console.error("Error creating payment:", error);
      }
    }
  };

  const handleEdit = (index) => {
    const itemToEdit = chargeList[index];
    setEditingIndex(index);
    setEditNameOfItem(itemToEdit.iteamName);
    setEditCharges(itemToEdit.iteamCharges);
  };

  const handleUpdate = async () => {
    const updatedCharge = {
      iteamName: editNameOfItem,
      iteamCharges: editCharges,
    };

    try {
      const response = await axios.put(
        `${VITE_BASE_URL}/api/addpayment/update/${chargeList[editingIndex].paymentId}`,
        updatedCharge
      );

      const updatedChargeList = chargeList.map((item, index) =>
        index === editingIndex ? response.data.data : item
      );

      setChargeList(updatedChargeList);
      setEditingIndex(null);
      setEditNameOfItem("");
      setEditCharges("");
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  const handleDelete = async (index) => {
    const paymentId = chargeList[index].paymentId;
    try {
      await axios.delete(`${VITE_BASE_URL}/api/addpayment/delete/${paymentId}`);

      const updatedChargeList = chargeList.filter((_, i) => i !== index);
      setChargeList(updatedChargeList);
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

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

  return (
    <AdminDashboardTemplate>
      <div>
        <Topheader />
      </div>
      <div className="flex flex-col gap-8 mt-8 xlg:px-8 px-4 ">
        <div className="flex flex-row gap-8">
          <div className="w-full flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 w-[80%]">
              <div className="flex flex-col gap-2 ">
                <label className="text-[#555555] font-medium">
                  Name Of Item
                </label>
                <input
                  type="text"
                  className="h-[4rem] px-4 bg-[#F5F5F5] w-full rounded-md outline-none"
                  placeholder="Name Of Item"
                  value={nameOfItem}
                  onChange={(e) => setNameOfItem(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#555555] font-medium">Charges</label>
                <input
                  type="text"
                  className="h-[4rem] px-4 bg-[#F5F5F5] w-full rounded-md outline-none"
                  placeholder="Charges"
                  value={charges}
                  onChange={(e) => setCharges(e.target.value)}
                />
              </div>
            </div>
            <button
              type="button"
              className="w-[15%] flex justify-center items-center h-[3rem] rounded border-2 border-custom-blue text-custom-blue bg-white hover:bg-custom-blue hover:text-white font-medium"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-row border-b pb-4 text-sm xxl:text-xl border-[#0000001A]">
            <div className="w-[40%]">Name Of Item</div>
            <div className="w-[40%]">Charges</div>
            <div className="w-[20%]">Action</div>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex flex-col">
              {chargeList.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row  text-xm xxl:text-lg gap-4"
                >
                  {editingIndex === index ? (
                    <>
                      <div className="w-[40%]">
                        <input
                          type="text"
                          value={editNameOfItem}
                          className="p-2 text-black w-[80%] rounded outline-none bg-slate-100"
                          onChange={(e) => setEditNameOfItem(e.target.value)}
                        />
                      </div>
                      <div className="w-[40%]">
                        <input
                          type="text"
                          value={editCharges}
                          className="p-2 text-black w-[80%] rounded outline-none bg-slate-100"
                          onChange={(e) => setEditCharges(e.target.value)}
                        />
                      </div>
                      <button
                        onClick={handleUpdate}
                        className="text-custom-green p-2 "
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="text-custom-orange p-2 "
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-[40%]  ">{item.iteamName}</div>
                      <div className="w-[40%] flex items-center">
                        <span>
                          <MdCurrencyRupee />
                        </span>
                        {item.iteamCharges}
                      </div>
                      <div className="flex w-[20%] justify-start items-start gap-4 p-2">
                        <button
                          onClick={() => handleEdit(index)}
                          className="text-custom-purple p-2 "
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-custom-orange p-2 "
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-6 text-sm font-medium justify-center items-center w-full mt-4">
            <button
              className="h-[2rem] flex justify-center items-center px-4 bg-custom-orange text-white hover:bg-blue-500 rounded"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="h-[2rem] flex justify-center items-center px-4 text-white bg-custom-orange hover:bg-blue-500 rounded"
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

export default AddPaymentCharges;
