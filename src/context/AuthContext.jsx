import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [favClinic, setFavClinic] = useState({});
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = response.data;
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch current user", error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, favClinic, setFavClinic }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
