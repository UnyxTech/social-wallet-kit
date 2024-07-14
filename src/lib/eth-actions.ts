export const signMessage = async (web3: any, message: string, account: string) => {
  const sig = await web3.eth.personal.sign(message, account, '');
  console.log('sig:', sig)
}