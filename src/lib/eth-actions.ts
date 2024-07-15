import { createWalletClient, custom } from 'viem'

export const signMessage = async (web3: any, message: string, account: string) => {
  const sig = await web3.eth.personal.sign(message, account, '');
  console.log('sig:', sig)
}

export const sendTx = async (web3: any, account: string, to: string, value: string) => {
  const resp = await web3.eth.sendTransaction({ from: '0xB86aA614EDc512f4e3147779f964d420b43E44b4', to: '0xB86aA614EDc512f4e3147779f964d420b43E44b4', value: web3.utils.toWei(value, 'ether') })
	console.log('resp:', resp)
}

export const switchChain = async (provider: any) => {
  const client = createWalletClient({
    transport: custom(provider)
  })
  let chainId = await client.getChainId()
  console.log('chainId before:', chainId)
  client.switchChain({id: 56})
  chainId = await client.getChainId()
  console.log('chainId after:', chainId)
}

export const getAddresses = async (provider: any) => {
  const client = createWalletClient({
    transport: custom(provider)
  })
  const [address] = await client.requestAddresses()
  // const [address] = await client.getAddresses()
  console.log('address:', address)
}