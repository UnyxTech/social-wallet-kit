import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TButton } from "../tButton";
import LoginComp from "@/components/login";
import CodeVerifyComp from "@/components/login/codeVerify";
import SuccessComp from "@/components/login/success";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface iSignInDialog {
  className?: string;
  open: boolean;
  onClose?: () => void;
}
export function SignInDialog({
  className,
  open,
  onClose,
  ...props
}: iSignInDialog & any) {
  const walletList = [
    {
      id: 1,
      icon: "/images/tomo_social.svg",
      name: "Tomo Social",
    },
    {
      id: 2,
      icon: "/images/tomo_wallet.svg",
      name: "Tomo Wallet",
    },
    {
      id: 3,
      icon: "/images/metamask_wallet.svg",
      name: "Metamask Wallet",
    },
    {
      id: 4,
      icon: "/images/okx_wallet.svg",
      name: "OKX Wallet",
    },
    {
      id: 5,
      icon: "/images/trust_wallet.svg",
      name: "Trust Wallet",
    },
    {
      id: 6,
      icon: "/images/coinbase.svg",
      name: "Coinbase Wallet",
    },
  ];
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="bg-[#1A1B1F] border-none rounded-[24px] text-white min-w-fit p-0">
        <div className="flex items-center">
          <div className="w-[252px] h-full px-[18px] pb-[32px] border-r-[1px] border-solid border-[rgba(255,255,255,0.08)]">
            <div className="text-white text-[18px] font-[SFBold] py-[18px]">
              SIGN IN
            </div>
            {walletList.map((wallet, index) => (
              <div
                className={cn(
                  "flex items-center gap-3 px-[6px] py-[10px] cursor-pointer rounded-[12px] border-[1px] border-solid border-transparent hover:border-[rgba(255,255,255,0.04)] hover:bg-[rgba(122,112,255,0.20)]",
                  index === 0 &&
                    "border-[1px] border-solid border-[rgba(255,255,255,0.04)] bg-[rgba(122,112,255,0.20)]"
                )}
              >
                <img className="w-[28px] h-[28px]" src={wallet.icon} alt="" />
                <span className="font-[SFBold]">{wallet.name}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center position">
            <img
              onClick={onClose}
              className="absolute z-[10000] top-[16px] right-[16px] w-[28px] h-[28px] cursor-pointer"
              src="/images/icon_close.svg"
              alt=""
            />
            {step === 1 && (
              <LoginComp setStep={setStep} setLoginEmail={setEmail} />
            )}
            {step === 2 && (
              <CodeVerifyComp email={email} step={step} setStep={setStep} />
            )}
            {step === 3 && <SuccessComp />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
