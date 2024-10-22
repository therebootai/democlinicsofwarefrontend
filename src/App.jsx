import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/doctos/Dashboard";
import Patients from "./pages/doctos/Patients";
import LoginPage from "./pages/LoginPage";
import Payments from "./pages/Payments";
import PrescriptionManage from "./pages/prescription/PrescriptionManage";
import PrescriptionDetails from "./pages/prescription/PrescriptionDetails";
import AddNewPrescription from "./pages/prescription/AddNewPrescription";

import { Forms } from "./pages/Forms";

import Estimate from "./pages/Estimate";
import CreateInvoice from "./pages/CreateInvoice";

import AddPaymentCharges from "./pages/AddPaymentCharges";

import Direction from "./pages/Direction";

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
      <Route path="/patient/:id/estimate" element={<Estimate />} />
      <Route path="/patient/:id/createinvoice" element={<CreateInvoice />} />

      <Route path="/doctor/payments" element={<Payments />} />
      <Route
        path="/payments/add-payment-charges"
        element={<AddPaymentCharges />}
      />

      <Route path="/prescription/add" element={<AddNewPrescription />} />
      <Route path="/forms" element={<Forms />} />
      <Route path="/directions" element={<Direction />} />
    </Routes>
  );
}

export default App;
