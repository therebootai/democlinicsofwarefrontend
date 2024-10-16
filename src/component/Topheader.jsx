import React, { useState } from "react";
import dayjs from "dayjs";
import { FaCaretDown, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { GoPlusCircle } from "react-icons/go";
import { Link } from "react-router-dom";

const Topheader = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const handlePreviousDay = () => {
    setCurrentDate(currentDate.subtract(1, "day"));
  };

  // Navigate to next day
  const handleNextDay = () => {
    setCurrentDate(currentDate.add(1, "day"));
  };

  // Format the date to "Today, 10 Sep 24"
  const formattedDate = currentDate.format("dddd, DD MMM YY");

  return (
    <header className="flex justify-between pb-7 border-b border-black/20">
      <div className="flex items-center bg-white gap-3 rounded px-3 py-2">
        <button
          onClick={handlePreviousDay}
          className="text-custom-gray text-base"
        >
          <FaCaretLeft />
        </button>
        <span className="text-custom-gray text-base">{formattedDate}</span>
        <button onClick={handleNextDay} className="text-custom-gray text-base">
          <FaCaretRight />
        </button>
      </div>
      <div className="flex items-center bg-white gap-3 rounded px-3 py-2">
        <h3 className="text-base text-custom-gray">Today</h3>
      </div>
      <div className="flex items-center bg-white gap-3 rounded px-3 py-2 relative text-custom-gray">
        <select className="block w-full appearance-none cursor-pointer truncate pe-2 focus:outline-none">
          <option value="Dentity Dental Rajar">Dentity Dental Rajarhat</option>
          <option value="Another Option 1">Another Option 1</option>
          <option value="Another Option 2">Another Option 2</option>
        </select>

        <FaCaretDown className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-600" />
      </div>
      <div className="flex items-center bg-white gap-3 rounded px-3 py-2">
        <input
          type="text"
          placeholder="Search"
          className="text-custom-gray text-base placeholder:text-custom-gray placeholder:text-base focus:outline-none"
        />
        <button type="button" className="text-base text-custom-gray">
          <IoSearch />
        </button>
      </div>
      <div className="flex items-center bg-custom-orange gap-3 rounded px-3 py-2 text-base text-white">
        <GoPlusCircle />
        <h3>Add Patient</h3>
      </div>
      <div className="flex items-center justify-center relative group">
        <img
          src="/images/pro-pic.png"
          alt="profile picture"
          className="size-8"
        />
        <div className="absolute bg-white top-full px-3 py-2 rounded left-0 -translate-x-1/2 opacity-0 group-hover:opacity-100 duration-100 transition">
          <Link to="/" className="whitespace-nowrap">
            Sign Out
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Topheader;
