import React from "react";
import { RxCrossCircled } from "react-icons/rx";

const AddForm = ({ title, handleClose }) => {
  return (
    <div className="xlg:p-8 p-4 flex flex-col gap-16">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#333333]">
          Add new {title}
        </h1>
        <button onClick={handleClose}>
          <RxCrossCircled size={24} />
        </button>
      </div>
      <form onClick={handleSubmit} className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <input
              type="text"
              placeholder="Patient Name"
              className="priority-input"
            />
          </div>
          <div>
            <select type="text" className="priority-input">
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={handleClose}
              className=" h-[2.5rem] boxsh flex w-full justify-center items-center bg-white rounded-md text-base text-[#FA5503] font-medium"
            >
              Cancel
            </button>
            <button className=" h-[2.5rem] boxsh flex w-full justify-center items-center bg-custom-blue  rounded-md text-base text-[white] font-medium">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
