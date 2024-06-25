

// window object for OKX Wallet extension
export const okxProvider = "okxwallet";

export class OKXMainWallet {

  connectWallet = async (): Promise<this> => {
    const okxwallet = window[okxProvider];
    try {
      await okxwallet.enable();
    } catch (error) {
      throw new Error('Failed to connect to OKX');
    }
    let result = null;
    try {
      // this will not throw an error even if user has no BTC Signet enabled
      result = await okxwallet?.bitcoin?.connect();
    } catch (error) {
      throw new Error("BTC Signet is not enabled in OKX Wallet");
    }

    const { address } = result;

    if (address) {
      return address
    }
    else {
      throw new Error("Could not connect to OKX Wallet");
    }
  };
}
