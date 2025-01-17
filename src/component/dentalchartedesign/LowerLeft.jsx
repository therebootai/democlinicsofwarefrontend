import React from "react";

const LowerLeft = ({ text }) => {
  return (
    <div
      className={` border-t border-l cursor-pointer text-[10px]/[0px] p-1 py-[5px] size-4 m-auto border-[#333333] `}
    >
      {text}
    </div>
  );
};

export default LowerLeft;
