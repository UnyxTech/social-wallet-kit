"use client";
import { useState } from "react";
import { Web3 } from "web3";
import { TButton } from "@/components/tButton";
import { SignInDialog } from "@/components/dialog/signIn";
import { useUserStore } from "@/store/user";
import { shortAddress } from "@/lib/utils";
import {
  getAddresses,
  sendTx,
  sendErc20,
  signMessage,
  switchChain,
  signTypeData,
} from "@/lib/eth-actions";
import {
  getBtcInfos,
  sendBitcoin,
  signBtcMessage,
  signPsbt,
} from "@/lib/btc-actions";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useTomoSDK } from "@/hooks";
interface IProps {}

const Login: React.FC<IProps> = () => {
  const address = useUserStore((state) => state.address);
  const tomoSDK = useTomoSDK();
  const setAddress = useUserStore((state) => state.setAddress);
  const [openSignIn, setOpenSignIn] = useState<boolean>(false);
  const logout = () => {
    setAddress(undefined);
  };

  return (
    <div className="bg-black h-full flex flex-col items-center">
      <div className="p-[24px] w-full flex justify-end">
        {!address && (
          <TButton
            className="px-[16px] w-fit"
            type="blue"
            onClick={() => setOpenSignIn(true)}
          >
            {address ? shortAddress(address) : "Connect Wallet"}
          </TButton>
        )}
        {address && (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {shortAddress(address)}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="!bg-white">
                  <NavigationMenuLink>
                    <div
                      onClick={() => {
                        logout();
                      }}
                      className="w-[90px] py-[12px] px-[16px] cursor-pointer"
                    >
                      Log Out
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
      {address && (
        <div>
          <div className="p-[24px] w-full flex justify-start">
            <TButton
              className="px-[16px] w-fit"
              type="blue"
              onClick={() => {
                const web3 = new Web3(tomoSDK.ethereumProvider);
                signMessage(web3, "hello", address);
              }}
            >
              evm personla sign
            </TButton>
            <TButton
              className="px-[16px] w-fit ml-[8px]"
              type="blue"
              onClick={() => {
                const web3 = new Web3(tomoSDK.ethereumProvider);
                signTypeData(web3, address);
              }}
            >
              evm sign type data
            </TButton>
            <TButton
              className="px-[16px] w-fit ml-[8px]"
              type="blue"
              onClick={() => {
                const web3 = new Web3(tomoSDK.ethereumProvider);
                sendTx(web3, address, address, "0.00001");
              }}
            >
              evm send tx with viem
            </TButton>
            <TButton
              className="px-[16px] w-fit ml-[8px]"
              type="blue"
              onClick={() => {
                const web3 = new Web3(tomoSDK.ethereumProvider);
                sendErc20(web3);
              }}
            >
              evm send erc20
            </TButton>
            <TButton
              className="px-[16px] w-fit ml-[8px]"
              type="blue"
              onClick={async () => {
                getAddresses(tomoSDK.ethereumProvider);
              }}
            >
              evm get address
            </TButton>

            <TButton
              className="px-[16px] w-fit ml-[8px]"
              type="blue"
              onClick={async () => {
                switchChain(tomoSDK.ethereumProvider);
              }}
            >
              evm switch chain
            </TButton>
          </div>
          <div className="p-[24px] w-full flex justify-start mt-2">
            <TButton
              className="px-[16px] w-fit"
              type="blue"
              onClick={() => {
                signBtcMessage(tomoSDK.bitcoinProvider, "hello");
              }}
            >
              sign btc message
            </TButton>
            <TButton
              className="px-[16px] w-fit ml-[8px]"
              type="blue"
              onClick={() => {
                sendBitcoin(
                  tomoSDK.bitcoinProvider,
                  "tb1pezwd2ke3kk5qhqtkg2kt3vtfr0nhzdeqdhhelp3qswtkuas68pgqw79745",
                  0.0001
                );
              }}
            >
              send bitcoin
            </TButton>
            <TButton
              className="px-[16px] w-fit ml-[8px]"
              type="blue"
              onClick={async () => {
                signPsbt(tomoSDK.bitcoinProvider, "70779897");
              }}
            >
              signPsbt
            </TButton>
            <TButton
              className="px-[16px] w-fit ml-[8px]"
              type="blue"
              onClick={async () => {
                getBtcInfos(tomoSDK.bitcoinProvider);
              }}
            >
              get btc infos
            </TButton>
          </div>
        </div>
      )}

      <SignInDialog open={openSignIn} onClose={() => setOpenSignIn(false)} />
    </div>
  );
};

export default Login;
