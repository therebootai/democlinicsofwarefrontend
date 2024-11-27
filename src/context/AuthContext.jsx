import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [clinics, setClinics] = useState([]);
  const [favClinic, setFavClinic] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const userResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const clinicResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/clinic/all`
      );
      const userData = userResponse.data;
      const clinicData = clinicResponse.data;
      if (userData.role !== "super_admin") {
        setClinics(userData.clinicId);
        setFavClinic(userData.clinicId[0]);
      } else {
        setClinics(clinicData);
        setFavClinic(clinicData[0]);
      }
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch current user", error);
    } finally {
      setLoading(false); // Stop loading when data fetching is complete
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [!user]);

  if (loading) {
    return (
      <div className="fullscreen-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, favClinic, setFavClinic, clinics, setClinics }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
