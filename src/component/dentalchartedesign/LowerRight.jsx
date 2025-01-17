import React from "react";

const LowerRight = ({ text }) => {
  return (
    <div
      className={` border-t border-r cursor-pointer text-[10px]/[0px] p-1 py-[5px] size-4 m-auto border-[#333333] `}
    >
      {text}
    </div>
  );
};

export default LowerRight;
