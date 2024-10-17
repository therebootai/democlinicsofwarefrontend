import React from "react";
import TopHeaderMini from "../../component/TopHeaderMini";

const AddNewPrescription = () => {
  return (
    <>
      <TopHeaderMini />
      <div className="p-8 flex gap-6 bg-[#EDF4F7]">
        <div className="py-6 px-20">
          <div>
            <h3 className="text-black text-xl">Oral Findings</h3>
            <div className="bg-white">
              <input type="text" placeholder="Root Canal" className="px-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewPrescription;
