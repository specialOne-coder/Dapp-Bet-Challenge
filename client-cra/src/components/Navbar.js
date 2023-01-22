import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { HiMenuAlt4, HiOutlineCubeTransparent } from 'react-icons/hi'
import { AiOutlineClose, AiOutlineSwap } from 'react-icons/ai'
//import { shortenAddress } from "../utils/ShortAdress";
import { FaHammer } from 'react-icons/fa'
import hlogo from '../assets/ethereum.png'
import { GiMoneyStack, GiWantedReward } from 'react-icons/gi'
import { Web3Button } from '@web3modal/react'
import { ethereumClient } from '../App'
//import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)

  //const { currentAccount, connectWallet } = useContext(AppContext);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.8] flex-initial justify-center items-center">
        <div className="text-white md:flex  list-none fex-row justify-between items-center fex-initial">
          <div className="menu-transition bg-gradient-to-r from-cyan-500 to-blue-500 py-1 px-3 mx-4 rounded-lg cursor-pointer hover:bg-[#2546bd]">
            <Link to="/">
              <img className="head_logo w-10" src={hlogo} />
            </Link>
          </div>
        </div>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        <li className="menu-transition mx-4 cursor-pointer border-b-2 border-transparent hover:border-blue-600">
          <Link to="/swap">Swap</Link>
        </li>
        <li className="menu-transition mx-4 cursor-pointer border-b-2 border-transparent hover:border-blue-600">
          <Link to="/liquidity"> Liquidity</Link>
        </li>
        <li className="menu-transition mx-4 cursor-pointer border-b-2 border-transparent hover:border-blue-600">
          <Link to="/bets"> Bets</Link>
        </li>
        <li className="menu-transition mx-4 cursor-pointer flex flex-row justify-center items-center my-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 rounded-lg cursor-pointer hover:bg-[#2546bd]">
          <Link to="/create"> Create Bet</Link>
        </li>
        {ethereumClient.getAccount().isConnected ? (
          <p className="text-white bg-white border rounded-lg">
            <Web3Button icon="show" label="Connect Wallet" balance="show" />
          </p>
        ) : (
          <Web3Button icon="show" label="Connect Wallet" balance='show' />
        )}
      </ul>
      <div className="flex relative">
        {!toggleMenu ? (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        ) : (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => {
              setToggleMenu(false)
            }}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                   flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            <li className="mx-4 cursor-pointer">
              <button className="flex flex-row items-center my-2 border-solid border-2  mr-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md cursor-pointer h-8 w-40 place-content-center">
                <AiOutlineSwap
                  fontSize={20}
                  className="text-white text-center pr-1"
                  color="#fff"
                />
                <p className="text-white font-bold  pr-1 pl-1">
                  <Link to="/swap">Swap</Link>
                </p>
              </button>
            </li>

            <li className="mx-4 cursor-pointer">
              <button className="flex flex-row items-center my-2 border-solid border-2  mr-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md cursor-pointer h-8 w-40 place-content-center">
                <GiMoneyStack
                  fontSize={20}
                  className="text-white text-center pr-1"
                  color="#fff"
                />
                <p className="text-white font-bold  pr-1 pl-1">
                  <Link to="/liquidity"> Liquidity</Link>
                </p>
              </button>
            </li>
            <li className="mx-4 cursor-pointer">
              <button className="flex flex-row items-center my-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-solid border-2  mr-2  rounded-md cursor-pointer h-8 w-40 place-content-center">
                <HiOutlineCubeTransparent
                  fontSize={20}
                  className="text-white text-center pr-1"
                  color="#fff"
                />
                <p className="text-white font-bold  pr-1 pl-1">
                  <Link to="/bets"> Bets</Link>
                </p>
              </button>
            </li>
            <li className="mx-4 cursor-pointer">
              <button className="flex flex-row items-center my-2 border-solid border-2  mr-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md cursor-pointer h-8 w-40 place-content-center">
                <FaHammer
                  fontSize={20}
                  className="text-white text-center pr-1"
                  color="#fff"
                />
                <p className="text-white font-bold  pr-1 pl-1">
                  <Link to="/create"> Create Bet</Link>
                </p>
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
