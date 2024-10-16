import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/doctors/Dashboard";
import Patients from "./pages/doctors/Patients";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/doctor/dashboard" element={<Dashboard />} />
      <Route path="/doctor/patients" element={<Patients />} />
    </Routes>
  );
}

export default App;
