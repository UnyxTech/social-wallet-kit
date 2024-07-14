"use client";
import { useState } from "react";
import { Web3 } from 'web3'
import { TButton } from "@/components/tButton";
import { SignInDialog } from "@/components/dialog/signIn";
import { useUserStore } from "@/store/user";
import { shortAddress } from "@/lib/utils";
import { signMessage } from "@/lib/eth-actions"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useTomoSDK } from "@/hooks";
interface IProps {}

const Login: React.FC<IProps> = () => {
  const address = useUserStore((state) => state.address);
  const tomoSDK = useTomoSDK()
  const setAddress = useUserStore((state) => state.setAddress);
  const [openSignIn, setOpenSignIn] = useState<boolean>(false);
  const logout = () => {
    setAddress(undefined);
  }

  return (
    <div className="bg-black h-full flex flex-col items-center">
      <div className="p-[24px] w-full flex justify-end">
        {
          !address &&
          <TButton
            className="px-[16px] w-fit"
            type="blue"
            onClick={() => setOpenSignIn(true)}
          >
            {address ? shortAddress(address) : "Connect Wallet"}
          </TButton>
        }
        {
          address &&
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {shortAddress(address)}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="!bg-white">
                  <NavigationMenuLink>
                    <div
                      onClick={() => {logout()}}
                      className="w-[90px] py-[12px] px-[16px] cursor-pointer"
                    >
                      Log Out
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        }
      </div>
      {
        address &&
        <div className="p-[24px] w-full flex justify-start">
          <TButton
            className="px-[16px] w-fit"
            type="blue"
            onClick={() => {
              const web3 = new Web3(tomoSDK.ethereumProvider)
              signMessage(web3, 'hello', address)
            }}
          >
            evm personla sign
          </TButton>
        </div>
      }
      
      <SignInDialog open={openSignIn} onClose={() => setOpenSignIn(false)} />
    </div>
  );
};

export default Login;
