import React from "react";
import { wallets } from "@/constant/wallets";
import { connectToEvmWallet } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { useUserStore } from "@/store/user";

interface iAllComp {
  installed: any[];
}
const AllWalletsComp = (props: iAllComp) => {
  const setAddress = useUserStore((state) => state.setAddress);
  const { installed } = props
  return (
    <div>
      <div className="flex justify-center items-center">
        <img className="w-[32px] h-[32px]" src="/images/all_wallet.svg" alt="" />
        <span className="font-[SFBold] text-[24px] ml-[8px]">All Wallets</span>
      </div>
      <div className="w-[372px] rounded-[12px] p-[32px] z-[10] max-h-[400px] overflow-y-scroll">
        <div className="grid grid-cols-4 gap-2">
          {
            wallets.filter(x => !!x.rdns).map((x, index) => {
              return (
                <img 
                  key={`w_${index}`} 
                  src={x.img} 
                  className="w-[64px] rounded-[16px] cursor-pointer"
                  onClick={() => {
                    connectToEvmWallet(x, installed, toast)
                    .then((address) => {
                      if(address) {
                        setAddress(address)
                      }
                    })
                    
                  }}
                />
            )})
          }
        </div>
      </div>
    </div>
  );
};

export default AllWalletsComp;