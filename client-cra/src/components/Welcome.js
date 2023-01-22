import React, { useContext } from 'react'
import { FaConnectdevelop } from 'react-icons/fa'
//import { AppContext } from '../context/AppContext';
import { useWeb3Modal, Web3Button } from '@web3modal/react'
import { shortenAddress } from '../utils/ShortAddress'
import { ethereumClient } from '../App'
import { Link } from 'react-router-dom'

const Welcome = () => {
  //const { currentAccount, connectWallet } = useContext(AppContext);

  return (
    <div className="welcome  max-w-[1500px] m-auto justify-center items-center p-[100px] ">
      <div className=" flex flex-col welcome-div-text md:flex-[0.5] flex justify-center px-20  items-center self-center">
        <div className="flex flex-wrap justify-center items-center flex-col  mf:ml-30">
          <h1 className="text-center sm:text-5xl text-white text-gradient py-1">
            Decentralized crypto betting platform
          </h1>
          <p className="text-center mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the world of decentralized betting. Add liquidity, buy, sell
            your crypto currencies easily. Create your own bets and let other
            users bet on them
          </p>
        </div>
        <div className=" items-center cursor-pointer">
          {!ethereumClient.getAccount().address ? (
            <Web3Button icon="show" label="Connect Wallet" balance="show" />
          ) : (
            <div className="flex flex-row">
              <div className="flex-initial w-32">
                <Link to="/swap">
                  <button
                    type="button"
                    //onClick={connectWallet}
                    className="text-white justify-center items-center my-5 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg cursor-pointer hover:bg-[#2546bd]"
                  >
                    Wrap & Swap
                  </button>
                </Link>
              </div>
              <div className="flex-initial w-32">
              <Link to="/liquidity">
                <button
                  type="button"
                  //onClick={connectWallet}
                  className="text-white flex flex-row justify-center items-center my-5 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg cursor-pointer hover:bg-[#2546bd]"
                >
                  Add liquidity
                </button>
                </Link>
              </div>
              <div className="flex-initial w-32">
              <Link to="/bets">
                <button
                  type="button"
                  //onClick={connectWallet}
                  className="text-white flex flex-row justify-center items-center my-5 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg cursor-pointer hover:bg-[#2546bd]"
                >
                  Participate
                </button>
                </Link>
              </div>
            </div>
          )}
          <p className="text-white text-base font-semibold">
            {/* {!currentAccount
                                    ? "Connect Wallet"
                                    : shortenAddress("currentAccount")} */}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Welcome
