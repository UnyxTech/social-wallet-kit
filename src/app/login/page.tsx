"use client";
import {
  TomoContextProvider,
  TomoSocial,
  useChain,
  useSettingChainsFlat,
  useTomoClientMap,
  useTomoModalControl,
  useTomoProps, useTomoUserSocialInfo,
  useTomoWalletConnect,
  useTomoWalletState
} from '@tomo-inc/tomo-social-react'
import '@tomo-inc/tomo-social-react/style.css'
import { useLoading } from '@/hooks/useLoading'
import React, {useState} from 'react'
import {TomoProviderSetting} from "@tomo-inc/tomo-social-react/dist/state";

const isProd = process.env.NEXT_PUBLIC_PRODUCT === "prod"

const tomoProps = isProd ? {
  clientId: "yiPWTD4fztgEVS78HDUHoSFb4geppl2XTrhHZQUdGnh981bE13m2jrEwBhMlKNUNRWSoCYwD4ruOhWStuunYxMF0"
} : {
  clientId: 'bCMfq7lAMPobDhf6kWAHAPtO5Ct6YuA77W9SzhjUixFwOOi0f92vsdJpkAhn0W4tg8TVSeTNUSvBOC3MXYRuIH0Z',
  sdkMode: 'dev'
}



export default function Demo() {
  const [style, setStyle] = useState<TomoProviderSetting['style']>({
    rounded: 'default',
    theme: 'light',
    primaryColor: '#121212'
  })

  return (
    <TomoContextProvider
      evmDefaultChainId={1}
      {...tomoProps}
      style={style}
      // useServerSettings={true}
      // onlySocial={true}
      // socialTypes={['google', 'email']}
      // indexWallets={['metaMask', 'tomoWallet', 'bitcoin_okx', 'allWallet']}
    >
      <ChildComponent style={style} setStyle={setStyle} />
    </TomoContextProvider>
  )
}

type ChildProps = {
  style: TomoProviderSetting['style']
  setStyle: (v: TomoProviderSetting['style']) => void
}
export function ChildComponent(props: ChildProps) {
  const tomoModal = useTomoModalControl()
  const tomoWalletState = useTomoWalletState()
  const tomoClientMap = useTomoClientMap()
  const settingChainsFlat = useSettingChainsFlat()
  const chain = useChain()
  const tomoProps = useTomoProps()
  const tomoUserSocialInfo = useTomoUserSocialInfo()
  const tomoWalletConnect = useTomoWalletConnect()

  const bnbChain = settingChainsFlat.find((item) => {
    return item.id === 56 && item.type === 'evm'
  })

  const bitcoinSignetChain = settingChainsFlat.find((item) => {
    return item.networkName === 'signet' && item.type === 'bitcoin'
  })

  return (
    <div className={'flex h-screen w-screen text-sm'}>
      <div className={'flex h-screen w-screen text-sm'}>
        <div
          className={
            'hidden h-full flex-col gap-4 overflow-auto border-r border-r-tc1/10 p-10 md:flex md:flex-1'
          }
        >
          <div className={'flex flex-wrap gap-3'}>
            <LodingButton
              onClick={() => {
                tomoModal.open()
              }}
            >
              tomo modal
            </LodingButton>

            <LodingButton
              onClick={async () => {
                const result = await tomoModal.open('connect')
                console.log('modal result', result)
              }}
            >
              tomo modal - login
            </LodingButton>
            <LodingButton
              onClick={async () => {
                await tomoWalletConnect.disconnect()
              }}
            >
              disconnect
            </LodingButton>
            <br />
            <LodingButton
              onClick={async () => {
                await tomoWalletConnect.switchChainType('solana')
              }}
            >
              switch to solana chain
            </LodingButton>
            <LodingButton
              onClick={async () => {
                await tomoWalletConnect.switchChainType('evm')
              }}
            >
              switch to evm chain
            </LodingButton>

            <LodingButton
              onClick={async () => {
                await tomoWalletConnect.switchChain(bitcoinSignetChain)
              }}
            >
              switch to {bitcoinSignetChain?.name}
            </LodingButton>

            <LodingButton
              onClick={async () => {
                await tomoWalletConnect.switchChain(bnbChain)
              }}
            >
              switch to {bnbChain?.name}
            </LodingButton>
          </div>
          <StyleSetting {...props} />

          <ShowJson obj={tomoWalletState} title={'useTomoWalletState'} />
          <ShowJson obj={chain} title={'useChain'} />
          <ShowJson obj={tomoUserSocialInfo} title={'useTomoUserSocialInfo'} />
          <ShowJson obj={tomoClientMap} title={'useTomoClientMap'} />
          <ShowJson obj={settingChainsFlat} title={'useSettingChainsFlat'} />
          <ShowJson obj={tomoProps} title={'useTomoProps'} />
        </div>
        <div
          className={
            'flex h-full w-full flex-col items-center gap-4 overflow-auto bg-gray-100 px-4 py-10 md:w-auto md:px-20'
          }
        >
          <div>tomo social</div>
          <TomoSocial />
        </div>
      </div>
    </div>
  )
}

function StyleSetting({ style, setStyle }: ChildProps) {
  return (
    <div className={'flex gap-4'}>
      <div>style</div>
      <div>
        <div>rounded</div>
        <select
          value={style?.rounded}
          onChange={(e) => {
            setStyle({
              ...style,
              rounded: e.target.value
            })
          }}
        >
          <option>none</option>
          <option>min</option>
          <option>default</option>
          <option>max</option>
        </select>
      </div>
      <div>
        <div>theme</div>
        <div>
          <LodingButton
            onClick={(e) => {
              setStyle({
                ...style,
                theme: 'light'
              })
            }}
          >
            light
          </LodingButton>
          <LodingButton
            onClick={(e) => {
              setStyle({
                ...style,
                theme: 'dark'
              })
            }}
          >
            dark
          </LodingButton>
        </div>
      </div>
      <div>
        <div>primary</div>
        <div>
          <select
            value={style?.primaryColor}
            onChange={(e) => {
              setStyle({
                ...style,
                primaryColor: e.target.value
              })
            }}
          >
            <option value={'#121212'}>default</option>
            <option value={'#F21F7F'}>#F21F7F</option>
            <option value={'#fcd535'}>#fcd535</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function LodingButton({
                        onClick,
                        disabled,
                        ...otherProps
                      }: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  const [loading, loadingFn] = useLoading()
  return (
    <button
      {...otherProps}
      className={'border border-black px-1.5'}
      disabled={loading || disabled}
      onClick={() => {
        loadingFn(onClick)
      }}
    />
  )
}

const ShowJson = React.memo(function ShowJson({ title, obj, rows = 10 }) {
  const jsonFn = function jsonValueFn(key, value) {
    if (key && this !== obj) {
      if (typeof value === 'object' || typeof value === 'function') {
        if (Array.isArray(value)) {
          return `Array(${value.length})`
        }
        return 'object'
      }
      return value
    }
    return value
  }
  return (
    <div>
      <div>{title}: </div>
      <textarea
        value={JSON.stringify(obj, jsonFn, '\t')}
        className={'w-full border px-1'}
        rows={rows}
        readOnly
      ></textarea>
    </div>
  )
})
