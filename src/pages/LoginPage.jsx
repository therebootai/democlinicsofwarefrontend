import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [emailorphone, setEmailorphone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");

  const [emailorphoneError, setEmailorphoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    setGeneratedCaptcha(captcha);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!emailorphone) {
      setEmailorphoneError("Email or phone is required.");
      isValid = false;
    } else {
      setEmailorphoneError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else {
      setPasswordError("");
    }
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/login`,
        {
          emailOrPhone: emailorphone,
          password,
        }
      );
      const { token, name } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);

      console.log("Login successful");
      navigate("/admin/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes("Invalid credentials")) {
          setEmailorphoneError("Invalid email or phone number.");
          setPasswordError("Invalid password.");
        } else {
          setEmailorphoneError(errorMessage);
          setPasswordError(errorMessage);
        }
      } else {
        console.error("Login failed", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen bg-[#EDF4F7] overflow-y-scroll bg-no-repeat bg-cover bg-center overflow-x-hidden items-center ">
      <div className="lg:w-[40%] xl:w-[35%] sm:w-[95%] md:w-[60%] bg-white h-fit py-10 lg:px-6 xl:px-16 gap-8 flex flex-col boxsh rounded-lg text-black bg-transparent">
        <div className="flex flex-col justify-center items-center  gap-4 ">
          <img
            src="/images/dentitydentallogo.png"
            alt=""
            className="h-[5rem]"
          />
          <div className="text-lg">Welcome back, Login to your account</div>
        </div>

        <form
          className="flex flex-col sm:gap-5 lg:gap-2 xl:gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 ">
            <label className="text-lg font-[400]">
              Mobile Number/ Email ID:
            </label>
            <input
              type="text"
              value={emailorphone}
              onChange={(e) => setEmailorphone(e.target.value)}
              className="bg-[#EFEFEF]  text-[#00000033] rounded-md sm:h-[2.5rem] xl:h-[3rem] p-2 text-lg outline-none"
            />
            {emailorphoneError && (
              <div className="text-red-500 text-sm mt-1">
                {emailorphoneError}
              </div>
            )}
          </div>
          <div className="flex flex-col  gap-2">
            <label className="text-lg font-[400]">Password:</label>
            <div className="flex sm:h-[2.5rem] xl:h-[3rem] w-full items-center justify-between  rounded-md bg-[#EFEFEF] ">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#EFEFEF]  rounded-md sm:h-[2.5rem] xl:h-[3rem] p-2 w-full text-[#00000033] text-lg border-none focus:outline-none"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="mr-4 h-5 w-5 text-[#00000033] cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {passwordError && (
              <div className="text-red-500 text-sm mt-1">{passwordError}</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-lg font-[400]">
              Choose Your Role
            </label>
            <select
              name=""
              id=""
              className="bg-[#EFEFEF]  rounded-md sm:h-[2.5rem] xl:h-[3rem] p-2 w-full text-[#00000033] text-lg border-none focus:outline-none"
            >
              <option value="">Choose Your Role</option>
              <option value="">Doctor</option>
              <option value="">Staf</option>
            </select>
          </div>
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-row gap-1 items-center text-lg font-medium">
              <input type="checkbox" name="" id="" />
              <span>Remember me</span>
            </div>
            <div className="text-[#27B3FF] text-lg font-medium">
              Forgot password?
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Link
              to={"/doctor/dashboard"}
              className="w-[30%] rounded-md sm:h-[2rem] xl:h-[2.5rem] flex justify-center items-center text-white text-base font-medium bg-[#27B3FF]"
            >
              {loading ? "Wait..." : "Login"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
