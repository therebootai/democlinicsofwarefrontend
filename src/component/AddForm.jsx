import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { RxCrossCircled } from "react-icons/rx";

const AddForm = ({ handleClose, headerText }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Submitting Data:", data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("file", data.file[0]);

    const uri =
      headerText === "Form"
        ? `${import.meta.env.VITE_BASE_URL}/api/form/add`
        : `${import.meta.env.VITE_BASE_URL}/api/direction/add`;
    try {
      const response = await axios.post(uri, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure this is set
        },
      });
      console.log("File added:", response.data);
    } catch (error) {
      console.error("Error adding file:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  return (
    <div className="xlg:p-8 p-4 flex flex-col gap-16">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#333333]">
          Add new {headerText}
        </h1>
        <button type="button" onClick={handleClose}>
          <RxCrossCircled size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <input
              type="text"
              placeholder="Title"
              className="priority-input"
              {...register("title", { required: true })}
            />
            {errors.title && <span className="error">Title is required</span>}
          </div>
          <div className="priority-input flex items-center relative">
            <input
              type="file"
              accept="image/*,application/pdf"
              {...register("file", { required: true })}
            />
            {errors.file && (
              <span className="error absolute -bottom-[45%] left-0">
                File is required
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={handleClose}
              type="button"
              className=" h-[2.5rem] transition-colors duration-300 ease-in-out boxsh flex w-full justify-center items-center bg-white rounded-md text-base hover:bg-[#FA5503] hover:text-white text-[#FA5503] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" h-[2.5rem] transition-colors duration-300 ease-in-out boxsh flex w-full justify-center items-center bg-custom-blue hover:text-custom-blue hover:bg-white hover:border-2 border-custom-blue  rounded-md text-base text-[white] font-medium"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
