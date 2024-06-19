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
      sdkCache = new TomoSDK({clientId: 'bCMfq7lAMPobDhf6kWAHAPtO5Ct6YuA77W9SzhjUixFwOOi0f92vsdJpkAhn0W4tg8TVSeTNUSvBOC3MXYRuIH0Z'})
      setTomoSDK(sdkCache)
    }
    init()
  }, [])

  return tomoSDK
}