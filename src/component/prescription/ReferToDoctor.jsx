import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const ReferToDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      setDoctors([...doctors, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveDoctor = (index) => {
    setDoctors(doctors.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-9">
      <h1 className="text-custom-gray text-lg xl:text-xl font-semibold py-4 border-b border-black/20">
        Refer to a Doctor
      </h1>
      <div className="bg-white w-full py-5 px-6 flex gap-2 flex-row">
        {doctors.map((doctor, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded bg-[#f3f3f3] items-center justify-center text-sm text-custom-gray gap-2 inline-flex whitespace-nowrap"
          >
            {doctor}
            <button
              type="button"
              className="text-custom-orange"
              onClick={() => handleRemoveDoctor(index)}
            >
              <IoClose />
            </button>
          </span>
        ))}
        <input
          type="text"
          placeholder="Type a doctor's name and press Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bg-transparent outline-none text-lg xl:text-xl placeholder:text-[#d5d5d5] w-full"
        />
      </div>
    </div>
  );
};

export default ReferToDoctor;
