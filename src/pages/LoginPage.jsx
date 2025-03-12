import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [role, setRole] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const otpRefs = useRef([]);

  const navigate = useNavigate();

  const { user, setUser, setFavClinic, setClinics } = useContext(AuthContext);

  useEffect(() => {
    if (!!user._id) {
      navigate("/doctor/dashboard");
    }
  }, [user]);

  const handleCheckNumber = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/checknumber`,
        {
          params: { phone: mobileNumber },
        }
      );

      if (response.data.exists) {
        sendOtp();
      } else {
        alert("Phone number not found. Please enter a valid number.");
      }
    } catch (error) {
      setError("Error checking mobile number.");
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    try {
      setLoading(true);
      setError("");

      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/send-otp`, {
        phone: mobileNumber,
      });

      setStep(2);
    } catch (error) {
      setError("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpBackspace = (index, e) => {
    if (e.key === "Backspace" && index > 0) {
      let newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      otpRefs.current[index - 1].focus();
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError("");

    const otpCode = otp.join("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/verify-with-otp`,
        { phone: mobileNumber, otp: otpCode }
      );

      console.log("Backend Response:", response.data);

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        if (user.role !== "super_admin") {
          setClinics(user.clinicId);
          setFavClinic(user.clinicId[0]);
        } else {
          const clinicResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/clinic/all`
          );
          const clinicData = clinicResponse.data;
          setClinics(clinicData);
          setFavClinic(clinicData[0]);
        }

        setUser(user);

        navigate("/doctor/dashboard");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Error verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen bg-[#EDF4F7] overflow-y-scroll bg-no-repeat bg-cover bg-center overflow-x-hidden items-center ">
      <div className="lg:w-[45%] xlg:w-[40%] xl:w-[35%] w-[95%] md:w-[60%] bg-white h-fit py-10 lg:px-6 xl:px-16 gap-8 flex flex-col boxsh rounded-lg text-black bg-transparent">
        <div className="flex flex-col justify-center items-center  gap-4 ">
          <img src="/images/demologo.svg" alt="" className="h-[3rem] " />
          <div className="xlg:text-lg text-base">
            Welcome back, Login to your account
          </div>
        </div>

        <div className="flex flex-col sm:gap-5 lg:gap-2 xl:gap-4">
          {step === 1 && (
            <div className="flex flex-col gap-2 ">
              <label
                className="xlg:text-lg text-base font-[400]"
                htmlFor="emailOrPhone"
              >
                Mobile Number
              </label>
              <input
                type="text"
                value={mobileNumber}
                maxLength={10}
                minLength={10}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="bg-[#EFEFEF] text-[#333333]  placeholder-[#00000033] rounded-sm xl:rounded-md h-[2.5rem] lg:h-[2.8rem] xl:h-[3rem] px-2 text-sm xl:text-lg outline-none"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <button
                onClick={handleCheckNumber}
                className="w-full bg-[#FF2722] buttonshinehover transition-colors duration-300 hover:bg-blue-500 text-white p-2 mt-3 rounded"
              >
                {loading ? "Checking..." : "Send OTP"}
              </button>
            </div>
          )}

          {step === 2 && (
            <>
              <label className="block text-sm mb-2">Enter OTP</label>
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    maxLength="1"
                    className="w-10 h-10 border-2 border-custom-blue rounded text-center text-lg focus:outline outline-green-800 "
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpBackspace(index, e)}
                    ref={(el) => (otpRefs.current[index] = el)}
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <button
                onClick={verifyOtp}
                className="w-full bg-blue-500 buttonshinehover transition-colors duration-300 hover:bg-green-500 text-white p-2 mt-3 rounded"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
