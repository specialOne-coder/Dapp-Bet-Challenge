import React from 'react'
import { HomePage, SwaPage, LiquidityPage, BetPage } from '../pages/index'
import { Navbar } from './index'
import { SwapWidget } from '@uniswap/widgets'
import { chainlist, SwapTokens } from '../utils/chain-constants'
import { providers, ethers } from 'ethers'

const SwapUI = () => {
  let url =
    'https://app.uniswap.org/#/swap?inputCurrency=0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889&outputCurrency=0x6E072Ae62ed777875971F5016967E138F2F71F70'

  return (
    <div>
      <h1 className="text-3xl text-white  text-center ">
        Wrap Matic and buy $BET
      </h1>
      <div className="flex flex-1 justify-center items-center flex-col  mf:ml-30">
        <h1 className="text-lg text-white md:w-3/6 text-center mt-2">
          If fetching price not working, please refresh the page or go to{' '}
          <a target="_blank" href={url} className="text-blue-600">
            Uniswap
          </a>{' '}
          for buy $BET on Mumbai Testnet
        </h1>
        <div className="mt-5">
          <SwapWidget tokenList={SwapTokens}/>
        </div>
      </div>
    </div>
  )
}

export default SwapUI
