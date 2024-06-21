"use client";
import { useState } from "react";
import { TButton } from "@/components/tButton";
import { SignInDialog } from "@/components/dialog/signIn";
import { useUserStore } from "@/store/user";
import { shortAddress } from "@/lib/utils";
interface IProps {}

const Login: React.FC<IProps> = () => {
  const address = useUserStore((state) => state.address);
  const [openSignIn, setOpenSignIn] = useState<boolean>(false);

  return (
    <div className="bg-black h-full flex flex-col items-center">
      <div className="p-[24px] w-full flex justify-end">
        <TButton
          className="px-[16px] w-fit"
          type="blue"
          onClick={() => setOpenSignIn(true)}
        >
          {address ? shortAddress(address) : "Connect Wallet"}
        </TButton>
      </div>
      <SignInDialog open={openSignIn} onClose={() => setOpenSignIn(false)} />
    </div>
  );
};

export default Login;
