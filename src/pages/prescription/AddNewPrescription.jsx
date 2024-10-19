import React from "react";
import TopHeaderMini from "../../component/TopHeaderMini";
import { IoClose } from "react-icons/io5";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

const AddNewPrescription = () => {
  const basicPatientDetails = [
    {
      label: "Pulse Rate",
      placeholder: "98",
      unit: "/min",
    },
    {
      label: "Blood Pressure",
      placeholder: "120",
      unit: "mmHg",
    },
    {
      label: "Blood Temperature",
      placeholder: "87",
      unit: "C",
    },
    {
      label: "Respiratory Rate",
      placeholder: "98",
      unit: "/min",
    },
    {
      label: "Body Width",
      placeholder: "55",
      unit: "Kg",
    },
    {
      label: "Body Height",
      placeholder: "8.7",
      unit: "cms",
    },
    {
      label: "Systolic Blood Pressure",
      placeholder: "122",
      unit: "mmHg",
    },
    {
      label: "Diastolic Blood Pressure",
      placeholder: "87",
      unit: "mmHg",
    },
    {
      label: "Hemoglobin",
      placeholder: "120",
      unit: "Unit",
    },
    {
      label: "Blood Sugar Random",
      placeholder: "120",
      unit: "Unit",
    },
    {
      label: "Blood Sugar Fasting",
      placeholder: "120",
      unit: "Unit",
    },
    {
      label: "Blood Sugar P.P",
      placeholder: "120",
      unit: "Unit",
    },
  ];

  const medicalHistory = [
    {
      label: "Diabetics Mellituos",
      id: "diabetics_mellituos",
      extra: "2 Years",
      check: true,
    },
    {
      label: "Tobacco",
      id: "tobacco",
      check: false,
    },
    {
      label: "Vomiting",
      id: "vomiting",
      check: false,
    },
    {
      label: "Hyperthyroidism",
      id: "hyperthyroidism",
      extra: "5 Month",
      check: true,
    },
    {
      label: "Hypothyroidism",
      id: "hypothyroidism",
      check: false,
    },
    {
      label: "Hypertension",
      id: "hypertension",
      extra: "2 Month",
      check: true,
    },
    {
      label: "Alcohol",
      id: "alcohol",
      check: false,
    },
    {
      label: "Diabetics Mellituos",
      id: "diabetics_mellituos",
      check: false,
    },
  ];

  const symtomInput = [
    "Pain In Tooth",
    "Since (1 Week)",
    "Severity (Mid)",
    "More.. (Back Pain)",
    "Text...",
    "Text...",
    "Text...",
    "Text...",
  ];

  const diagonosisInput = [
    "Pain In Tooth",
    "Since (1 Week)",
    "Status",
    "Text...",
    "Text...",
    "Text...",
  ];

  const mediCations = [
    "Name",
    "Dose",
    "Frequency",
    "Timing",
    "Duration",
    "Startfrom",
    "Instructions",
    "Qty",
  ];

  const labResults = [
    "RBC Count",
    "Dose",
    "Frequency",
    "Timing",
    "Duration",
    "Startfrom",
    "Instructions",
    "Qty",
  ];

  return (
    <>
      <TopHeaderMini />
      <div className="p-6 xl:p-8 flex gap-6 bg-[#EDF4F7]">
        <div className="py-6 px-6 xl:px-10">
          <div className="flex gap-5 py-9 border-b border-black/20">
            <div className="flex flex-col gap-5">
              <h3 className="text-black text-xl">Oral Findings</h3>
              <div className="bg-white flex px-6 py-8 rounded gap-2 min-w-[26.4vmax]">
                <input
                  type="text"
                  placeholder="Root Canal"
                  className="bg-transparent outline-none text-xl placeholder:text-[#d5d5d5] w-full"
                />
                <button
                  type="button"
                  className="px-3 py-1 rounded bg-[#f3f3f3] items-center justify-center text-sm text-custom-gray"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-black text-xl">Area</h3>
              <div className="bg-white flex px-6 py-8 rounded gap-2 min-w-[26.4vmax]">
                <span
                  type="button"
                  className="px-3 py-1 rounded bg-[#f3f3f3] items-center justify-center text-sm text-custom-gray gap-2 inline-flex"
                >
                  Lebial
                  <button type="button" className="text-custom-orange">
                    <IoClose />
                  </button>
                </span>
                <span
                  type="button"
                  className="px-3 py-1 rounded bg-[#f3f3f3] items-center justify-center text-sm text-custom-gray gap-2 inline-flex"
                >
                  Lebial
                  <button type="button" className="text-custom-orange">
                    <IoClose />
                  </button>
                </span>
                <input
                  type="text"
                  placeholder="Root Canal"
                  className="bg-transparent outline-none text-xl placeholder:text-[#d5d5d5] w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-black text-xl">Additional Notes</h3>
              <div className="bg-white flex px-6 py-8 rounded gap-2 min-w-[26.4vmax]">
                <input
                  type="text"
                  placeholder="Notes..."
                  className="bg-transparent outline-none text-xl placeholder:text-[#d5d5d5] w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-5 flex-1">
              <div className="h-7"></div>
              <div className="flex flex-col gap-2 justify-between flex-1">
                <button
                  type="button"
                  className="text-custom-green inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base min-w-[6vmax]"
                >
                  <CiCirclePlus />
                </button>
                <button
                  type="button"
                  className="text-[#E40000] inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base min-w-[6vmax]"
                >
                  <CiCircleMinus />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-b border-black/20 py-9 gap-6">
            <div className="flex gap-5">
              <div className="flex flex-col gap-5">
                <h3 className="text-black text-xl">Dental Procedure</h3>
                <div className="bg-white flex px-6 py-8 rounded gap-2 min-w-[26.4vmax]">
                  <input
                    type="text"
                    placeholder="Root Canal"
                    className="bg-transparent outline-none text-xl placeholder:text-[#d5d5d5] w-full"
                  />
                  <button
                    type="button"
                    className="px-3 py-1 rounded bg-[#f3f3f3] items-center justify-center text-sm text-custom-gray"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <h3 className="text-black text-xl">Area</h3>
                <div className="bg-white flex px-6 py-8 rounded gap-2 min-w-[26.4vmax]">
                  <span
                    type="button"
                    className="px-3 py-1 rounded bg-[#f3f3f3] items-center justify-center text-sm text-custom-gray gap-2 inline-flex"
                  >
                    32
                    <button type="button" className="text-custom-orange">
                      <IoClose />
                    </button>
                  </span>
                  <span
                    type="button"
                    className="px-3 py-1 rounded bg-[#f3f3f3] items-center justify-center text-sm text-custom-gray gap-2 inline-flex"
                  >
                    32
                    <button type="button" className="text-custom-orange">
                      <IoClose />
                    </button>
                  </span>
                  <input
                    type="text"
                    placeholder="Root Canal"
                    className="bg-transparent outline-none text-xl placeholder:text-[#d5d5d5] w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <h3 className="text-black text-xl">Additional Notes</h3>
                <div className="bg-white flex px-6 py-8 rounded gap-2 min-w-[26.4vmax]">
                  <input
                    type="text"
                    placeholder="Notes..."
                    className="bg-transparent outline-none text-xl placeholder:text-[#d5d5d5] w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 flex-1">
                <div className="h-7"></div>
                <div className="flex flex-col gap-2 justify-between flex-1">
                  <button
                    type="button"
                    className="text-custom-green inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base min-w-[6vmax]"
                  >
                    <CiCirclePlus />
                  </button>
                  <button
                    type="button"
                    className="text-[#E40000] inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base min-w-[6vmax]"
                  >
                    <CiCircleMinus />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-5">
                <div className="bg-white flex px-6 py-8 rounded gap-2 min-w-[26.4vmax]">
                  <input
                    type="text"
                    placeholder="Root Canal"
                    className="bg-transparent outline-none text-xl placeholder:text-[#d5d5d5] w-full"
                  />
                  <button
                    type="button"
                    className="px-3 py-1 rounded bg-[#f3f3f3] items-center justify-center text-sm text-custom-gray"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="bg-white flex px-6 py-8 rounded gap-2 min-w-[26.4vmax]">
                  <span
                    type="button"
                    className="px-3 py-1 rounded bg-[#f3f3f3] items-center justify-center text-sm text-custom-gray gap-2 inline-flex"
                  >
                    32
                    <button type="button" className="text-custom-orange">
                      <IoClose />
                    </button>
                  </span>
                  <span
                    type="button"
                    className="px-3 py-1 rounded bg-[#f3f3f3] items-center justify-center text-sm text-custom-gray gap-2 inline-flex"
                  >
                    32
                    <button type="button" className="text-custom-orange">
                      <IoClose />
                    </button>
                  </span>
                  <input
                    type="text"
                    placeholder="Root Canal"
                    className="bg-transparent outline-none text-xl placeholder:text-[#d5d5d5] w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="bg-white flex px-6 py-8 rounded gap-2 min-w-[26.4vmax]">
                  <input
                    type="text"
                    placeholder="Notes..."
                    className="bg-transparent outline-none text-xl placeholder:text-[#d5d5d5] w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 flex-1">
                <div className="flex flex-col gap-2 justify-between flex-1">
                  <button
                    type="button"
                    className="text-custom-green inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base min-w-[6vmax]"
                  >
                    <CiCirclePlus />
                  </button>
                  <button
                    type="button"
                    className="text-[#E40000] inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base min-w-[6vmax]"
                  >
                    <CiCircleMinus />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-9 flex gap-6 flex-wrap justify-between">
            {basicPatientDetails.map((data, index) => (
              <div className="flex flex-col gap-5" key={index}>
                <h3 className="text-black text-xl">{data.label}</h3>
                <div className="bg-white flex px-6 py-8 rounded gap-2 min-w-[28.5vmax]">
                  <input
                    type="text"
                    placeholder={data.placeholder}
                    className="bg-transparent outline-none text-xl text-custom-gray w-full"
                  />
                  <span
                    type="button"
                    className="px-3 py-1 items-center justify-center text-sm text-custom-gray"
                  >
                    {data.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-9">
            <h1 className="text-custom-gray text-xl font-semibold py-4 border-b border-black/20">
              Patient Medical History
            </h1>
            <div className="py-9 flex gap-3 justify-between flex-wrap">
              {medicalHistory.map((data, index) => (
                <div className="flex gap-3 items-center" key={index}>
                  <input
                    type="checkbox"
                    name=""
                    id={data.id}
                    checked={data.check}
                    className="size-full accent-custom-gray cursor-pointer"
                  />
                  <label
                    htmlFor={data.id}
                    className="whitespace-nowrap text-xl text-custom-gray cursor-pointer"
                  >
                    {data.label}
                  </label>
                  {data.extra && (
                    <span className="text-[#bcbcbc] text-sm py-1 px-3 rounded bg-white whitespace-nowrap">
                      {data.extra}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 pb-9">
              <input
                type="text"
                placeholder="Hypertension"
                className="py-3 px-5 bg-white rounded outline-none"
              />
              <input
                type="text"
                placeholder="2 Month"
                className="py-3 px-5 bg-white rounded outline-none"
              />
              <button
                type="button"
                className="px-2 py-4 inline-flex gap-2 items-center text-base text-custom-gray bg-white rounded"
              >
                <CiCirclePlus />
                Add More
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            <h1 className="text-custom-gray text-xl font-semibold py-4 border-b border-black/20">
              Symptom
            </h1>
            <div className="flex gap-6 pb-9">
              <div className="flex flex-wrap gap-4">
                {symtomInput.map((placeholder, index) => (
                  <input
                    type="text"
                    key={index}
                    placeholder={placeholder}
                    className="min-w-[20vmax] bg-white rounded py-4 px-6 outline-none text-xl"
                  />
                ))}
              </div>
              <div className="flex flex-col gap-5 flex-1 justify-between">
                <button
                  type="button"
                  className="text-[#E40000] inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base min-w-[6vmax] flex-1"
                >
                  <CiCircleMinus />
                </button>
                <button
                  type="button"
                  className="text-custom-green inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base min-w-[6vmax] flex-1"
                >
                  <CiCirclePlus />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            <h1 className="text-custom-gray text-xl font-semibold py-4 border-b border-black/20">
              Diagnosis
            </h1>
            <div className="flex gap-6 pb-9">
              <div className="flex flex-wrap gap-4">
                {diagonosisInput.map((placeholder, index) => (
                  <input
                    type="text"
                    key={index}
                    placeholder={placeholder}
                    className="min-w-[26.5vmax] bg-white rounded py-4 px-6 outline-none text-xl"
                  />
                ))}
              </div>
              <div className="flex flex-col gap-5 flex-1 justify-between">
                <button
                  type="button"
                  className="text-[#E40000] inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base min-w-[6vmax] flex-1"
                >
                  <CiCircleMinus />
                </button>
                <button
                  type="button"
                  className="text-custom-green inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base min-w-[6vmax] flex-1"
                >
                  <CiCirclePlus />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            <h1 className="text-custom-gray text-xl font-semibold py-4 border-b border-black/20">
              Medications
            </h1>
            <div className="flex gap-5 pb-9">
              <div className="flex flex-wrap gap-5">
                {mediCations.map((placeholder, index) => (
                  <input
                    type="text"
                    key={index}
                    placeholder={placeholder}
                    className="bg-white rounded py-4 px-6 outline-none text-xl"
                  />
                ))}
              </div>
              <div className="flex flex-col gap-5 flex-1 justify-between">
                <button
                  type="button"
                  className="text-[#E40000] inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base min-w-[6vmax] flex-1"
                >
                  <CiCircleMinus />
                </button>
                <button
                  type="button"
                  className="text-custom-green inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base min-w-[6vmax] flex-1"
                >
                  <CiCirclePlus />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            <h1 className="text-custom-gray text-xl font-semibold py-4 border-b border-black/20">
              Lab Results
            </h1>
            <div className="flex gap-5 pb-9">
              <div className="flex flex-wrap gap-5">
                {labResults.map((placeholder, index) => (
                  <input
                    type="text"
                    key={index}
                    placeholder={placeholder}
                    className="bg-white rounded py-4 px-6 outline-none text-xl"
                  />
                ))}
              </div>
              <div className="flex flex-col gap-5 flex-1 justify-between">
                <button
                  type="button"
                  className="text-[#E40000] inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base min-w-[6vmax] flex-1"
                >
                  <CiCircleMinus />
                </button>
                <button
                  type="button"
                  className="text-custom-green inline-flex items-center justify-center bg-white rounded px-4 py-2 text-base min-w-[6vmax] flex-1"
                >
                  <CiCirclePlus />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            <h1 className="text-custom-gray text-xl font-semibold py-4 border-b border-black/20">
              Refer to a Doctor
            </h1>
            <div className="bg-white w-full py-5 px-6 flex gap-2">
              <span
                type="button"
                className="px-3 py-1 rounded bg-[#f3f3f3] items-center justify-center text-sm text-custom-gray gap-2 inline-flex whitespace-nowrap"
              >
                Saikat Paul
                <button type="button" className="text-custom-orange">
                  <IoClose />
                </button>
              </span>
              <span
                type="button"
                className="px-3 py-1 rounded bg-[#f3f3f3] items-center justify-center text-sm text-custom-gray gap-2 inline-flex whitespace-nowrap"
              >
                Soma Paul
                <button type="button" className="text-custom-orange">
                  <IoClose />
                </button>
              </span>
              <input
                type="text"
                placeholder="Soma Paul"
                className="bg-transparent outline-none text-xl placeholder:text-[#d5d5d5] w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-9">
            <h1 className="text-custom-gray text-xl font-semibold py-4 border-b border-black/20">
              Advices
            </h1>
            <textarea
              placeholder="After eating use every night tooth brush"
              className="bg-white rounded outline-none py-5 px-6 min-h-[20vmax] resize-none text-sm text-custom-gray"
            ></textarea>
            <div className="flex flex-col gap-3">
              <div className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  name=""
                  id="mouth_gargle"
                  className="accent-custom-blue cursor-pointer"
                />
                <label
                  htmlFor="mouth_gargle"
                  className="whitespace-nowrap text-sm text-custom-gray cursor-pointer"
                >
                  Mouth Gargle
                </label>
              </div>
              <div className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  name=""
                  id="after_eating_use_every_night_tooth_brush"
                  className="accent-custom-blue cursor-pointer"
                />
                <label
                  htmlFor="after_eating_use_every_night_tooth_brush"
                  className="whitespace-nowrap text-sm text-custom-gray cursor-pointer"
                >
                  After eating use every night tooth brush
                </label>
              </div>
              <div className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  name=""
                  id="please_take_some_bed_rest"
                  className="accent-custom-blue cursor-pointer"
                />
                <label
                  htmlFor="please_take_some_bed_rest"
                  className="whitespace-nowrap text-sm text-custom-gray cursor-pointer"
                >
                  Please take some bed rest
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-black/20 py-9 bg-[#EDF4F7] flex justify-between">
        <div className="pl-20">
          <button
            type="button"
            className="text-xl font-semibold text-center text-white bg-custom-blue py-4 px-10 rounded"
          >
            Clear
          </button>
        </div>
        <div className="pr-20 flex gap-9">
          <Link
            to={"/prescription/:id/details"}
            className="text-xl font-semibold text-center text-white bg-custom-blue py-4 px-10 rounded"
          >
            Preview
          </Link>
          <button
            type="button"
            className="text-xl font-semibold text-center text-white bg-custom-blue py-4 px-10 rounded"
          >
            Print
          </button>
          <button
            type="button"
            className="text-xl font-semibold text-center text-white bg-custom-blue py-4 px-10 rounded"
          >
            Finish Prescription
          </button>
        </div>
      </div>
    </>
  );
};

export default AddNewPrescription;
