import { useEffect, useState } from "react"

export const useTomoSDK = () => {
  const [tomoSDK, setTomoSDK] = useState<any>()
  useEffect(() => {
    const init = async () => {
      if (tomoSDK) {
        return
      }

      const {TomoSDK, EthereumProvider, BitcoinProvider} = await import('@tomo-inc/social-wallet-sdk');
      TomoSDK.setDevApi()

      const chainConfig = {
        chainId: '0x1',
        rpcUrl: 'https://cloudflare-eth.com',
      }
      const ethProvider = new EthereumProvider(chainConfig)
      setTomoSDK(TomoSDK.init({
        clientId: 'bCMfq7lAMPobDhf6kWAHAPtO5Ct6YuA77W9SzhjUixFwOOi0f92vsdJpkAhn0W4tg8TVSeTNUSvBOC3MXYRuIH0Z',
        ethereumProvider: ethProvider,
        bitcoinProvider: new BitcoinProvider(),
      }))
    }
    init()
  }, [])

  return tomoSDK
}