import React from "react";

const PerformanceComponent = () => {
  const details = [
    { icons: "/icons/patients.svg", totalnumber: "1268+", name: "Patients" },
    {
      icons: "/icons/prescriptions.svg",
      totalnumber: "1268+",
      name: "Prescription",
    },
    {
      icons: "/icons/totalpatients.svg",
      totalnumber: "1268+",
      name: "Patients",
    },
    { icons: "/icons/followup.svg", totalnumber: "1268+", name: "Followup" },
  ];
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold ">Performance</h1>
      <div className="grid grid-cols-4 gap-8">
        {details.map((item, index) => (
          <div
            className="h-[8rem] w-full bg-white rounded-md boxsh flex justify-center items-center "
            key={index}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-[40%]">
                <img src={item.icons} alt="" className="h-[2.5rem]" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-[#555555] text-2xl/[20px] font-semibold ">
                  {item.totalnumber}
                </h1>
                <h2 className="text-lg text-[#888888] font-normal">
                  {item.name}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceComponent;
