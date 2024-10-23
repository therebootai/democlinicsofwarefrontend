import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios"; // Import axios for API calls

const AddNewPatient = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showMoreinputfiled, setShowMoreInputFiled] = useState(false);

  // Handle form submission
  const onSubmit = async (data) => {
    console.log("Submitting Data:", data);
    data.age = parseInt(data.age, 10);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/patients/create`,
        data,
        {
          headers: {
            "Content-Type": "application/json", // Ensure this is set
          },
        }
      );
      console.log("Patient created:", response.data);
    } catch (error) {
      console.error("Error creating patient:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  return (
    <div className="xlg:p-8 p-4 flex flex-col gap-16">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#333333]">
          Create New Patient
        </h1>
        <button onClick={handleClose}>
          <RxCrossCircled size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <input
              type="text"
              placeholder="Patient Name"
              {...register("patientName", { required: true })}
              className="priority-input"
            />
            {errors.patientName && (
              <span className="error">Patient Name is required</span>
            )}
          </div>

          {/* Gender */}
          <div>
            <select
              {...register("gender", { required: true })}
              className="priority-input"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            {errors.gender && <span className="error">Gender is required</span>}
          </div>

          {/* Mobile Number */}
          <div>
            <input
              type="text"
              placeholder="Mobile Number"
              {...register("mobileNumber", { required: true })}
              className="priority-input"
            />
            {errors.mobileNumber && (
              <span className="error">Mobile Number is required</span>
            )}
          </div>

          {/* Age */}
          <div>
            <input
              type="text"
              placeholder="Age"
              {...register("age", { required: true })}
              className="priority-input"
            />
            {errors.age && <span className="error">Age is required</span>}
          </div>

          {/* Location */}
          <div>
            <input
              type="text"
              placeholder="Location"
              {...register("location", { required: true })}
              className="priority-input"
            />
            {errors.location && (
              <span className="error">Location is required</span>
            )}
          </div>

          {/* Choose Doctor */}
          <div>
            <select {...register("chooseDoctor")} className="priority-input">
              <option value="">Select Doctor</option>
              <option value="Doctor1">Doctor1</option>
              <option value="Doctor2">Doctor2</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <button
              type="button"
              onClick={handleClose}
              className=" h-[2.5rem] boxsh flex w-full justify-center items-center bg-white rounded-md text-base hover:bg-[#FA5503] hover:text-white text-[#FA5503] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit" // Changed to "submit" for the form to be submitted
              className=" h-[2.5rem] boxsh flex w-full justify-center items-center bg-custom-blue hover:text-custom-blue hover:bg-white hover:border-2 border-custom-blue  rounded-md text-base text-[white] font-medium"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Show More / Show Less Button */}
        <button
          type="button"
          onClick={() => setShowMoreInputFiled(!showMoreinputfiled)}
          className="w-fit h-[2.5rem] px-6 flex justify-center items-center rounded-md bg-transparent border border-custom-blue hover:text-white hover:bg-custom-blue text-custom-blue text-base font-medium"
        >
          {showMoreinputfiled ? "▲ Show Less" : "▼ Show More"}
        </button>

        {/* More Inputs */}
        {showMoreinputfiled && (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  {...register("address")}
                  className="priority-input"
                />
              </div>
              <div>
                <select {...register("city")} className="priority-input">
                  <option value="">City</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Asansol">Asansol</option>
                  <option value="Durgapur">Durgapur</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Pin"
                  {...register("pinCode")}
                  className="priority-input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <input
                  type="text"
                  placeholder="Exiting Disease"
                  {...register("exitingDisease")}
                  className="priority-input"
                />
              </div>
              <div>
                <select {...register("diabetes")} className="priority-input">
                  <option value="">Diabetes</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Priority"
                  {...register("priority")}
                  className="priority-input"
                />
              </div>
              <div>
                <select
                  {...register("paymentMethod")}
                  className="priority-input"
                >
                  <option value="">Payment Method</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddNewPatient;
