"use client";
import {
  TomoContextProvider,
  TomoSocial,
  useChain,
  useSettingChainsFlat,
  useTomoClientMap,
  useTomoModalControl,
  useTomoProps,
  useTomoWalletConnect,
  useTomoWalletState
} from '@tomo-inc/tomo-social-react'
import '@tomo-inc/tomo-social-react/style.css'
import { useLoading } from '@/hooks/useLoading'
import React from 'react'

const isProd = process.env.NEXT_PUBLIC_PRODUCT === "prod"

export default function Demo() {
  return (
    isProd ?
    <TomoContextProvider
      evmDefaultChainId={1}
      clientId={
        'yiPWTD4fztgEVS78HDUHoSFb4geppl2XTrhHZQUdGnh981bE13m2jrEwBhMlKNUNRWSoCYwD4ruOhWStuunYxMF0'
      }
    >
      <ChildComponent />
    </TomoContextProvider> 
    :
    <TomoContextProvider
      evmDefaultChainId={1}
      clientId={
        'bCMfq7lAMPobDhf6kWAHAPtO5Ct6YuA77W9SzhjUixFwOOi0f92vsdJpkAhn0W4tg8TVSeTNUSvBOC3MXYRuIH0Z'
      }
      sdkMode={'dev'}
    >
      <ChildComponent />
    </TomoContextProvider>
  )
}

export function ChildComponent() {
  const tomoModal = useTomoModalControl()
  const tomoWalletState = useTomoWalletState()
  const tomoClientMap = useTomoClientMap()
  const settingChainsFlat = useSettingChainsFlat()
  const chain = useChain()
  const tomoProps = useTomoProps()
  const tomoWalletConnect = useTomoWalletConnect()

  const bnbChain = settingChainsFlat.find((item) => {
    return item.id === 56 && item.type === 'evm'
  })

  const bitcoinSignetChain = settingChainsFlat.find((item) => {
    return item.networkName === 'signet' && item.type === 'bitcoin'
  })

  return (
    <div className={'flex h-screen w-screen'}>
      <div
        className={
          'hidden h-full flex-col text-sm gap-4 overflow-auto border-r border-r-black/10 p-10 md:flex md:flex-1'
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

        <ShowJson obj={tomoWalletState} title={'useTomoWalletState'} />
        <ShowJson obj={chain} title={'useChain'} />
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
      className={'border border-black px-2'}
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
        className={'w-full border p-1'}
        rows={rows}
        readOnly
      ></textarea>
    </div>
  )
})

