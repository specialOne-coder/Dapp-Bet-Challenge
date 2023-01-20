import { ethers, BigNumber } from 'ethers'
import React, { useState, createContext, useEffect } from 'react'
import { wagmiClient } from '../App'
import { chainlist } from '../utils/chain-constants'
// import { infuraId } from '../utils/app-constants'
import swal from 'sweetalert'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [currentAccount, setCurrentAccount] = useState()
  const [networkId, setNetworkId] = useState()
  const [networkRpc, setNetworkRpc] = useState()
  const [networkProvider, setNetworkProvider] = useState()
  const [tokenAllowance, setAllowanceA] = useState()
  const [tokenBAllowance, setAllowanceB] = useState()
  const [betAllowance, setBetAllowance] = useState()
  const [reserves, setReserves] = useState([])

  function dateToTimestamp(dateString) {
    return new Date(dateString).getTime() / 1000
  }

  async function init(contractAddress, contractABI, signer) {
    const contract = new ethers.Contract(contractAddress, contractABI, signer)
    return contract
  }

  async function getAllowance(
    contractAddress,
    contractABI,
    signer,
    owner,
    spender,
  ) {
    const contract = await init(contractAddress, contractABI, signer)
    let allowance = await contract.callStatic.allowance(owner, spender, {
      //gasLimit: 500000,
    })
    let conv = BigNumber.from(allowance).toString()
    return conv
  }

  async function getAllowanceA(
    contractAddress,
    contractABI,
    signer,
    owner,
    spender,
  ) {
    let all = await getAllowance(
      contractAddress,
      contractABI,
      signer,
      owner,
      spender,
    )
    setAllowanceA(all)
  }

  async function getAllowanceB(
    contractAddress,
    contractABI,
    signer,
    owner,
    spender,
  ) {
    let all = await getAllowance(
      contractAddress,
      contractABI,
      signer,
      owner,
      spender,
    )
    setAllowanceB(all)
  }

  async function getBetAllowance(
    contractAddress,
    contractABI,
    signer,
    owner,
    spender,
  ) {
    let all = await getAllowance(
      contractAddress,
      contractABI,
      signer,
      owner,
      spender,
    )
    console.log('Bet Allowance: ', all)
    setBetAllowance(all)
  }
  async function getReserves(contractAddress, contractABI, signer, user) {
    const contract = await init(contractAddress, contractABI, signer)
    let reserve0 = await contract.callStatic.reserve0({
      //gasLimit: 500000,
    })
    let finalReserve0 = BigNumber.from(reserve0).toString()
    let reserve1 = await contract.reserve1({
      //gasLimit: 500000,
    })
    let lpToken = await contract.balanceOf(user, {
      //gasLimit: 500000,
    })
    let finalReserve1 = BigNumber.from(reserve1).toString()
    let lpt = BigNumber.from(lpToken).toString()
    setReserves([finalReserve0, finalReserve1, lpt])
    return [finalReserve0, finalReserve1, lpt]
  }

  async function approve(contractAddress, contractABI, user, spender, amount) {
    // const contract = await init(contractAddress, contractABI, signer)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner(user)
    const contract = new ethers.Contract(contractAddress, contractABI, signer)

    await contract.callStatic
      .approve(spender, 5900000000000000, {
        gasLimit: 500000,
      })
      .then(async (res) => {
        let transaction
        try {
          let convert = ethers.utils.parseUnits(
            '59564166554664566456746567366576787649876789764856787',
            18,
          )
          let approve = await contract.approve(spender, convert, {
            gasLimit: 500000,
          })
          await approve.wait()
          swal({
            position: 'center',
            icon: 'success',
            title: `Approved  `,
            text: `Your approve is done`,
            button: false,
            footer: `<a target="_blank" href=${chainlist[0].explorer}/tx/${transaction}/>See Transaction</a>`,
          })
        } catch (error) {
          console.log('Error: ', error)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: '',
            size: '5',
            confirm: 'OK',
          })
        }
      })
      .catch((err) => {
        swal({
          position: 'center',
          icon: 'error',
          title: `Something went wrong `,
          text: `${err.message}`,
          className: 'text-center',
          button: false,
        })
      })
  }

  async function addLiquidity(
    contractAddress,
    contractABI,
    user,
    amountA,
    amountB,
  ) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner(user)
    const contract = new ethers.Contract(contractAddress, contractABI, signer)
    console.log('Contract: ', contract)
    let statics = await contract.callStatic
      .addLiquidity(amountA, amountB, {
        gasLimit: 500000,
      })
      .then(async (res) => {
        let transaction
        try {
          let add = await contract.addLiquidity(amountA, amountB, {
            gasLimit: 500000,
          })
          transaction = add.hash
          await add.wait()
          swal({
            position: 'center',
            icon: 'success',
            title: `Liquidity Added `,
            text: `Import ${chainlist[0].AMMAddress} to your wallet to see your lp token }`,
            className: 'text-center',
            button: false,
            footer: `<a target="_blank" href=${chainlist[0].explorer}/tx/${transaction}/>See Transaction</a>`,
          })
        } catch (error) {
          console.log('2 eme try : ', error)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: '',
            size: '5',
            confirm: 'OK',
          })
        }
      })
      .catch((err) => {
        swal({
          position: 'center',
          icon: 'error',
          title: `Something went wrong `,
          text: `${err.message}`,
          className: 'text-center',
          button: false,
        })
      })
    console.log('Static: ', statics)
  }

  async function removeLiquidity(contractAddress, contractABI, user) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner(user)
    const contract = new ethers.Contract(contractAddress, contractABI, signer)
    let reserves = await getReserves(contractAddress, contractABI, signer, user)

    await contract.callStatic
      .removeLiquidity(reserves[2], {
        gasLimit: 500000,
      })
      .then(async (res) => {
        let transaction
        try {
          let rem = await contract.removeLiquidity(reserves[2], {
            gasLimit: 500000,
          })
          transaction = rem.hash
          await rem.wait()
          swal({
            position: 'center',
            icon: 'success',
            title: `Liquidity removed `,
            text: `Your lp token is burned, your token are back in your wallet`,
            className: 'text-center',
            button: false,
            footer: `<a target="_blank" href=${chainlist[0].explorer}/tx/${transaction}/>See Transaction</a>`,
          })
        } catch (error) {
          console.log('2 eme try : ', error)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Remove liquidity failed',
            confirm: 'OK',
          })
        }
      })
      .catch((err) => {
        swal({
          position: 'center',
          icon: 'error',
          title: `Something went wrong `,
          text: `${err.message}`,
          className: 'text-center',
          button: false,
        })
      })
  }

  async function getBets() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      chainlist[0].contractAddress,
      chainlist[0].contractABI,
      signer,
    )
    let bets = await contract.getBets()
    console.log('Bets: ', bets)
    return bets
  }

  async function createBet(contractAddress, contractABI, user, data) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner(user)
    const contract = new ethers.Contract(contractAddress, contractABI, signer)
    //let reserves = await getReserves(contractAddress, contractABI, signer, user)

    try {
      contract.callStatic.createBet(
        dateToTimestamp(data.futureDate),
        dateToTimestamp(data.deadline),
        data.prediction,
        data.amount,
        {
          gasLimit: 500000,
        },
      )
    } catch (error) {
      swal('Error', 'error', 'error')
      //throw error
    }
    let transaction
    try {
      let create = await contract.createBet(
        dateToTimestamp(data.futureDate),
        dateToTimestamp(data.deadline),
        data.prediction,
        data.amount,
        {
          gasLimit: 500000,
        },
      )
      transaction = create.hash
      await create.wait()
      swal({
        position: 'center',
        icon: 'success',
        title: `Bet created `,
        text: `Now share your bet with friends and let them bet against you`,
        className: 'text-center',
        button: false,
        footer: `<a target="_blank" href=${chainlist[0].explorer}/tx/${transaction}/>See Transaction</a>`,
      })
    } catch (error) {
      console.log('2 eme try : ', error)
      swal({
        icon: 'error',
        title: 'Oops...',
        text: 'Bet creation failed, retry',
        size: '5',
        confirm: 'OK',
      })
    }
  }

  async function bet() {}

  return (
    <AppContext.Provider
      value={{
        getReserves,
        tokenAllowance,
        tokenBAllowance,
        getAllowanceA,
        getAllowanceB,
        getBetAllowance,
        reserves,
        approve,
        addLiquidity,
        removeLiquidity,
        betAllowance,
        createBet,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
