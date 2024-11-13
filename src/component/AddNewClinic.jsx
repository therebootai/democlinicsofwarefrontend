import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCrossCircled } from "react-icons/rx";

const AddNewClinic = ({ handleClose, clinics }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [errormsg, setErrormsg] = useState("");
  const [messages, setMessages] = useState("");

  const handleInputChange = (event) => {
    setErrormsg("");
    setMessages("");
  };

  const onSubmit = async (data) => {
    console.log(errors);

    const clinicData = {
      ...data,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/clinic/add`,
        clinicData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessages("Clinic created successfully.");
      setErrormsg("");
      reset();
      handleClose();
    } catch (error) {
      console.error("Clinic adding error:", error);
      const errorMessage = error.response.data.message;
      if (errorMessage.includes("Clinic name already in use")) {
        setErrormsg("Clinic with same name already exists.");
      } else {
        setErrormsg("Error creating patient.");
      }
    }
  };

  return (
    <div className="xlg:p-8 p-4 flex flex-col gap-16">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#333333]">
          Create New Clinic
        </h1>
        <button onClick={handleClose}>
          <RxCrossCircled size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        {/* Clinic Name */}
        <div>
          <input
            type="text"
            placeholder="Clinic Name"
            {...register("clinic_name", {
              required: "Clinic Name is required",
            })}
            onChange={handleInputChange}
            className="priority-input"
          />
          {errors.clinicName && (
            <span className="error">{errors.clinicName.message}</span>
          )}
        </div>

        {/* Clinic Address */}
        <div>
          <input
            type="text"
            placeholder="Clinic Address"
            {...register("clinic_address", {
              required: "Clinic Address is required",
            })}
            onChange={handleInputChange}
            className="priority-input"
          />
          {errors.clinicAddress && (
            <span className="error">{errors.clinicAddress.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-6">
            <button
              type="button"
              onClick={handleClose}
              className="h-[2.5rem] transition-colors duration-300 ease-in-out boxsh flex w-full justify-center items-center bg-white rounded-md text-base hover:bg-[#FA5503] hover:text-white text-[#FA5503] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-[2.5rem] transition-colors duration-300 ease-in-out boxsh flex w-full justify-center items-center bg-custom-blue hover:text-custom-blue hover:bg-white hover:border-2 border-custom-blue rounded-md text-base text-white font-medium"
            >
              Submit
            </button>
          </div>
          <div className="text-red-600 text-sm font-medium">{errormsg}</div>
          <div className="text-green-600 text-sm font-medium">{messages}</div>
        </div>
      </form>
    </div>
  );
};

export default AddNewClinic;
