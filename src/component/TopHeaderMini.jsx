import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { IoIosLogOut } from "react-icons/io";

const TopHeaderMini = () => {
  const profileImageRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const {
    user: { name, role, clinicId },
    setFavClinic,
    setUser,
    favClinic,
    clinics,
    setClinics,
  } = useContext(AuthContext);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handelLogOut = () => {
    localStorage.removeItem("token");
    setUser({});
    setFavClinic({});
    setClinics([]);
    navigate("/");
  };
  return (
    <header className="flex justify-between px-20 py-3 border-b border-black/20 bg-white">
      <Link to="/doctor/dashboard">
        <img
          src="/images/demologo.svg"
          alt="Clinic Logo"
          className="xl:h-[2rem] h-[1.5rem] "
        />
      </Link>
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
                <span className="block text-sm font-semibold capitalize">
                  {name}
                </span>
                <span className="block text-sm capitalize">
                  {role.split("_").join(" ")}
                </span>
              </div>
              <div className="border-t border-gray-200"></div>

              <button
                onClick={handelLogOut}
                type="button"
                className="w-full px-4 py-2 flex justify-between items-center text-left text-gray-700 hover:bg-gray-100"
              >
                Logout
                <IoIosLogOut />
              </button>
            </div>
          )}
        </span>
      </div>
    </header>
  );
};

export default TopHeaderMini;
