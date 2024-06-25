import { OKXMainWallet } from "@/providers/btc/okx_mainnet_wallet";
import { UnisatWallet } from "@/providers/btc/unisat_wallet";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortAddress(address?: string, len = 5) {
  if (!address) return "";
  if (address.length <= len * 2) return address;
  return address.slice(0, len) + "..." + address.slice(address.length - 5);
}
export interface WalletItem {
  id: number;
  name: string;
  existName?: string;
  icon: string;
  walletType?: WalletType;
  connectType?: 'btc';
  connectProvider?: any;
}

export const walletList: WalletItem[] = [
  {
    id: 1,
    icon: "/images/tomo_social.svg",
    name: "Tomo Social",
  },
  {
    id: 2,
    icon: "/images/tomo_wallet.svg",
    name: "Tomo Wallet",
    existName: "Tomo",
    walletType: "tomo",
  },
  {
    id: 3,
    icon: "/images/metamask_wallet.svg",
    name: "MetaMask",
    existName: "MetaMask",
    walletType: "metamask",
  },
  {
    id: 4,
    icon: "/images/okx_wallet.svg",
    name: "OKX Wallet",
    existName: "OKX Wallet",
    walletType: "okx",
  },
  {
    id: 5,
    icon: "/images/trust_wallet.svg",
    name: "Trust Wallet",
    existName: "Trust Wallet",
    walletType: "trust",
  },
  {
    id: 6,
    icon: "/images/coinbase.svg",
    name: "Coinbase",
    existName: "Coinbase Wallet",
    walletType: "coinbase",
  },
  {
    id: 7,
    icon: "/images/okx_wallet.svg",
    name: "OKX Bitcoin",
    existName: "OKX Wallet",
    walletType: "okx",
    connectType: 'btc',
    connectProvider: new OKXMainWallet(),
  },
  {
    id: 8,
    icon: "/images/unisat_wallet.svg",
    name: "Unisat Wallet",
    existName: "Unisat Wallet",
    walletType: "unisat",
    connectType: 'btc',
    connectProvider: new UnisatWallet(),
  },
];
export type WalletType = "metamask" | "trust" | "okx" | "coinbase" | "tomo" | "unisat";
export const type2InjectorMap = {
  metamask: "ethereum",
  trust: "trustwallet",
  okx: "okxwallet",
  coinbase: "coinbaseWalletExtension",
  tomo: "tomo_evm",
  unisat: 'unisat',
};
export const connectToWalletOld = async (walletType: WalletType) => {
  if (!type2InjectorMap[walletType]) {
    throw new Error("Wallet not install");
  }
  const accounts = await (window as any)[type2InjectorMap[walletType]].request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
};

export const connectToBtc = async (wallet: WalletItem) => {
  return wallet.connectProvider.connectWallet();
}

export const connectToWallet = async (wallet: WalletItem, installed: any[], toast: any) => {
  if (wallet.walletType === 'unisat' && !window.unisat) {
    toast({
      title: "Wallet not install.",
      duration: 3000,
    });
    return;
  } else if (
    wallet.walletType !== 'unisat' && !installed.find(
      (item: string) => item === wallet.existName
    ) || (wallet.walletType === 'unisat' && !window.unisat)
  ) {
    toast({
      title: "Wallet not install.",
      duration: 3000,
    });
    return;
  }

  if (!wallet.walletType) {
    return
  }

  let accounts
  if (!wallet.connectType) {
    accounts = await (window as any)[type2InjectorMap[wallet.walletType]].request({
      method: "eth_requestAccounts",
    });
  } else if (wallet.connectType === 'btc') {
    const address = await wallet.connectProvider.connectWallet();
    accounts = [address]
  }

  return accounts[0]
};