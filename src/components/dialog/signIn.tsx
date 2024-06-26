import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginComp from "@/components/login";
import CodeVerifyComp from "@/components/login/codeVerify";
import SuccessComp from "@/components/login/success";
import { WalletItem, cn, connectToWallet, walletList } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user";
import { useToast } from "@/components/ui/use-toast";
import AllWalletsComp from "../all";
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
  const { toast } = useToast();
  const setAddress = useUserStore((state) => state.setAddress);
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [installWallets, setInstallWallets] = useState<any>();
  const [rightComp, setRightComp] = useState<string>('social');

  const getInstalledWallet = () => {
    const windowObj: any = window;
    if (windowObj.ethereum) {
      let wallets: any = [];
      const getInstalledWallets = (event: any) => {
        const arr = [event.detail];
        wallets = wallets.concat(arr);
        if (!!wallets) {
          setInstallWallets(wallets);
        } else {
          setInstallWallets([]);
        }
      };

      window.addEventListener("eip6963:announceProvider", getInstalledWallets);
      window.dispatchEvent(new Event("eip6963:requestProvider"));
      window.removeEventListener(
        "eip6963:announceProvider",
        getInstalledWallets
      );
    } else {
      setInstallWallets([]);
    }
  };
  useEffect(() => {
    getInstalledWallet();
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(open: boolean) => {
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
            {walletList.map((wallet: WalletItem, index) => (
              <div key={`wallet_${index}`}
                onClick={async () => {
                  if (wallet.connectType === 'social') {
                    setRightComp('social');
                    return
                  }
                  if (wallet.connectType === 'all') {
                    setRightComp('all');
                    return
                  }
                  try {
                    const address = await connectToWallet(wallet, installWallets, toast);
                    
                    if (address) {
                      onClose();
                      setAddress(address);
                    }
                  } catch (e) {
                    toast({
                      title: "Something error.",
                      duration: 3000,
                    });
                  }
                }}
                className={cn(
                  "flex items-center gap-3 px-[6px] py-[10px] cursor-pointer rounded-[12px] border-[1px] border-solid border-transparent hover:border-[rgba(255,255,255,0.04)] hover:bg-[rgba(122,112,255,0.20)]",
                  wallet.connectType === rightComp &&
                    "border-[1px] border-solid border-[rgba(255,255,255,0.04)] bg-[rgba(122,112,255,0.20)]"
                )}
              >
                <img className="w-[28px] h-[28px]" src={wallet.icon} alt="" />
                <span className="font-[SFBold]">{wallet.name}</span>
              </div>
            ))}
          </div>
          {
            rightComp === 'social' &&
            <div className="flex flex-col justify-center position">
              <img
                onClick={onClose}
                className="absolute z-[10000] top-[16px] right-[16px] w-[28px] h-[28px] cursor-pointer"
                src="/images/icon_close.svg"
                alt=""
              />
              {step === 1 && (
                <LoginComp setStep={setStep} setLoginEmail={setEmail} onClose={onClose}/>
              )}
              {step === 2 && (
                <CodeVerifyComp email={email} step={step} setStep={setStep} onClose={onClose} />
              )}
              {step === 3 && <SuccessComp />}
            </div>
          }
          {
            rightComp === 'all' &&
            <AllWalletsComp installed={installWallets}/>
          }
        </div>
      </DialogContent>
    </Dialog>
  );
}
