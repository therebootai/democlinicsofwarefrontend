import React from "react";

const UpperRight = ({ text }) => {
  return (
    <div
      className={` border-r border-b cursor-pointer  text-[10px]/[0px] p-1 size-4 m-auto border-[#333333] `}
    >
      {text}
    </div>
  );
};

export default UpperRight;
