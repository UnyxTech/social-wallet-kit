import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TButton } from "@/components/tButton";
import EmailCode from "../emailCode";
import { useTomoSDK } from "@/hooks";

interface iCodeVerifyComp {
  step: number;
  email: string;
  setStep: (step: number) => void;
}
const CodeVerifyComp = (props: iCodeVerifyComp) => {
  const { email, step, setStep } = props;
  const [code, setCode] = useState<string>("");
  const [gapTime, setGapTime] = useState<number>(0);
  const [sendInterval, setSendInterval] = useState<any>(undefined);

  const tomoSDK = useTomoSDK();

  useEffect(() => {
    if (step === 2) {
      startCountdown();
    }
  }, [step]);

  const verifyCode = async (str?: string) => {
    try {
    } catch (e) {
      console.log(e);
    }
  };

  const isValid = () => {
    if (code.length !== 4) {
      return false;
    }

    return true;
  };

  const startCountdown = async () => {
    clearInterval(sendInterval);
    setGapTime(60);
    const interval = setInterval(() => {
      setGapTime((prev: number) => {
        if (prev === 0) {
          clearInterval(sendInterval);
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
    setSendInterval(interval);
  };

  const resendCode = async () => {
    try {
      if (gapTime > 0) {
        return;
      }
      const result = await tomoSDK.sendCode(email);
      if (!result) {
        throw new Error("Failed");
      }
      startCountdown();
    } catch (e) {
      console.log(e);
    }
  };

  const continueFun = async () => {
    const result = await tomoSDK.verifyCode(code);
    console.log("result:", result);

    const address = await tomoSDK.getEthAddress();
    console.log("address:", address);

    setStep(3);
  };

  return (
    <div className="w-[372px] rounded-[12px] p-[32px] z-[10] flex flex-col justify-between">
      <div className="flex flex-col">
        <Image
          className="mb-[24px] cursor-pointer bg-bgGray rounded-[22px] p-[10px]"
          width={44}
          height={44}
          src="/images/icon_back.svg"
          alt=""
          onClick={() => setStep(1)}
        />
        <div className="mb-[16px] text-[24px] font-[SFMedium] text-white">
          Enter code
        </div>
        <div className="text-[14px] text-white6 mb-[32px]">
          A 4-digit code was sent to <span className="text-white">{email}</span>
        </div>
        <EmailCode verifyCode={verifyCode} setCode={setCode} />
        <div className="flex justify-start items-center mt-[20px]">
          {gapTime > 0 ? (
            <span className="text-white opacity-40 font-[400] text-[12px] mr-2">
              Resend ({gapTime}s)
            </span>
          ) : (
            <span
              onClick={resendCode}
              className="text-white font-[500] text-[12px] cursor-pointer"
            >
              Resend code
            </span>
          )}
        </div>
      </div>
      <div className="mt-[50px] flex flex-col justify-between items-center w-full">
        <TButton
          className="font-[SFMedium]"
          onClick={continueFun}
          disabled={!isValid()}
          type="purple"
        >
          Login with Email
        </TButton>
      </div>
    </div>
  );
};

export default CodeVerifyComp;
