import React, { useState } from "react";
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import Image from "next/image";
import { TInput } from "@/components/input/tInput";
import { TButton } from "@/components/tButton";
import { useTomoSDK } from "@/hooks";

interface iLoginComp {
  setStep: (step: number) => void
  setLoginEmail: (email: string) => void
}
const LoginComp = (props: iLoginComp) => {
  const {
    setStep,
    setLoginEmail
  } = props;
  const [email, setEmail] = useState<string>("");
  const tomoSDK = useTomoSDK()

  const login = async () => {
    const ret = await tomoSDK.login('google')
    if (ret) {
      setStep(3)
    }
  };

  const isValid = () => {
    if (!email) {
      return false;
    }

    return true;
  };

  const continueFun = async () => {
    const result = await tomoSDK.sendCode(email)
    if (result) {
      setStep(2)
      setLoginEmail(email)
    }
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isValid() && "Enter" == e.key) {
      continueFun();
    }
  };

  return (
    <div className="w-[372px] rounded-[12px] bg-[#151923] p-[32px] z-[10]">
      <div className="flex justify-center items-center gap-[8px]">
        <Image
          width={32}
          height={32}
          src="/images/icon_tomo.svg"
          alt=""
          className="w-[32px] h-[32px]"
        />
        <Image
          width={120}
          height={20}
          src="/images/tomo_text.svg"
          alt=""
          className="w-[120px] h-[20px]"
        />
      </div>
      <div className="flex items-center mt-[48px]">
        <div className="flex-1 flex justify-center items-center">
          <TButton type="outline" onClick={login}>
            <Image
              width={24}
              height={24}
              src="/images/icon_google.svg"
              alt=""
            />
            <span className="ml-[8px] font-[PopinsMedium] text-[16px]">
              Continue with Google
            </span>
          </TButton>
        </div>
      </div>
      <div className="text-[white] opacity-80 text-center mt-[20px]">
        Or
      </div>
      <div className="mt-[24px] flex flex-col justify-between items-center w-full">
        <div className="flex flex-col justify-center items-center w-full gap-[20px]">
          <TInput
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full"
            placeholder="Email address"
            onKeyUp={(e) => handleOnKeyUp(e)}
          />
          <TButton
            className="font-[PopinsMedium]"
            onClick={continueFun}
            disabled={!isValid()}
            type="purple"
          >
            Login with Email
          </TButton>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;