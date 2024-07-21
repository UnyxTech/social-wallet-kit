export const getCommonInfos = async (sdk: any) => {
  const prices = await sdk.getPrices('ETH,BTC,SOL')
  console.log('prices:', prices)
  const hasEmail = await sdk.hasEmail()
  console.log('email:', hasEmail)
  const passkeyStatus = await sdk.getPasskeyStatus()
  console.log('passkey status:', passkeyStatus)
}