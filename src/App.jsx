import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/doctos/Dashboard";
import Patients from "./pages/doctos/Patients";
import LoginPage from "./pages/LoginPage";
import Payments from "./pages/Payments";
import PrescriptionManage from "./pages/prescription/PrescriptionManage";
import PrescriptionDetails from "./pages/prescription/PrescriptionDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/doctor/dashboard" element={<Dashboard />} />

      <Route path="/prescription/manage" element={<PrescriptionManage />} />

      <Route path="/doctor/patients" element={<Patients />} />

      <Route
        path="/prescription/:id/details"
        element={<PrescriptionDetails />}
      />

      <Route path="/doctor/payments" element={<Payments />} />
    </Routes>
  );
}

export default App;
