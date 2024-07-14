import { EthereumProvider } from "@tomo-inc/social-wallet-sdk"
import { useEffect, useState } from "react"

let sdkCache: any
export const useTomoSDK = () => {
  const [tomoSDK, setTomoSDK] = useState<any>(sdkCache)
  useEffect(() => {
    const init = async () => {
      if (tomoSDK) {
        return
      }

      const {TomoSDK} = await import('@tomo-inc/social-wallet-sdk');
      TomoSDK.setDevApi()

      const chainConfig = {
        chainId: '0x1',
        rpcUrl: 'https://cloudflare-eth.com',
      }
      const ethProvider = new EthereumProvider(chainConfig)
      sdkCache = new TomoSDK({
        clientId: 'bCMfq7lAMPobDhf6kWAHAPtO5Ct6YuA77W9SzhjUixFwOOi0f92vsdJpkAhn0W4tg8TVSeTNUSvBOC3MXYRuIH0Z',
        ethereumProvider: ethProvider
      })
      setTomoSDK(sdkCache)
    }
    init()
  }, [])

  return tomoSDK
}