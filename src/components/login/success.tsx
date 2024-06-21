import Image from "next/image";
import React from "react";

const SuccessComp = () => {
  return (
    <div className="w-[372px] rounded-[12px] p-[32px] z-[10] flex flex-col justify-center items-center">
      <Image
        width={80}
        height={80}
        src="/images/icon_success.svg"
        alt=""
        className=""
      />
      <div className="mt-[28px] text-white">Login Successful</div>
    </div>
  );
};

export default SuccessComp;
