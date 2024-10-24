import React, { useState } from "react";
import AdminDashboardTemplate from "../template/AdminDashboardTemplate";
import Topheader from "../component/Topheader";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdCurrencyRupee } from "react-icons/md";

const AddPaymentCharges = () => {
  const [nameOfItem, setNameOfItem] = useState("");
  const [charges, setCharges] = useState("");
  const [chargeList, setChargeList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editNameOfItem, setEditNameOfItem] = useState("");
  const [editCharges, setEditCharges] = useState("");

  // Add new charge to the table
  const handleSubmit = () => {
    if (nameOfItem && charges) {
      setChargeList([...chargeList, { name: nameOfItem, charge: charges }]);
      setNameOfItem("");
      setCharges("");
    }
  };

  // Edit existing charge
  const handleEdit = (index) => {
    const itemToEdit = chargeList[index];
    setEditingIndex(index);
    setEditNameOfItem(itemToEdit.name);
    setEditCharges(itemToEdit.charge);
  };

  // Save updated charge
  const handleUpdate = () => {
    const updatedChargeList = chargeList.map((item, index) =>
      index === editingIndex
        ? { name: editNameOfItem, charge: editCharges }
        : item
    );
    setChargeList(updatedChargeList);
    setEditingIndex(null);
    setEditNameOfItem("");
    setEditCharges("");
  };

  // Delete charge
  const handleDelete = (index) => {
    const updatedChargeList = chargeList.filter((_, i) => i !== index);
    setChargeList(updatedChargeList);
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
                  Name Of Iteam
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
          {/* <div className="h-[3.5rem] items-center flex px-4 w-full text-custom-gray text-3xl font-medium border-b border-[#00000033]">
            Charges List
          </div> */}
          <div className="flex flex-row border-b pb-4 text-sm xxl:text-xl border-[#0000001A]">
            <div className="w-[40%]">Name Of Iteam</div>
            <div className="w-[40%]">Charges</div>
            <div className="w-[20%]">Action</div>
          </div>
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
                        className="p-2 text-black w-full"
                        onChange={(e) => setEditNameOfItem(e.target.value)}
                      />
                    </div>
                    <div className="w-[40%]">
                      <input
                        type="text"
                        value={editCharges}
                        className="p-2 text-black w-full"
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
                    <div className="w-[40%]  ">{item.name}</div>
                    <div className="w-[40%] flex items-center">
                      <span>
                        <MdCurrencyRupee />
                      </span>
                      {item.charge}
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
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default AddPaymentCharges;
