import React, { useContext } from 'react'
import { FaConnectdevelop } from 'react-icons/fa'
//import { AppContext } from '../context/AppContext';
import { shortenAddress } from '../utils/ShortAddress'

const Welcome = () => {
  //const { currentAccount, connectWallet } = useContext(AppContext);

  return (
    <div className="welcome flex max-w-[1500px] m-auto justify-center items-center p-[100px] ">
      <div className="welcome-div-text md:flex-[0.5] flex justify-center px-20 flex-wrap items-center self-center">
        <div className="flex flex-1 justify-center items-center flex-col  mf:ml-30">
          <h1 className="text-center sm:text-5xl text-white text-gradient py-1">
            Decentralized crypto betting platform
          </h1>
          <p className="text-center mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the world of decentralized betting. Add liquidity, buy, sell
            your crypto currencies easily. Create your own bets and let other
            users bet on them
          </p>
        </div>
        <div className="welcome-button flex items-center cursor-pointer">
          <button
            type="button"
            //onClick={connectWallet}
            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-lg cursor-pointer hover:bg-[#2546bd]"
          >
            <FaConnectdevelop fontSize={25} className="text-white mr-0" />
            <p className="text-white text-base font-semibold">
              {/* {!currentAccount
                                    ? "Connect Wallet"
                                    : shortenAddress("currentAccount")} */}
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Welcome
