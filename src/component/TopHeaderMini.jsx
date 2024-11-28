import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const TopHeaderMini = () => {
  const navigate = useNavigate();
  const {
    user: { name, role, clinicId },
    setFavClinic,
    setUser,
    favClinic,
    clinics,
    setClinics,
  } = useContext(AuthContext);

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
          src="/images/dentitydentallogo.png"
          alt="Clinic Logo"
          className="h-[3rem] "
        />
      </Link>
      <div className="flex items-center justify-center relative group">
        <img
          src="/images/pro-pic.png"
          alt="profile picture"
          className="size-8"
        />
        <div className="absolute bg-white top-full px-3 py-2 rounded left-0 -translate-x-1/2 opacity-0 group-hover:opacity-100 duration-100 transition">
          <button onClick={handelLogOut} className="whitespace-nowrap">
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopHeaderMini;
