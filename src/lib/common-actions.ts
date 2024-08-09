export const getCommonInfos = async (sdk: any) => {
  const prices = await sdk.getPrices('ETH,BTC,SOL')
  console.log('prices:', prices)
  const hasEmail = await sdk.hasEmail()
  console.log('email:', hasEmail)
  const passkeyStatus = await sdk.getPasskeyStatus()
  console.log('passkey status:', passkeyStatus)
  const socialInfo = await sdk.getUserSocialInfo()
  console.log('socialInfo:', socialInfo)
  // const swapTokens = await sdk.getSwapTokens('ETH')
  // console.log('swapTokens:', swapTokens)
  // const checkEmail = await sdk.sendCode('social1@aaa.com')
  // console.log('checkEmail:', checkEmail)
}

export const bindTwitter = async (sdk: any) => {
  const res = await sdk.twitterBind()
  console.log('%c bindTwitter ==>', 'color: red', res)
}
