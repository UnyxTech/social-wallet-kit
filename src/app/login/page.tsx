"use client";
import { useState } from "react";
import LoginComp from "@/components/login";
import CodeVerifyComp from "@/components/login/codeVerify";
import SuccessComp from "@/components/login/success";

interface IProps {}

const Login: React.FC<IProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [step, setStep] = useState<number>(1);

  return (
    <div className="bg-white flex h-full">
      <div className="flex-1 h-full flex flex-col justify-center items-center">
        {step === 1 && (
          <LoginComp setStep={setStep} setLoginEmail={setEmail}/>
        )}
        {step === 2 && (
          <CodeVerifyComp email={email} step={step} setStep={setStep}/>
        )}
        {step === 3 && (
          <SuccessComp />
        )}
      </div>
    </div>
  );
};

export default Login;
