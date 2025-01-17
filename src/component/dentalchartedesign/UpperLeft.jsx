import React from "react";

const UpperLeft = ({ text }) => {
  return (
    <div
      className={` border-l border-b cursor-pointer text-[10px]/[0px] size-4 m-auto  p-1 border-[#333333] `}
    >
      {text}
    </div>
  );
};

export default UpperLeft;
