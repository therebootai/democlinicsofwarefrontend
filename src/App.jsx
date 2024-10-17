import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/doctors/Dashboard";

import "./App.css";

import Patients from "./pages/doctors/Patients";
import PrescriptionManage from "./pages/prescription/PrescriptionManage";
import PrescriptionDetails from "./pages/prescription/PrescriptionDetails";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/doctor/dashboard" element={<Dashboard />} />

      <Route path="/prescription/manage" element={<PrescriptionManage />} />

      <Route path="/doctor/patients" element={<Patients />} />

      <Route path="/prescription/:id/details" element={<PrescriptionDetails/>} />

    </Routes>
  );
}

export default App;
