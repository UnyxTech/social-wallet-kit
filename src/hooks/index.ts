import { useEffect, useState } from "react"

export const useTomoSDK = () => {
  const [tomoSDK, setTomoSDK] = useState<any>()
  useEffect(() => {
    const init = async () => {
      if (tomoSDK) {
        return
      }

      const {TomoSDK, EthereumProvider, BitcoinProvider, SolanaProvider} = await import('@tomo-inc/social-wallet-sdk');

      const chainConfig = {
        chainId: 1,
      }
      const ethProvider = new EthereumProvider(chainConfig)
      const solanaProvider = new SolanaProvider()
      await solanaProvider.connect()
      const clientId = 'bCMfq7lAMPobDhf6kWAHAPtO5Ct6YuA77W9SzhjUixFwOOi0f92vsdJpkAhn0W4tg8TVSeTNUSvBOC3MXYRuIH0Z'
      // const clientId = 'yiPWTD4fztgEVS78HDUHoSFb4geppl2XTrhHZQUdGnh981bE13m2jrEwBhMlKNUNRWSoCYwD4ruOhWStuunYxMF0'
      setTomoSDK(TomoSDK.init({
        clientId,
        ethereumProvider: ethProvider,
        bitcoinProvider: new BitcoinProvider(),
        solanaProvider: new SolanaProvider(),
      }))

      TomoSDK.setDevApi(clientId)
      TomoSDK.setLogLevel('debug')
    }
    init()
  }, [])

  return tomoSDK
}