import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";

const AddNewPatient = ({ handleClose }) => {
  const [showMoreinputfiled, setShowMoreInputFiled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
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
          <div>
            <input
              type="text"
              placeholder="Mobile Number"
              className="priority-input"
            />
          </div>
          <div>
            <input type="text" placeholder="Age" className="priority-input" />
          </div>
          <div>
            <input
              type="text"
              placeholder="Location"
              className="priority-input"
            />
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
        <button
          onClick={() => setShowMoreInputFiled(!showMoreinputfiled)}
          className="w-fit h-[2.5rem] px-6 flex justify-center items-center rounded-md bg-transparent border border-custom-blue text-custom-blue text-base font-medium"
        >
          {showMoreinputfiled ? "▲ Show Less" : "▼ Show More"}
        </button>
        {showMoreinputfiled && (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  className="priority-input"
                />
              </div>
              <div>
                <select name="" id="" className=" priority-input">
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
                  className=" priority-input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <input
                  type="text"
                  placeholder="Exiting Disease"
                  className=" priority-input"
                />
              </div>
              <div>
                <select name="" id="" className=" priority-input">
                  <option value="">Diabetes</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Priority"
                  className=" priority-input"
                />
              </div>
              <div>
                <select name="" id="" className=" priority-input">
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
