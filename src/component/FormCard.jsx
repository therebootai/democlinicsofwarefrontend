import React from "react";

const FormCard = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex items-center justify-center bg-white boxsh rounded">
        <img
          src="/images/forms.png"
          alt="form"
          className="opacity-50 w-[15vmax]"
        />
        <h1 className="text-sm text-[#888] absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center">
          Doc Name
        </h1>
      </div>
      <div className="flex justify-between gap-4">
        <button
          type="button"
          className="text-custom-blue text-sm text-center border border-custom-blue rounded py-1 xlg:py-3 px-2 xlg:px-4 hover:text-white hover:bg-custom-blue transition-colors duration-300 inline-flex flex-1 items-center justify-center"
        >
          View
        </button>
        <button
          type="button"
          className="text-custom-blue text-sm text-center border border-custom-blue rounded py-1 xlg:py-3 px-2 xlg:px-4 hover:text-white hover:bg-custom-blue transition-colors duration-300 inline-flex flex-1 items-center justify-center"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default FormCard;
