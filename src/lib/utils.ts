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
  connectType?: 'btc'|'all'|'social';
  connectProvider?: any;
  rdns?: string;
}

export const walletList: WalletItem[] = [
  {
    id: 1,
    icon: "/images/tomo_social.svg",
    name: "Tomo Social",
    connectType: 'social'
  },
  {
    id: 2,
    icon: "/images/tomo_wallet.svg",
    name: "Tomo Wallet",
    existName: "Tomo",
    walletType: "tomo",
    rdns: "inc.tomo",
  },
  {
    id: 3,
    icon: "/images/metamask_wallet.svg",
    name: "MetaMask",
    existName: "MetaMask",
    walletType: "metamask",
    rdns: "io.metamask"
  },
  {
    id: 4,
    icon: "/images/okx_wallet.svg",
    name: "OKX Wallet",
    existName: "OKX Wallet",
    walletType: "okx",
    rdns: "com.okex.wallet"
  },
  {
    id: 5,
    icon: "/images/trust_wallet.svg",
    name: "Trust Wallet",
    existName: "Trust Wallet",
    walletType: "trust",
    rdns: "com.trustwallet.app"
  },
  {
    id: 6,
    icon: "/images/coinbase.svg",
    name: "Coinbase",
    existName: "Coinbase Wallet",
    walletType: "coinbase",
    rdns: "com.coinbase.wallet"
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
  {
    id: 1000,
    icon: "/images/all_wallet.svg",
    name: "All Wallets",
    existName: "All Wallets",
    connectType: "all",
    connectProvider: new UnisatWallet(),
  }
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
  if (wallet.connectType === 'all') {
    return;
  }
  if (wallet.walletType === 'unisat') {
    if (!window.unisat) {
      toast({
        title: "Wallet not install.",
        duration: 3000,
      });
      return;
    }
  } else if (
    !installed.find(
      (item: any) => item.info.rdns === wallet.rdns
    )
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

export const connectToEvmWallet = async (wallet: any, installed: any[], toast: any) => {
  const walletInstalled = installed.find((item: any) => item.info.rdns === wallet.rdns)
  if (!walletInstalled) {
    toast({
      title: "Wallet not install.",
      duration: 3000,
    });
    return;
  }
  const accounts = await walletInstalled.provider.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
};
