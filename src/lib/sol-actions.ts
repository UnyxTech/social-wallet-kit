import { Transaction, VersionedTransaction } from "@solana/web3.js";
export const sendSol = async (provider: any, to: string, amount: string, contractAddress?: string) => {
  const pubkey = await provider.getPublicKey()
  console.log('pubkey:', pubkey)
  const sig = await provider.sendSol(to, amount, contractAddress)
}


export const signSolTx = async (provider: any, tx: Transaction | VersionedTransaction) => {
  const sig = await provider.signTransaction(tx)
  console.log('sig:', sig)
}

export const signSolTxs = async (provider: any, txs: Transaction[]) => {
  const sig = await provider.signAllTransactions(txs)
  console.log('sig:', sig)
}

export const signAndSendSolTx = async (provider: any, tx: Transaction) => {
  const txhash = await provider.signAndSendTransaction(tx)
  console.log('txhahs:', txhash)
}

export const signSolMessage = async (provider: any, msg: Uint8Array) => {
  const sig = await provider.signMessage(msg)
  console.log('sig:', sig)
}