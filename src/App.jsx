import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/doctors/Dashboard";
import PrescriptionManage from "./pages/PrescriptionManage";

import "./App.css";

import Patients from "./pages/doctors/Patients";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/doctor/dashboard" element={<Dashboard />} />

      <Route path="/prescription/manage" element={<PrescriptionManage />} />

      <Route path="/doctor/patients" element={<Patients />} />

    </Routes>
  );
}

export default App;
