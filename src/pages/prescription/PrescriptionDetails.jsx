import React from "react";
import TopHeaderMini from "../../component/TopHeaderMini";
import { FiEdit, FiPrinter } from "react-icons/fi";
import { AiOutlineDownload } from "react-icons/ai";
import { PiMoneyWavy } from "react-icons/pi";
import { TbMessageStar } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";

const PrescriptionDetails = () => {
  const buttonData = [
    {
      icon: <FiPrinter className="size-5" />,
      text: "Print",
    },
    {
      icon: <AiOutlineDownload className="size-5" />,
      text: "Download",
    },
    {
      icon: <PiMoneyWavy className="size-5" />,
      text: "Payment",
    },
    {
      icon: <TbMessageStar className="size-5" />,
      text: "Google Review Link",
    },
    {
      icon: <FaWhatsapp className="size-5" />,
      text: "Send WhatsApp",
    },
  ];

  const prescribeDetailsData = [
    {
      title: "Oral Findings",
      details: ["Root Canal", "Root Canal", "Root Canal"],
    },
    {
      title: "Dental Procedure",
      details: ["Root Canal", "Root Canal", "Root Canal"],
    },
    {
      title: "Vitals",
      details: [
        "Blood Pressure 120/88 mmHg",
        "Sugar 108 Unit",
        "Pulse Rate 98%",
      ],
    },
    {
      title: "Medical History",
      details: [
        "Active Sugar (2 Years)",
        "Active Asthma (3 Month)",
        "Active Sugar (2 Years)",
      ],
    },
  ];

  const prescribeTableData = [
    {
      medicines: {
        base: "1. Alzom 500",
        extra: "Amoxciciline 500mg",
      },
      dose: "1 Tab",
      frequency: {
        base: "0-1-0-1",
        extra: "After meal",
      },
      duration: "3 Days",
      quantity: "6 Tablets",
    },
    {
      medicines: {
        base: "2. Aldigesic P",
        extra: "Aceclofenac 100mg & Paracetamol 325mg",
      },
      dose: "1 Tab",
      frequency: {
        base: "0-1-0-0",
        extra: "After meal",
      },
      duration: "3 Days",
      quantity: "3 Tablets",
    },
    {
      medicines: {
        base: "3. Pan D",
        extra: "Pantoprazole 40mg & Dompridon 30mg",
      },
      dose: "1 Tab",
      frequency: {
        base: "1-0-0-0",
        extra: "Before meal",
      },
      duration: "10 Days",
      quantity: "6 Tablets",
    },
  ];

  return (
    <>
      <TopHeaderMini />
      <div className="p-8 flex gap-6 bg-[#EDF4F7]">
        <div className="rounded flex bg-white flex-col w-[30%] gap-4 py-7 px-6">
          <h2 className="text-custom-gray xlg:text-base text-sm">
            Prescription Save Successful
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="xl:text-base text-sm font-semibold text-custom-gray">
              Prakesh Chandra
            </h1>
            <p className="xlg:text-base text-sm text-[#9C9C9C]">
              +91 12356 67890
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {buttonData.map((button, index) => (
              <button
                key={index}
                type="button"
                className="inline-flex justify-center  items-center gap-2 rounded-3xl bg-custom-blue text-white px-6  h-[2.5rem]"
              >
                {button.icon}
                <span className="text-sm">{button.text}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-[70%] bg-white rounded flex-1">
          <div className="flex justify-between py-3 px-9 border-b border-black/20">
            <div className="flex items-center gap-5 justify-center">
              <img
                src="/icons/tooth-prescription.svg"
                alt="dental prescribe"
                width={71}
                height={71}
                className="size-[4vmax]"
              />
              <div className="flex flex-col gap-2">
                <h1 className="xlg:text-base text-sm font-semibold text-custom-gray">
                  Dr. Saikat Paul
                </h1>
                <p className="xlg:text-base text-sm text-[#9C9C9C]">MD, BDS</p>
              </div>
            </div>
            <div className="flex items-center gap-5 justify-center">
              <div className="flex flex-col ">
                <h1 className="xlg:text-base text-sm font-semibold text-custom-gray text-right">
                  Dentity Dental
                </h1>
                <p className="xlg:text-base text-sm text-[#9C9C9C] text-right">
                  Rajarhat Newtown, Kolkata
                </p>
              </div>
              <img
                src="/icons/hospital.svg"
                alt="dental prescribe"
                width={71}
                height={71}
                className="size-[3.8vmax]"
              />
            </div>
          </div>
          <div className="flex justify-between py-3 px-9 border-b border-black/20">
            <div className="flex flex-col gap-2">
              <h1 className="xlg:text-base text-sm font-semibold text-custom-gray">
                Prakesh Chandra
              </h1>
              <p className="xlg:text-base text-sm text-[#9C9C9C]">
                Male, 32 Years | +91 12356 67890
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="xlg:text-base text-sm font-semibold text-custom-gray text-right">
                Monday
              </h1>
              <p className="xlg:text-base text-sm font-semibold text-custom-gray   text-right">
                23/09/2024 | 02:45 PM
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-between py-5 px-9">
            {prescribeDetailsData.map((data, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <h2 className="text-black font-semibold xlg:text-base text-sm">
                  {data.title}
                </h2>
                <ul className="flex flex-col gap-1 list-disc ps-5">
                  {data.details.map((detail, count) => (
                    <li
                      className="text-[#969696] xlg:text-base text-sm"
                      key={count}
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto py-5">
            <table className="min-w-full table-auto ">
              <thead className="border-collapse border-b border-gray-300">
                <tr className="xlg:text-base text-sm">
                  <th className="text-left px-9 py-5 border-b border-gray-300">
                    Medications
                  </th>
                  <th className="text-left px-9 py-5 border-b border-gray-300">
                    Dose
                  </th>
                  <th className="text-left px-9 py-5 border-b border-gray-300">
                    Frequency
                  </th>
                  <th className="text-left px-9 py-5 border-b border-gray-300">
                    Duration
                  </th>
                  <th className="text-left px-9 py-5 border-b border-gray-300">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {prescribeTableData.map((data, index) => (
                  <tr
                    className="xlg:text-sm text-xs whitespace-nowrap"
                    key={index}
                  >
                    <td className="px-9 py-5 text-custom-gray">
                      <span className="font-semibold">
                        {data.medicines.base}
                      </span>
                      <br />
                      {data.medicines.extra && (
                        <span className="xlg:text-sm text-xs text-custom-gray">
                          {data.medicines.extra}
                        </span>
                      )}
                    </td>
                    <td className="px-9 py-5 text-custom-gray">{data.dose}</td>
                    <td className="px-9 py-5 text-custom-gray">
                      {data.frequency.base}
                      <br />
                      {data.frequency.extra && (
                        <span className="xlg:text-sm text-xs text-custom-gray">
                          {data.frequency.extra}
                        </span>
                      )}
                    </td>
                    <td className="px-9 py-5 text-custom-gray">
                      {data.duration}
                    </td>
                    <td className="px-9 py-5 text-custom-gray">
                      {data.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2 py-5 px-9">
            <h2 className="text-black font-semibold xlg:text-base text-sm">
              For Advices
            </h2>
            <ul className="flex flex-col gap-1 list-disc ps-5">
              <li className="text-[#969696] xlg:text-sm text-xs">
                After eating use every night tooth brush
              </li>
              <li className="text-[#969696] xlg:text-sm text-xs">
                Pleases take some bed rest
              </li>
            </ul>
          </div>
          <div className="pb-5 pt-[17vmax] px-9 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <button
                type="button"
                className="inline-flex justify-center items-center gap-2 rounded-3xl bg-custom-blue text-white px-5 py-2"
              >
                <FiEdit className="size-3" />
                <span className="text-base">Edit Prescription</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center items-center gap-2 rounded-3xl bg-custom-blue text-white px-5 py-2"
              >
                <FiPrinter className="size-3" />
                <span className="text-base">Print</span>
              </button>
            </div>
            <img
              src="/images/signature.svg"
              alt="signature"
              height={40}
              width={180}
              className="w-[12.5vmax]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrescriptionDetails;
