import { Route, Routes } from "react-router-dom";

import "./App.css";
import Dashboard from "./pages/doctos/Dashboard";
import PrescriptionManage from "./pages/PrescriptionManage";
import Patients from "./pages/doctos/Patients";
import LoginPage from "./pages/LoginPage";
import Payments from "./pages/Payments";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/doctor/dashboard" element={<Dashboard />} />

      <Route path="/prescription/manage" element={<PrescriptionManage />} />

      <Route path="/doctor/patients" element={<Patients />} />
      <Route path="/doctor/payments" element={<Payments />} />
    </Routes>
  );
}

export default App;
