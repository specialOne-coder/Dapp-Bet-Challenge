import React, { Fragment, useState, useContext, useEffect } from 'react'
import { HomePage, SwaPage, LiquidityPage, BetPage } from '../pages/index'
import { MY_TOKEN_LIST, chainlist } from '../utils/chain-constants'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { AppContext } from '../context/AppContext'
import { ethereumClient, wagmiClient } from '../App'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function computeOutput(event) {
  let value = event.target.value
}

function computeOutputB(event) {
  let value = event.target.value
}

const companyCommonStyles =
  'min-h-[70px] sm:px-0 px-2 sm:min-w-[220px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'

const Liquidity = () => {
  const {
    getReserves,
    getAllowance,
    reserves,
    getAllowanceA,
    getAllowanceB,
    tokenAllowance,
    addLiquidity,
    tokenBAllowance,
    approve,
    removeLiquidity,
  } = useContext(AppContext)

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

  function computeOutput(event) {
    let r = reserves;
    let val1 = event.target.value
    computeOutputB(event, val1)
  }

  function computeOutputB(event) {
    let val2 = event.target.value
  }
  const [selectedTokenA, setSelectedTokenA] = useState(MY_TOKEN_LIST[0])
  const [selectedTokenB, setSelectedTokenB] = useState(MY_TOKEN_LIST[1])

  return (
    <div>
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-center justify-between  py-8 px-4">
          <div className="flex flex-1 justify-center items-center flex-col  mf:ml-30">
            <h1 className="text-3xl text-white  py-1"> Your liquidity </h1>
            <div className="grid sm:grid-cols-4 grid-cols-2 w-full mt-5">
              <div
                className={`rounded-tl-2xl sm:rounded-bl-2xl ${companyCommonStyles}`}
              >
                <p className="font-bold text-[20px]">Tokens</p>
              </div>
              <div className={companyCommonStyles}>
                <p className="font-bold text-[20px]">LpToken</p>
              </div>

              <div className={companyCommonStyles}>
                <p className="font-bold text-[20px]">APR</p>
              </div>

              <div
                className={`sm:rounded-tr-2xl rounded-br-2xl ${companyCommonStyles}`}
              >
                <p className="font-bold text-[20px]">Retrieve</p>
              </div>
            </div>
            {reserves[0] > 0 && reserves[1] > 0 && reserves[2] > 0 ? (
              <div className="grid sm:grid-cols-4 w-full" key={1}>
                <>
                  <div
                    className={`rounded-tl-2xl sm:rounded-bl-2xl ${companyCommonStyles}`}
                  >
                    <p className="">
                      {reserves[0]} $BET , {reserves[1]} $WMATIC
                    </p>
                  </div>
                  <div className={companyCommonStyles}>
                    {reserves[2]} lpToken
                  </div>
                  <div className={companyCommonStyles}>{12.5}% APR</div>
                  <div
                    className={`sm:rounded-tr-2xl rounded-br-2xl ${companyCommonStyles}`}
                  >
                    <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-lg cursor-pointer hover:bg-[#2546bd]">
                      <button
                        onClick={async () => {
                          await removeLiquidity(
                            chainlist[0].AMMAddress,
                            chainlist[0].AmmAbi,
                            ethereumClient.getAccount().address,
                          )
                        }}
                      >
                        Remove liquidity
                      </button>
                    </li>
                  </div>
                </>
              </div>
            ) : (
              <h1 className="text-xl text-white  py-5">Loading... </h1>
            )}
            {/* ))
          )} } */}
          </div>
        </div>
      </div>
      <h1 className="text-3xl text-white  text-center "> Add liquidity </h1>
      <div className="flex flex-1 justify-center items-center flex-col  mf:ml-30">
        <h1 className="text-md text-white md:w-3/6 text-center mt-2">
          Buy $BET and Wrap your matic to $WMATIC. Approve your $WMATIC and $BET
          tokens to the AMM and add liquidity to earn rewards. Be sure to
          provide two assets of equal value
        </h1>
      </div>
      <div className="welcome flex max-w-[1500px] m-auto justify-center items-center ">
        <div className="bg-slate-300 py-20 px-10  justify-center items-center border-gray-300 rounded-lg ">
          <div className="flex w-10 ">
            <div className="">
              <Listbox value={selectedTokenA} onChange={setSelectedTokenA}>
                {({ open }) => (
                  <>
                    {/* <Listbox.Label className="block text-sm font-bold text-white mt-[3rem]">
                      Token A
                    </Listbox.Label> */}
                    <div className=" relative">
                      <Listbox.Button className="relative w-[8rem] bg-white border border-gray-300 rounded-md shadow-sm pr-10 py-1.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 ">
                        <span className="flex items-center">
                          <span className="ml-3 block text-black truncate">
                            {selectedTokenA.name}
                          </span>
                        </span>
                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 w-[15rem] bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                          <Listbox.Option
                            key={MY_TOKEN_LIST[0].name}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? 'text-white bg-indigo-600'
                                  : 'text-gray-900',
                                'cursor-default select-none relative py-2 pr-9',
                              )
                            }
                            value={MY_TOKEN_LIST[0]}
                            onClick={async () => {
                              //   verifyNetwork(
                              //     chainlist.chainid,
                              //     chainlist.chain_name,
                              //     chainlist.rpcMainnet,
                              //   )
                            }}
                          >
                            {({ selectedTokenA, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(
                                      selectedTokenA
                                        ? 'font-semibold'
                                        : 'font-normal',
                                      'ml-3 block truncate',
                                    )}
                                  >
                                    {MY_TOKEN_LIST[0].name}
                                  </span>
                                </div>

                                {selectedTokenA ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4',
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
            <div className="flex-initial w-64">
              <input
                type="number"
                id="amountA"
                className="w-[8rem] ml-2 bg-white border border-gray-300 rounded-md shadow-sm  text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
                placeholder="0"
                min="1"
                max="1"
                onChange={computeOutput}
                required
              />
            </div>
          </div>
          <div className="mt-10 w-10 ">
            <div className="flex">
              <div className="">
                <Listbox value={selectedTokenB} onChange={setSelectedTokenB}>
                  {({ open }) => (
                    <>
                      <div className=" relative">
                        <Listbox.Button className="relative w-[8rem] bg-white    border border-gray-300 rounded-md shadow-sm pr-10 py-1.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 ">
                          <span className="flex items-center">
                            <span className="ml-3 text-black block truncate">
                              {selectedTokenB.name}
                            </span>
                          </span>
                          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 w-[15rem] bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            <Listbox.Option
                              key={MY_TOKEN_LIST[1].name}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? 'text-white bg-indigo-600'
                                    : 'text-gray-900',
                                  'cursor-default select-none relative py-2 pr-9',
                                )
                              }
                              value={MY_TOKEN_LIST[1]}
                              onClick={async () => {
                                //   verifyNetwork(
                                //     chainlist.chainid,
                                //     chainlist.chain_name,
                                //     chainlist.rpcMainnet,
                                //   )
                              }}
                            >
                              {({ selectedTokenB, active }) => (
                                <>
                                  <div className="flex items-center">
                                    <span
                                      className={classNames(
                                        selectedTokenB
                                          ? 'font-semibold'
                                          : 'font-normal',
                                        'ml-3 block truncate',
                                      )}
                                    >
                                      {MY_TOKEN_LIST[1].name}
                                    </span>
                                  </div>
                                  {selectedTokenB ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? 'text-white'
                                          : 'text-indigo-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
              <div className="flex-initial w-64">
                <input
                  type="number"
                  id="amountB"
                  className="w-[8rem] ml-2 bg-white border border-gray-300 rounded-md shadow-sm  text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
                  placeholder="0"
                  min="1"
                  max="1"
                  required
                  onChange={computeOutputB}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {tokenAllowance && tokenBAllowance > 0 ? (
              ''
            ) : (
              <>
                <button
                  type="submit"
                  className="text-white w-[16rem] bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6"
                  onClick={async () => {
                    const amountA = document.getElementById('amountA').value
                    const amountB = document.getElementById('amountB').value
                    console.log('Approve :', chainlist[0].AMMAddress)
                    if (tokenAllowance > 0) {
                      await approve(
                        selectedTokenB.address,
                        selectedTokenB.TokenAbi,
                        ethereumClient.getAccount().address,
                        chainlist[0].AMMAddress,
                        amountB,
                      )
                    } else {
                      await approve(
                        selectedTokenA.address,
                        selectedTokenA.TokenAbi,
                        ethereumClient.getAccount().address,
                        chainlist[0].AMMAddress,
                        amountA,
                      )
                    }
                  }}
                >
                  {tokenAllowance > 0
                    ? `Approve ${MY_TOKEN_LIST[1].name}`
                    : `Approve ${MY_TOKEN_LIST[0].name}`}
                  {/* Approve */}
                </button>
              </>
            )}
            <button
              type="submit"
              className="text-white w-[16rem] bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6"
              onClick={async () => {
                const amountA = document.getElementById('amountA').value
                const amountB = document.getElementById('amountB').value
                console.log('Add Liquidity :', chainlist[0].AMMAddress)
                await addLiquidity(
                  chainlist[0].AMMAddress,
                  chainlist[0].AmmAbi,
                  ethereumClient.getAccount().address,
                  amountA,
                  amountB,
                )
              }}
            >
              Add Liquidity
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Liquidity
