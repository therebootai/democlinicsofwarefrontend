import React from "react";
import { RxCrossCircled } from "react-icons/rx";

const AddForm = ({ handleClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="xlg:p-8 p-4 flex flex-col gap-16">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#333333]">Add new Form</h1>
        <button type="button" onClick={handleClose}>
          <RxCrossCircled size={24} />
        </button>
      </div>
      <form onClick={handleSubmit} className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <input type="text" placeholder="Title" className="priority-input" />
          </div>
          <div className="priority-input flex items-center">
            <input type="file" accept="image/*,application/pdf" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={handleClose}
              type="button"
              className=" h-[2.5rem] boxsh flex w-full justify-center items-center bg-white rounded-md text-base hover:bg-[#FA5503] hover:text-white text-[#FA5503] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" h-[2.5rem] boxsh flex w-full justify-center items-center bg-custom-blue hover:text-custom-blue hover:bg-white hover:border-2 border-custom-blue  rounded-md text-base text-[white] font-medium"
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
