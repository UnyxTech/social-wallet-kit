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
  icon: string;
  walletType?: WalletType;
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
    walletType: "tomo",
  },
  {
    id: 3,
    icon: "/images/metamask_wallet.svg",
    name: "Metamask",
    walletType: "metamask",
  },
  {
    id: 4,
    icon: "/images/okx_wallet.svg",
    name: "OKX Wallet",
    walletType: "okx",
  },
  {
    id: 5,
    icon: "/images/trust_wallet.svg",
    name: "Trust Wallet",
    walletType: "trust",
  },
  {
    id: 6,
    icon: "/images/coinbase.svg",
    name: "Coinbase",
    walletType: "coinbase",
  },
];
export type WalletType = 'metamask'|'trust'|'okx'|'coinbase'|'tomo'
export const type2InjectorMap = {
  metamask: 'ethereum',
  trust: 'trustwallet',
  okx: 'okxwallet',
  coinbase: 'coinbaseWalletExtension',
  tomo: 'tomo_evm'
}
export const connectToWallet = async (walletType: WalletType) => {
  if (!type2InjectorMap[walletType]) {
    throw new Error('Wallet not install')
  }
  const accounts = await ((window as any)[type2InjectorMap[walletType]]).request({ method: 'eth_requestAccounts' })
  return accounts[0]
}
