"use client";
import { useState } from "react";
import { TButton } from "@/components/tButton";
import { SignInDialog } from "@/components/dialog/signIn";
import { useUserStore } from "@/store/user";
import { shortAddress } from "@/lib/utils";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
interface IProps {}

const Login: React.FC<IProps> = () => {
  const address = useUserStore((state) => state.address);
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
      <SignInDialog open={openSignIn} onClose={() => setOpenSignIn(false)} />
    </div>
  );
};

export default Login;
