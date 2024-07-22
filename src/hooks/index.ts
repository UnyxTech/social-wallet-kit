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
        chainId: '0x1',
        rpcUrl: 'https://cloudflare-eth.com',
      }
      const ethProvider = new EthereumProvider(chainConfig)
      const solanaProvider = new SolanaProvider()
      await solanaProvider.connect()
      // const clientId = 'KyUfUyildJzvRRweV0zA6mqKGm38afNcIjnCYjiSSZW5jkgtWPMJc5AG75yxyXDz9fq139gtfUiBRnsF4kEd7tiu'
      const clientId = 'bCMfq7lAMPobDhf6kWAHAPtO5Ct6YuA77W9SzhjUixFwOOi0f92vsdJpkAhn0W4tg8TVSeTNUSvBOC3MXYRuIH0Z'
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