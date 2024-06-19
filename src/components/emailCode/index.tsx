/* eslint-disable quotes */
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface iEmailCode {
  verifyCode: (str?: string) => void;
  setCode: (str: string) => void;
}
export default function EmailCode(props: iEmailCode) {
  const { verifyCode, setCode } = props;
  const [codeArr, setCodeArr] = useState(["", "", "", ""]);
  const refs = [
    useRef<any>(),
    useRef<any>(),
    useRef<any>(),
    useRef<any>(),
    useRef<any>(),
    useRef<any>(),
  ];

  const handleChange = (e: any, index: number) => {
    const value = e.target.value;
    if (value && /^\d+$/.test(value)) {
      const newCode = [...codeArr];
      newCode[index] = value;
      setCodeArr(newCode);
      if (index < 3) {
        refs[index + 1].current?.focus();
      }
    } else if (!value) {
      const newCode = [...codeArr];
      newCode[index] = "";
      setCodeArr(newCode);
      if (index > 0) {
        refs[index - 1].current?.focus();
      }
    }
  };

  function handleKeyDown(e: any, index: number) {
    if (e.key === "Backspace" && codeArr[index] === "") {
      // 允许删除
      const newCode = [...codeArr];
      newCode[index - 1] = "";
      setCodeArr(newCode);
      if (index > 0) {
        refs[index - 1].current.focus(); // 自动 focus 到上一个输入框
      }
    } else if (e.key === "ArrowLeft") {
      if (index > 0) {
        refs[index - 1].current.focus(); // 自动 focus 到上一个输入框
      }
    } else if (e.key === "ArrowRight") {
      if (index < 4) {
        refs[index + 1].current.focus(); // 自动 focus 到下一个输入框
      }
    }
  }

  function handlePaste(e: any) {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").substring(0, 4); // 只获取前四个字符
    const newCode = [...codeArr];
    for (let i = 0; i < 4; i++) {
      newCode[i] = pastedData[i] || "";
    }
    setCodeArr(newCode);
    refs[0].current.focus();
  }

  useEffect(() => {
    const str = codeArr.join("");
    setCode(str);
    if (str.length === 4) {
      verifyCode(str);
    }
  }, [codeArr]);

  return (
    <div className="flex items-center justify-start gap-[10px]">
      {codeArr.map((value, index) => (
        <input
          className={cn(
            " outline-none rounded-[12px] w-[48px] h-[48px] text-[16px] font-[400] text-center text-white border border-solid border-[#656565] hover:border-[#BDBDBD] focus:border-[#BDBDBD] bg-transparent"
            // value !== "" && "border-[#000000]"
          )}
          key={index}
          type="text"
          maxLength={1}
          value={value}
          ref={refs[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}
