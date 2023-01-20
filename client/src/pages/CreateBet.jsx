import React, { useContext, useEffect } from 'react'
import { ethereumClient, wagmiClient } from '../App'
import { Welcome } from '../components/index'
import { AppContext } from '../context/AppContext'
import { chainlist, MY_TOKEN_LIST } from '../utils/chain-constants'

const CreateBet = () => {
  const { approve, getBetAllowance, betAllowance, createBet } = useContext(
    AppContext,
  )

  useEffect(() => {
    const interval = setInterval(async () => {
      await getBetAllowance(
        MY_TOKEN_LIST[1].address,
        MY_TOKEN_LIST[1].TokenAbi,
        wagmiClient.provider,
        ethereumClient.getAccount().address,
        chainlist[0].BetAddress,
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="m-auto ">
      <div className="flex flex-1 justify-center items-center flex-col  mf:ml-30">
        <h1 className="text-2xl text-white md:w-3/6 text-center mt-20">
          Create your own bets on the price of Ether and let others degens bet
          against you
        </h1>
      </div>
      <div className="welcome flex max-w-[1500px] m-auto justify-center items-center ">
        <div className="bg-slate-300 py-20 px-10  justify-center items-center border-gray-300 rounded-lg ">
          <div className="flex w-10 ">
            <div className=""></div>
            <div className="flex-initial w-64">
              <label htmlFor="" className="text-sm">
                The day you want to bet on ether *{' '}
              </label>
              <input
                type="date"
                id="futureDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[15rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                placeholder="The day you want to bet on ether"
                min="1"
                max="1"
                required
              />
            </div>
          </div>
          <div className="mt-2 w-10 ">
            <div className="flex">
              <div className=""></div>
              <div className="flex-initial w-64">
                <label htmlFor="" className="text-sm">
                  Deadline for participation *{' '}
                </label>
                <input
                  type="datetime-local"
                  id="deadline"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[15rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  placeholder="The day you want to bet on ether"
                  min="1"
                  max="1"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-2 w-10 ">
            <div className="flex">
              <div className=""></div>
              <div className="flex-initial w-64">
                <label htmlFor="" className="text-sm">
                  Your prediction *{' '}
                </label>
                <input
                  type="number"
                  id="prediction"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[15rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                  placeholder="1500$"
                  min="1"
                  max="1"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-2 w-10 ">
            <div className="flex">
              <div className=""></div>
              <div className="flex-initial w-64">
                <label htmlFor="" className="text-sm">
                  Amount you wish to bet (With bet token) *{' '}
                </label>
                <input
                  type="number"
                  id="amount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[15rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                  placeholder="250 $BET"
                  min="1"
                  max="1"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {betAllowance > 0 ? (
              ''
            ) : (
              <button
                type="submit"
                className="text-white w-[16rem] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6"
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
              >
                Approve
              </button>
            )}
            <button
              type="submit"
              className="text-white w-[16rem] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6"
              onClick={async () => {
                const futureDate = document.getElementById('futureDate').value
                const deadline = document.getElementById('deadline').value
                const prediction = document.getElementById('prediction').value
                const amount = document.getElementById('amount').value

                const data = {
                  futureDate,
                  deadline,
                  prediction,
                  amount,
                }

                await createBet(
                  chainlist[0].BetAddress,
                  chainlist[0].BetAbi,
                  ethereumClient.getAccount().address,
                  data,
                )
              }}
            >
              Create Bet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBet
