import React, { useEffect, useState } from "react";
import axios from "axios";

const FormCard = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    console.log("Fetching data..."); // Log when useEffect runs

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/form/get`
        );
        console.log("Data fetched:", response.data); // Log fetched data
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching form data", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  if (!formData || formData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-3">
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
          <h1 className="text-sm text-[#888]  text-center">{form.title}</h1>

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
  );
};

export default FormCard;
