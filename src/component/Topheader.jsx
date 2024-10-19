import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import { FaCaretDown, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { GoPlusCircle } from "react-icons/go";
import { Link } from "react-router-dom";
import AddNewPatient from "./AddNewPatient";
import { IoIosLogOut } from "react-icons/io";

const Topheader = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileImageRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleAddNewClick = () => {
    setShowAddPatient(true);
  };

  const handleClose = () => {
    setShowAddPatient(false);
  };

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
    <header className="flex justify-between pb-5 p-4 border-b border-black/20">
      <div className="flex items-center bg-white gap-3 rounded px-3 h-[2.5rem]">
        <button
          onClick={handlePreviousDay}
          className="text-custom-gray text-xs xl:text-base xlg:text-sm"
        >
          <FaCaretLeft />
        </button>
        <span className="text-custom-gray text-xs xl:text-base xlg:text-sm">
          {formattedDate}
        </span>
        <button
          onClick={handleNextDay}
          className="text-custom-gray text-xs xl:text-base xlg:text-sm"
        >
          <FaCaretRight />
        </button>
      </div>
      <div className="flex items-center bg-white gap-3 rounded px-3 h-[2.5rem]">
        <h3 className="text-xs xl:text-base xlg:text-sm text-custom-gray">
          Today
        </h3>
      </div>
      <div className="flex items-center bg-white gap-3 rounded px-3 h-[2.5rem] relative xl:text-base text-xs xlg:text-sm text-custom-gray">
        <select className="block w-full appearance-none cursor-pointer truncate pe-2 focus:outline-none">
          <option value="Dentity Dental Rajar">Dentity Dental Rajarhat</option>
          <option value="Another Option 1">Another Option 1</option>
          <option value="Another Option 2">Another Option 2</option>
        </select>

        <FaCaretDown className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-600" />
      </div>
      <div className="flex items-center bg-white gap-3 rounded px-3 h-[2.5rem]">
        <input
          type="text"
          placeholder="Search"
          className="text-custom-gray text-xs xl:text-base xlg:text-sm placeholder:text-custom-gray placeholder-[#00000080] focus:outline-none"
        />
        <button
          type="button"
          className="text-xs xl:text-base xlg:text-sm text-custom-gray"
        >
          <IoSearch />
        </button>
      </div>
      <button
        onClick={handleAddNewClick}
        className="flex items-center bg-custom-orange gap-3 rounded px-3 h-[2.5rem] text-xs xl:text-base xlg:text-sm text-white"
      >
        <GoPlusCircle />
        <h3>Add Patient</h3>
      </button>
      <div className="flex items-center justify-center relative group">
        <span ref={profileImageRef} className="sm:w-[3rem] lg:w-fit">
          <img
            src="/images/pro-pic.png"
            alt=""
            className="h-[2rem] cursor-pointer"
            onClick={toggleProfileDropdown}
          />
          {isProfileDropdownOpen && (
            <div
              ref={profileDropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
            >
              <div className="px-4 py-2 text-gray-700">
                <span className="block text-sm font-semibold">Username</span>
                <span className="block text-sm">Admin</span>
              </div>
              <div className="border-t border-gray-200"></div>
              <Link
                to={"/"}
                className="w-full px-4 py-2 flex justify-between items-center text-left text-gray-700 hover:bg-gray-100"
              >
                Logout
                <IoIosLogOut />
              </Link>
            </div>
          )}
        </span>
      </div>
      <div
        className={`fixed top-0 right-0 h-screen w-[50%] overflow-scroll z-[100] custom-scroll  bg-[#EDF4F7] shadow-lg transform transition-transform duration-300 ease-in-out ${
          showAddPatient ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <AddNewPatient handleClose={handleClose} />
        </div>
      </div>
    </header>
  );
};

export default Topheader;
