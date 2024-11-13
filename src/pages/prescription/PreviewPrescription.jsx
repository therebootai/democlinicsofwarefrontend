import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

const PreviewPrescription = ({
  previewData,
  prescriptiondate,
  prescriptiontime,
}) => {
  if (!previewData) {
    return <div>Loading...</div>; // Add a loading state if data isn't ready
  }

  return (
    <div className="flex flex-col gap-4">
      {/* First Page of Prescription */}
      <div className="bg-white flex flex-col a4-container">
        {/* Header Section */}
        <div className="flex flex-row gap-4 p-2 w-full items-center">
          <div className="w-[20%]">
            <img
              src="/images/dentitydentallogo.png"
              alt="Dentity Dental"
              className="w-fit h-[4rem]"
            />
          </div>
          <div className="flex flex-col w-full gap-2 items-center">
            <h1 className="text-lg font-semibold text-[#333333]">
              A Unit of Multiplicity Dental Clinic Chain in Kolkata & W.B.
            </h1>
            <div className="grid grid-cols-2 gap-x-8 text-sm font-medium text-[#000000] ">
              <div>Name: {previewData.patientName || "No name provided"}</div>
              <div>
                Age: {previewData.age || "Not available"} | Gender:{" "}
                {previewData.gender || "Not available"}
              </div>
              <div>Date: {prescriptiondate}</div>
              <div>Time: {prescriptiontime}</div>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="bg-[#3780EF] blue-padding p-1 px-6 text-base/[0px] font-semibold text-white grid grid-cols-3 justify-center overflow-visible">
          <div className="flex items-center gap-2">
            <div className="p-[0.2rem] text-sm/[0px] action-column rounded-full bg-white text-[#3780EF]">
              <TbWorldWww />
            </div>
            <div>Our Branches</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-[0.2rem] text-sm/[0px] action-column rounded-full bg-white text-[#3780EF]">
              <TbWorldWww />
            </div>
            <div>www.dentitydental.in</div>
          </div>
          <div className="flex pdf-center gap-2">
            <span className="p-[0.2rem] text-sm/[0px] action-column rounded-full bg-white text-[#3780EF]">
              <FaPhoneAlt />
            </span>
            9051553253
          </div>
        </div>

        {/* Clinics Info Section */}
        <div className="py-3 flex flex-row gap-2">
          <div className="flex flex-col w-[40%] gap-2 justify-between">
            {previewData?.ourclinics?.map((item, index) => (
              <div
                className={`flex flex-row gap-2 font-albertsans text-sm ${
                  index % 2 === 0
                    ? "bg-gradient-to-r from-[#E4F6FF] to-[#FFFFFF]"
                    : "bg-transparent"
                }`}
                key={index}
              >
                <div className="w-[0.5rem] h-full bg-[#3780EF]" />
                <div className="p-1 flex text-xs flex-col w-full max-w-[90%] ">
                  <span>{item.address}</span>
                  <span>Mobile: {item.mobileno}</span>
                  <span>{item.additionaldata}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Medical History Section */}
          <div className="bg-[#F8F8F8] h-full p-4 w-[60%] rounded-xl mx-4 flex flex-col">
            <div className="flex flex-col gap-2 h-[10rem]">
              <h1 className="text-base/[0px] text-[#3B3B3B]">
                Medical History
              </h1>
              <div className="flex flex-col">
                {previewData?.medicalHistory?.length > 0 ? (
                  previewData.medicalHistory.map((history, index) => (
                    <div key={index} className="flex flex-row text-xs gap-4">
                      <h3>{history.medicalHistoryName}</h3>
                      <h3>{history.duration}</h3>
                      <div className="flex flex-row gap-2">
                        {history?.medicalHistoryMedicine?.map(
                          (medicine, idx) => (
                            <div key={idx}>{medicine}, </div>
                          )
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No medical history available.</p> // Fallback for empty array
                )}
              </div>
            </div>

            {/* Chief Complaint Section */}
            <div className="flex flex-col gap-2 min-h-[7rem]">
              <h1 className="text-base/[0px] text-[#3B3B3B]">CC</h1>
              <div className="flex flex-col">
                {previewData?.chiefComplain?.length > 0 ? (
                  previewData.chiefComplain.map((cc, index) => (
                    <p className="text-sm" key={index}>
                      {cc.chiefComplainName}
                    </p>
                  ))
                ) : (
                  <p>No chief complaints available.</p> // Fallback for empty array
                )}
              </div>
            </div>

            {/* On Examination Section */}
            <div className="flex flex-col gap-2 min-h-[12rem]">
              <h1 className="text-base/[0px] text-[#3B3B3B]">O/E</h1>
              <div className="flex flex-col">
                {previewData?.onExamination?.length > 0 ? (
                  previewData.onExamination.map((oe, index) => (
                    <div key={index} className="flex flex-wrap text-sm gap-4">
                      <h3>{oe.onExaminationName}</h3>
                      <p>{oe.onExaminationArea?.join(", ")}</p>
                      <p>{oe.onExaminationAdditionalNotes}</p>
                    </div>
                  ))
                ) : (
                  <p>No on examination data available.</p> // Fallback for empty array
                )}
              </div>
            </div>

            {/* Investigation Section */}
            <div className="flex flex-col gap-2 min-h-[8rem]">
              <h1 className="text-base/[0px] text-[#3B3B3B]">Investigation</h1>
              <div className="flex flex-col">
                {previewData?.investigation?.length > 0 ? (
                  previewData.investigation.map((inv, index) => (
                    <p className="text-sm" key={index}>
                      {inv.investigationName}
                    </p>
                  ))
                ) : (
                  <p>No investigations available.</p> // Fallback for empty array
                )}
              </div>
            </div>

            {/* Radiography Section */}
            <div className="flex flex-col gap-2 min-h-[10rem]">
              <h1 className="text-base/[0px] text-[#3B3B3B]">Radiography</h1>
              <div className="grid grid-cols-2 gap-2">
                {previewData?.radiography?.length > 0 ? (
                  previewData.radiography.map((rad, index) => (
                    <p className="text-sm" key={index}>
                      {rad.radiographyName}
                    </p>
                  ))
                ) : (
                  <p>No radiography data available.</p> // Fallback for empty array
                )}
              </div>
            </div>

            {/* Advice Section */}
            <div className="flex flex-col gap-2 min-h-[12rem]">
              <h1 className="text-base/[0px] text-[#3B3B3B]">Advice</h1>
              <div className="">
                {previewData?.advices?.length > 0 ? (
                  previewData.advices.map((advice, index) => (
                    <p className="text-sm" key={index}>
                      {advice.advicesName}
                    </p>
                  ))
                ) : (
                  <p>No advices available.</p> // Fallback for empty array
                )}
              </div>
            </div>

            {/* Medications Section */}
          </div>
        </div>
      </div>
      <div className="bg-white a4-container">
        {/* Header Section */}
        <div className="flex flex-row gap-4 p-2 w-full items-center">
          <div className="w-[20%]">
            <img
              src="/images/dentitydentallogo.png"
              alt="Dentity Dental"
              className="w-fit h-[4rem]"
            />
          </div>
          <div className="flex flex-col w-full gap-2 items-center">
            <h1 className="text-lg font-semibold text-[#333333]">
              A Unit of Multiplicity Dental Clinic Chain in Kolkata & W.B.
            </h1>
            <div className="grid grid-cols-2 gap-x-8 text-sm font-medium text-[#000000] ">
              <div>Name: {previewData.patientName || "No name provided"}</div>
              <div>
                Age: {previewData.age || "Not available"} | Gender:{" "}
                {previewData.gender || "Not available"}
              </div>
              <div>Date: {prescriptiondate}</div>
              <div>Time: {prescriptiontime}</div>
            </div>
          </div>
        </div>
        {/* Medications Section */}
        {/* Medications Section */}
        <div className="w-full flex flex-col gap-3">
          <h1 className="px-4 pt-4 text-2xl text-custom-blue font-medium">
            Rx
          </h1>

          <div className="border-b w-full border-gray-300 px-4 py-4">
            <div className="xlg:text-base text-sm flex flex-row w-full">
              <div className="w-[40%]">Medications</div>
              <div className="w-[10%]">Dose</div>
              <div className="w-[20%]">Frequency</div>
              <div className="w-[20%]">Duration</div>
              <div className="w-[10%]">Quantity</div>
            </div>
          </div>

          {/* Medication List */}
          <div className="flex flex-col gap-4 px-4">
            {previewData?.medications &&
            Array.isArray(previewData.medications) ? (
              previewData.medications.map((med, index) => (
                <div
                  className="xlg:text-sm text-xs flex flex-row w-full"
                  key={index}
                >
                  {/* Medicine Name and Composition */}
                  <div className="w-[40%] text-custom-gray flex flex-col">
                    <span className="font-semibold">
                      {med.medicineBrandName || "No brand name"}
                    </span>
                    <div>
                      {med.medicineComposition
                        ? med.medicineComposition
                        : "No composition available"}
                      , {med.medicineStrength || "No strength available"}
                    </div>
                  </div>

                  {/* Dose */}
                  <div className="w-[10%] text-custom-gray">
                    {med.medicineDose || "N/A"}
                  </div>

                  {/* Frequency and Timing */}
                  <div className="w-[20%] flex flex-col text-custom-gray">
                    <div>{med.medicineFrequency || "Not specified"}</div>
                    <div>{med.medicineTiming || "Not specified"}</div>
                  </div>

                  {/* Duration */}
                  <div className="w-[20%] text-custom-gray">
                    {med.medicineDuration || "N/A"}
                  </div>

                  {/* Quantity */}
                  <div className="w-[10%] text-custom-gray">
                    {med.medicineQuantity || "N/A"}
                  </div>
                </div>
              ))
            ) : (
              <p>No medications available.</p> // Fallback for empty medications array
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPrescription;
