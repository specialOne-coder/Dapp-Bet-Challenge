import React, { useState, useContext, useEffect } from 'react'
import { SiBeatport, SiEthereum } from 'react-icons/si'
import { BsCalendarDate, BsInfoCircle, BsShareFill } from 'react-icons/bs'
import { GiMoneyStack, GiWantedReward } from 'react-icons/gi'
import { FcMoneyTransfer } from 'react-icons/fc'
import { MdOnlinePrediction, MdOutlineOnlinePrediction } from 'react-icons/md'

import {
  FaConnectdevelop,
  FaMonero,
  FaUserCircle,
  FaUserFriends,
  FaVoteYea,
} from 'react-icons/fa'
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { GrMoney, GrView } from 'react-icons/gr'

import { shortenAddress } from '../utils/ShortAddress'
import { ethereumClient, wagmiClient } from '../App'
import { AppContext } from '../context/AppContext'
import { chainlist, MY_TOKEN_LIST } from '../utils/chain-constants'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loader from './Loader'

const BetCard = ({ bet }) => {
  const {
    betAllowance,
    getBetAllowance,
    approve,
    participation,
    reward,
    loadingApprove,
    loading,
  } = useContext(AppContext)

  const navigate = useNavigate()

  const openDetails = () => {
    navigate('/details', {
      state: { player: bet.players },
    })
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      await getBetAllowance(
        MY_TOKEN_LIST[1].address,
        MY_TOKEN_LIST[1].TokenAbi,
        wagmiClient.provider,
        ethereumClient.getAccount().address,
        chainlist[0].BetAddress,
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  function timestampToDate(timestamp) {
    var date = new Date(timestamp * 1000)
    return date.toDateString()
  }

  function timestampToDateHour(timestamp) {
    var date = new Date(timestamp * 1000)
    return date.toUTCString()
  }

  return (
    <div className="">
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-center md:p-5 py-12 px-4">
          <div className="flex flex-1 justify-center items-center flex-col  mf:ml-30">
            <div className="p-3 justify-center items-start flex-col rounded-xl w-full my-5 eth-card .white-glassmorphism ">
              <div className="flex justify-center flex-col w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                    <FaMonero fontSize={21} color="#fff" />
                  </div>
                  <BsInfoCircle fontSize={17} color="#fff" />
                </div>
                <div className="cardEth">
                  <p className="text-center text-white">
                    {' '}
                    {bet.active != 2 ? 'Status : Active' : 'Status : Finish '}
                  </p>
                  <div className="flex flex-col">
                    <div className="flex flex-row ">
                      <div className="bg-white flex-initial w-32 border-white rounded-lg text-white mt-5 py-5">
                        {' '}
                        <p className="bg-white ml-2 mr-2">
                          <button className=" text-black px-1 ">
                            <center>
                              <BiUserCircle
                                fontSize={20}
                                className=""
                                color="#0f0e13"
                              />
                            </center>
                            Owner :
                            <p className="font-normal">
                              {shortenAddress(bet.players[0].addr)}{' '}
                            </p>
                          </button>
                        </p>
                      </div>

                      <div className="bg-white flex-initial w-32 border-white ml-2  rounded-lg text-white  py-5 px-1 mt-5">
                        <button className=" text-black px-1 ">
                          <center>
                            <FaUserFriends
                              fontSize={20}
                              className=""
                              color="#0f0e13"
                            />
                          </center>
                          Total Players :{'  '}
                          <p className="font-light">{bet.players.length} </p>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row ">
                      <div className="bg-white flex-initial w-32 border-white  rounded-lg text-white mt-2 py-2 px-1 ">
                        <button className=" text-black px-1 ">
                          <center>
                            <BsCalendarDate
                              fontSize={20}
                              className=""
                              color="#0f0e13"
                            />
                          </center>
                          Prediction Date :{' '}
                          <p className="font-light">
                            {timestampToDate(bet.time)}{' '}
                          </p>
                        </button>
                      </div>
                      <div className="bg-white flex-initial w-32 border-white ml-2 rounded-lg text-white mt-2 px-2 py-1">
                        <button className="text-black ">
                          <center>
                            <BsCalendarDate
                              fontSize={20}
                              className=""
                              color="#0f0e13"
                            />
                          </center>
                          Deadline :{' '}
                          <p className="font-light">
                            {timestampToDateHour(bet.deadline)}
                          </p>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-row ">
                      <div className="bg-white flex-initial w-32 border-white rounded-lg text-white mt-2 py-2 px-1 ">
                        <center>
                          <GrMoney fontSize={20} className="" color="#0f0e13" />

                          <p className="font-light text-black py-2">
                            Pool : {bet.pool / 10 ** 18} $BET{' '}
                          </p>
                        </center>
                      </div>
                      <div className="bg-white flex-initial w-32 ml-2 border-white  rounded-lg text-white mt-2 px-2 py-1">
                        <center>
                          <GiMoneyStack
                            fontSize={20}
                            className=""
                            color="#0f0e13"
                          />
                          <p className="font-light text-black py-2">
                            Price : {bet.players[0].deposit / 10 ** 18} $BET{' '}
                          </p>
                        </center>
                      </div>
                    </div>
                    <div className="flex flex-row ">
                      <div className=" bg-white flex-initial w-32   border-white rounded-lg text-white mt-2 py-2 px-1 ">
                        <button className="  text-black px-2 ">
                          <center>
                            <MdOnlinePrediction
                              fontSize={20}
                              className=""
                              color="#0f0e13"
                            />
                          </center>
                          Owner prediction :{' '}
                          <p className="font-light">{bet.prediction/10 ** 18} $USD </p>
                        </button>
                      </div>
                      <Link to="/details" state={{ players: bet.players }}>
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex-initial w-32  border-white ml-2 rounded-lg text-white mt-2 px-2 py-1">
                          <button className=" rounded-lg text-black px-2 w-full mt-5  ">
                            <center>
                              <GrView
                                fontSize={16}
                                className=""
                                color="#0f0e13"
                              />
                              See players{' '}
                            </center>
                          </button>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {betAllowance > 0 ? (
                    ''
                  ) : (
                    <button
                      onClick={async () => {
                        console.log('Approve :', chainlist[0].BetAddress)
                        await approve(
                          chainlist[0].TokenAddress,
                          chainlist[0].TokenAbi,
                          ethereumClient.getAccount().address,
                          chainlist[0].BetAddress,
                          0,
                        )
                      }}
                      className="flex flex-row justify-center w-full items-center bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg cursor-pointer mt-5"
                    >
                      {/* {loadingApprove ? (
                        <Loader />
                      ) : ( */}
                      <p className="text-white text-base font-semibold">
                        Approve $Bet
                      </p>
                      {/* )} */}
                    </button>
                  )}
                  {bet.players[0].addr ==
                  ethereumClient.getAccount().address ? (
                    <button className="flex flex-row justify-center w-full items-center bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg cursor-pointer mt-2">
                      <p className="text-white text-base font-semibold flex flex-row">
                        Share <BsShareFill fontSize={20} className="ml-2" />
                      </p>
                    </button>
                  ) : (
                    <>
                      <div className="flex flex-row ">
                        <div className="flex-initial w-32   border-white rounded-lg text-white mt-2 py-2 px-1 ">
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
                        <div className=" flex-initial w-32  border-white ml-2 rounded-lg text-white mt-2 px-2 py-1">
                          <button
                            onClick={async () => {
                              const userPrediction = document.getElementById(
                                'userprediction',
                              ).value
                              if (userPrediction > 0) {
                                await participation(
                                  chainlist[0].BetAddress,
                                  chainlist[0].BetAbi,
                                  ethereumClient.getAccount().address,
                                  bet,
                                  userPrediction,
                                )
                              }
                            }}
                            className="flex flex-row justify-center w-full items-center bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg cursor-pointer mt-2"
                          >
                            {/* {loading ? (
                              <Loader />
                            ) : ( */}
                            <p className="text-white text-base font-semibold flex flex-row">
                              Participate{' '}
                              <FcMoneyTransfer fontSize={20} className="ml-2" />
                            </p>
                            {/* )} */}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  {new Date() > new Date(bet.time * 1000) ? (
                    <button
                      onClick={async () => {
                        await reward(
                          chainlist[0].BetAddress,
                          chainlist[0].BetAbi,
                          ethereumClient.getAccount().address,
                          bet.id,
                        )
                      }}
                      className="flex flex-row justify-center w-full items-center bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg cursor-pointer mt-2"
                    >
                      <p className="text-white text-base font-semibold flex flex-row">
                        Reward <GiWantedReward fontSize={20} className="ml-2" />
                      </p>
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BetCard
