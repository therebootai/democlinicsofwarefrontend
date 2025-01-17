import { Route, Routes, useNavigate } from "react-router-dom";
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
import PatientPrescriptions from "./pages/prescription/PatientPrescription";
import EditPrescription from "./pages/prescription/EditPrescription";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import PatientTCCard from "./pages/PatientTCCard";
import Medicines from "./pages/Medicines";
import Stocks from "./pages/Stocks";

function App() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user._id) {
      navigate("/");
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/doctor/dashboard" element={<Dashboard />} />

      <Route path="/prescription/manage" element={<PrescriptionManage />} />

      <Route path="/doctor/patients" element={<Patients />} />

      <Route
        path="/prescription/:patientId/details/:prescriptionId"
        element={<PrescriptionDetails />}
      />
      <Route
        path="/prescription/:patientId/edit/:prescriptionId"
        element={<EditPrescription />}
      />
      <Route path="/patient/:patientId/estimate" element={<Estimate />} />
      <Route
        path="/patient/:patientId/createinvoice"
        element={<CreateInvoice />}
      />
      <Route
        path="/patient/:patientId/prescriptions"
        element={<PatientPrescriptions />}
      />
      <Route path="/patient/:patientId/tccard" element={<PatientTCCard />} />

      <Route path="/doctor/payments" element={<Payments />} />
      <Route
        path="/payments/add-payment-charges"
        element={<AddPaymentCharges />}
      />
      <Route path="/add-and-manage-medicines" element={<Medicines />} />
      <Route path="/add-and-manage-stocks" element={<Stocks />} />

      <Route
        path="/prescription/add/:patientId"
        element={<AddNewPrescription />}
      />
      <Route path="/forms" element={<Forms />} />
      <Route path="/directions" element={<Direction />} />
    </Routes>
  );
}

export default App;
