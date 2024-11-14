import React from "react";
import { RxCrossCircled } from "react-icons/rx";

const ViewAllPayment = ({ handleClose, patient }) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Payments for {patient.patientName}
        </h2>
        <button onClick={handleClose}>
          <RxCrossCircled size={24} />
        </button>
      </div>
      {patient.paymentDetails.map((payment, index) => (
        <div
          key={payment.paymentId}
          className="bg-white rounded p-4 mb-4 shadow"
        >
          <h3 className="font-bold">
            {index + 1}. {new Date(payment.createdAt).toLocaleDateString()} (
            {payment.paymentMethod})
          </h3>
          <table className="w-full mt-2 border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Item Name</th>
                <th className="border px-2 py-1">Charges</th>
              </tr>
            </thead>
            <tbody>
              {payment.paymentDetails.map((detail) => (
                <tr key={detail._id}>
                  <td className="border px-2 py-1">{detail.iteamName}</td>
                  <td className="border px-2 py-1">{detail.iteamCharges}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 text-right">
            <p>
              <strong>Total Paid:</strong> {payment.totalPaid}
            </p>
            <p>
              <strong>Due:</strong> {payment.anyDue}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewAllPayment;
