import React, { useEffect, useState } from "react";
import AdminDashboardTemplate from "../template/AdminDashboardTemplate";
import Topheader from "../component/Topheader";
import { GoPlusCircle } from "react-icons/go";
import axios from "axios";

const Direction = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddNewClick = () => {
    setShowAddForm(true);
  };

  const [formData, setFormData] = useState([]);
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
            className="flex items-center bg-custom-orange hover:bg-custom-blue gap-3 rounded px-2 xlg:px-3  h-[2.5rem] text-xs xl:text-base xlg:text-sm text-[#F5F5F5] transition-colors duration-300 ease-in-out"
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
          <div className="grid grid-cols-4 gap-6">
            {formData.map((form) => (
              <div
                key={form._id}
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
                    <img src={form.file} alt={form.title} className=" " />
                  )}
                </div>
                <h1 className="text-sm text-[#888]  text-center">
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminDashboardTemplate>
  );
};

export default Direction;
