
export const unisatProvider = "unisat";

export class UnisatWallet {

  connectWallet = async (): Promise<this> => {
    const unisatwallet = window[unisatProvider];
    try {
      const accounts = await unisatwallet.requestAccounts();
      return accounts[0]
    } catch (error) {
      throw new Error('Failed to connect to unisat wallet');
    }
  };
}
