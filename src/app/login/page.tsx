"use client";
import {
  TomoContextProvider,
  TomoSocial,
  useTomoClientMap,
  useTomoModalControl,
  useTomoWalletConnect,
  useTomoWalletState
} from '@tomo-inc/tomo-social-react'
import '@tomo-inc/tomo-social-react/style.css'
import {useState} from "react";

export default function Demo() {
  return (
    <TomoContextProvider
      evmDefaultChainId={1}
      clientId={
        'bCMfq7lAMPobDhf6kWAHAPtO5Ct6YuA77W9SzhjUixFwOOi0f92vsdJpkAhn0W4tg8TVSeTNUSvBOC3MXYRuIH0Z'
      }
      sdkMode={'dev'}
      logLevel={'debug'}
    >
      <ChildComponent />
    </TomoContextProvider>
  )
}

export function ChildComponent() {
  const tomoModal = useTomoModalControl()
  const tomoWalletState = useTomoWalletState()
  const tomoClientMap = useTomoClientMap()
  const tomoWalletConnect = useTomoWalletConnect()
  return (
    <div className={'tomo-social tm-flex tm-h-screen tm-w-screen'}>
      <div
        className={
          'tm-flex tm-h-full tm-flex-1 tm-flex-col tm-gap-4 tm-border-r tm-border-r-black/10 tm-px-10 tm-py-10 tm-overflow-auto'
        }
      >
        <div className={'tm-flex tm-gap-3 tm-flex-wrap'}>
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
            switch to solana
          </LodingButton>
          <LodingButton
            onClick={async () => {
              await tomoWalletConnect.switchChainType('bitcoin')
            }}
          >
            switch to bitcoin
          </LodingButton>
          <LodingButton
            onClick={async () => {
              await tomoWalletConnect.switchChainType('evm')
            }}
          >
            switch to evm
          </LodingButton>
        </div>

        <ShowJson obj={tomoWalletState} title={'useTomoWalletState'} />
        <ShowJson obj={tomoClientMap} title={'useTomoClientMap'} />
      </div>
      <div className={'tm-flex tm-flex-col tm-gap-4 tm-px-20 tm-py-10'}>
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
      disabled={loading || disabled}
      onClick={() => {
        loadingFn(onClick)
      }}
    />
  )
}

function ShowJson({ title, obj, rows = 10 }) {
  const jsonFn = function jsonValueFn(key, value) {
    if (key && this !== obj) {
      return 'any'
    }
    return value
  }
  return (
    <div>
      <div>{title}: </div>
      <textarea
        value={JSON.stringify(obj, jsonFn, '\t')}
        className={'tm-w-full'}
        rows={rows}
      ></textarea>
    </div>
  )
}


const loadState = {
  getNextState(cur: boolean | number, change: number) {
    if (!cur || typeof cur === 'boolean') {
      cur = 0
    }
    return cur + change
  },
  createFn(changeLoadFn: Function) {
    return async function <T>(
      promise: Promise<T> | Function | Boolean
    ): Promise<T> {
      if (typeof promise === 'boolean') {
        changeLoadFn(promise ? 1 : -1)
        // @ts-ignore
        return
      }
      changeLoadFn(1)
      let result
      try {
        if (typeof promise === 'function') {
          result = await promise()
        } else {
          result = await promise
        }
      } catch (e) {
        changeLoadFn(-1)
        throw e
      }
      changeLoadFn(-1)
      return result
    }
  }
}

export function useLoading(
  initValue: boolean | number = false
): [boolean, <T>(promise: Promise<T> | Function | Boolean) => Promise<T>] {
  const [loading, setLoading] = useState<boolean | number>(initValue)
  return [
    !!loading,
    loadState.createFn((change: number) => {
      setLoading((prev: boolean | number) =>
        loadState.getNextState(prev, change)
      )
    })
  ]
}