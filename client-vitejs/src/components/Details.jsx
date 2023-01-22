import React, { Fragment, useState, useContext, useEffect } from 'react'
import { HomePage, SwaPage, LiquidityPage, BetPage } from '../pages/index'
import { MY_TOKEN_LIST, chainlist } from '../utils/chain-constants'
import { AppContext } from '../context/AppContext'
import { ethereumClient, wagmiClient } from '../App'
import { useLocation } from 'react-router-dom'
import { shortenAddress } from '../utils/ShortAddress'
import { BsShareFill } from 'react-icons/bs'
import { FcMoneyTransfer } from 'react-icons/fc'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const companyCommonStyles =
  'min-h-[70px] sm:px-0 px-2 sm:min-w-[220px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'

const BetDetails = () => {
  const {
    getReserves,
    reserves,
    getAllowanceA,
    getAllowanceB,
    tokenAllowance,
    addLiquidity,
    tokenBAllowance,
    approve,
    removeLiquidity,
  } = useContext(AppContext)

  const [amountB, setAmountB] = useState('')

  const location = useLocation()
  console.log('location', location)

  useEffect(() => {
    const interval = setInterval(async () => {
      await getReserves(
        chainlist[0].AMMAddress,
        chainlist[0].AmmAbi,
        wagmiClient.provider,
        ethereumClient.getAccount().address,
      )
      await getAllowanceA(
        MY_TOKEN_LIST[0].address,
        MY_TOKEN_LIST[0].TokenAbi,
        wagmiClient.provider,
        ethereumClient.getAccount().address,
        chainlist[0].AMMAddress,
      )
      await getAllowanceB(
        MY_TOKEN_LIST[1].address,
        MY_TOKEN_LIST[1].TokenAbi,
        wagmiClient.provider,
        ethereumClient.getAccount().address,
        chainlist[0].AMMAddress,
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const [selectedTokenA, setSelectedTokenA] = useState(MY_TOKEN_LIST[0])
  const [selectedTokenB, setSelectedTokenB] = useState(MY_TOKEN_LIST[1])

  return (
    <div>
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-center justify-between  py-8 px-4">
          <div className="flex flex-1 justify-center items-center flex-col  mf:ml-30">
            <h1 className="text-3xl text-white  py-1"> Bet players</h1>
            <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-5">
              <div
                className={`rounded-tl-2xl sm:rounded-bl-2xl ${companyCommonStyles}`}
              >
                <p className="font-bold text-[20px]">Player</p>
              </div>
              <div className={companyCommonStyles}>
                <p className="font-bold text-[20px]">Prediction</p>
              </div>
              <div
                className={`sm:rounded-tr-2xl rounded-br-2xl ${companyCommonStyles}`}
              >
                <p className="font-bold text-[20px]">Amount betted</p>
              </div>
            </div>
            {location.state.players.map((player, i) => (
              <div className="grid sm:grid-cols-3 w-full" key={1}>
                <div
                  className={`rounded-tl-2xl sm:rounded-bl-2xl ${companyCommonStyles}`}
                >
                  <p className="">{shortenAddress(player.addr)}</p>
                </div>
                <div className={companyCommonStyles}>
                  {player.playerPrediction} $USD
                </div>
                <div
                  className={`sm:rounded-tr-2xl rounded-br-2xl ${companyCommonStyles}`}
                >
                  {player.deposit / 10 ** 18} $BET
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {location.state.players[0].addr == ethereumClient.getAccount().address ? (
        <center>
          <button className=" justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg cursor-pointer mt-2">
            <p className="text-white text-base font-semibold flex flex-row">
              Share <BsShareFill fontSize={20} className="ml-2" />
            </p>
          </button>
        </center>
      ) : (
        <>
          <center>
            <div className="flex flex-row justify-center items-center ">
              <div className="flex-initial w-32  border-white rounded-lg text-white mt-2 py-2 px-1 ">
                <input
                  type="number"
                  id="userprediction"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[15rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                  placeholder="Your prediction"
                  min="1"
                  max="1"
                  required
                />
              </div>
              <div className=" flex-initial w-32  border-white ml-2 rounded-lg text-white mt-1 px-2 py-1">
                <button
                  onClick={async () => {
                    const userPrediction = document.getElementById(
                      'userprediction',
                    ).value

                    await participation(
                      chainlist[0].BetAddress,
                      chainlist[0].BetAbi,
                      ethereumClient.getAccount().address,
                      bet,
                      userPrediction,
                    )
                  }}
                  className="flex flex-row justify-center w-full items-center bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg cursor-pointer mt-2"
                >
                  <p className="text-white text-base font-semibold flex flex-row">
                    Participate{' '}
                    <FcMoneyTransfer fontSize={20} className="ml-2" />
                  </p>
                </button>
              </div>
            </div>
          </center>
        </>
      )}
    </div>
  )
}

export default BetDetails
