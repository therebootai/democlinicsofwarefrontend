import React, { useEffect, useState } from "react";
import AdminDashboardTemplate from "../template/AdminDashboardTemplate";
import Topheader from "../component/Topheader";
import { GoPlusCircle } from "react-icons/go";
import axios from "axios";

const Direction = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to control confirmation popup visibility
  const [selectedDirectionId, setSelectedDirectionId] = useState(null); // Store selected directionId for deletion

  const handleAddNewClick = () => {
    setShowAddForm(true);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/direction/get`
      );
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching form data", error);
    }
  };

  const handleDelete = async (directionId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/direction/delete/${directionId}`
      );
      if (response.data.success) {
        setFormData(
          formData.filter((form) => form.directionId !== directionId)
        );
      } else {
        alert("Failed to delete direction");
      }
    } catch (error) {
      console.error("Error deleting direction", error);
      alert("Error deleting direction");
    }
    setShowDeleteConfirmation(false); // Close confirmation dialog
  };

  const handleDeleteClick = (directionId) => {
    setSelectedDirectionId(directionId); // Store the directionId to be deleted
    setShowDeleteConfirmation(true); // Show confirmation dialog
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false); // Close confirmation dialog without deleting
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <AdminDashboardTemplate>
      <div className="">
        <Topheader
          isModalShow={showAddForm}
          setIsModalShow={setShowAddForm}
          modalToShow={"directionModal"}
          fetchData={fetchData}
        >
          <button
            onClick={handleAddNewClick}
            className="flex items-center bg-custom-orange hover:bg-custom-blue gap-3 rounded px-2 xlg:px-3 h-[2.5rem] text-xs xl:text-base xlg:text-sm text-[#F5F5F5] transition-colors duration-300 ease-in-out"
          >
            <GoPlusCircle />
            <h3>Upload Direction</h3>
          </button>
        </Topheader>
      </div>
      <div className="xl:p-8 p-4 flex flex-col gap-8">
        {formData.length === 0 ? (
          <div className="text-center text-gray-500">No Data Found</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {formData.map((form) => (
              <div
                key={form.directionId}
                className="relative p-2 h-full flex flex-col items-center justify-center bg-white boxsh rounded"
              >
                <div className="p-2">
                  {form.file.endsWith(".pdf") ? (
                    <iframe
                      src={form.file}
                      title={form.title}
                      className="w-full h-[15rem]"
                    ></iframe>
                  ) : (
                    <img src={form.file} alt={form.title} />
                  )}
                </div>
                <h1 className="text-sm text-[#888] text-center">
                  {form.title}
                </h1>

                <div className="flex justify-between gap-4 mt-2">
                  <button
                    type="button"
                    className="text-custom-blue text-sm text-center border border-custom-blue rounded py-1 xlg:py-2 px-2 xlg:px-4 hover:text-white hover:bg-custom-blue transition-colors duration-300 inline-flex flex-1 items-center justify-center"
                    onClick={() => window.open(form.file, "_blank")}
                  >
                    View
                  </button>
                  <a
                    href={form.file}
                    download
                    className="text-custom-blue text-sm text-center border border-custom-blue rounded py-1 xlg:py-2 px-2 xlg:px-4 hover:text-white hover:bg-custom-blue transition-colors duration-300 inline-flex flex-1 items-center justify-center"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => handleDeleteClick(form.directionId)} // Open delete confirmation dialog
                    type="button"
                    className="text-custom-blue text-sm text-center border border-custom-blue rounded py-1 xlg:py-2 px-2 xlg:px-4 hover:text-white hover:bg-custom-blue transition-colors duration-300 inline-flex flex-1 items-center justify-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Popup */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h3 className="text-lg font-semibold text-center mb-4">
              Are you sure you want to delete this direction?
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(selectedDirectionId)} // Proceed with delete
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete} // Close popup without deleting
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminDashboardTemplate>
  );
};

export default Direction;
