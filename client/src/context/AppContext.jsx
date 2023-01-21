import React, { useState, createContext, useEffect } from 'react'
import { ethers, BigNumber } from 'ethers'
import { wagmiClient } from '../App'
import { chainlist } from '../utils/chain-constants'
// import { infuraId } from '../utils/app-constants'
import swal from 'sweetalert'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [loadingApprove, setLoadingApprove] = useState(false)
  const [loadingRemove, setLoadingRemove] = useState(false)
  const [currentAccount, setCurrentAccount] = useState()
  const [networkId, setNetworkId] = useState()
  const [networkRpc, setNetworkRpc] = useState()
  const [networkProvider, setNetworkProvider] = useState()
  const [tokenAllowance, setAllowanceA] = useState()
  const [tokenBAllowance, setAllowanceB] = useState()
  const [betAllowance, setBetAllowance] = useState()
  const [reserves, setReserves] = useState([])
  const [bets, setBets] = useState([])

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
    let reserve1 = await contract.callStatic.reserve1({
      //gasLimit: 500000,
    })
    let lpToken = await contract.callStatic.balanceOf(user, {
      //gasLimit: 500000,
    })
    let finalReserve1 = BigNumber.from(reserve1).toString()
    let lpt = BigNumber.from(lpToken).toString()
    let userL = await contract.callStatic.getUserLiquidity(user, {})
    console.log('User Liquidity: ', userL)
    let ul0 = BigNumber.from(userL.amount0).toString()
    let ul1 = BigNumber.from(userL.amount1).toString()

    console.log('Reserves: ', finalReserve0, finalReserve1, lpt)
    setReserves([finalReserve0, finalReserve1, lpt, ul0, ul1])
    return [finalReserve0, finalReserve1, lpt, ul0, ul1]
  }

  async function approve(contractAddress, contractABI, user, spender, amount) {
    setLoadingApprove(true)
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
          setLoadingApprove(false);
        } catch (error) {
          setLoadingApprove(false);
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
        setLoadingApprove(false);
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
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner(user)
    const contract = new ethers.Contract(contractAddress, contractABI, signer)
    let convertA = ethers.utils.parseUnits(amountA.toString(), 18)
    let convertB = ethers.utils.parseUnits(amountB.toString(), 18)
    let statics = await contract.callStatic
      .addLiquidity(convertA, convertB, {
        gasLimit: 500000,
      })
      .then(async (res) => {
        let transaction
        try {
          let add = await contract.addLiquidity(convertA, convertB, {
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
          setLoading(false);
        } catch (error) {
          console.log('2 eme try : ', error)
          setLoading(false);
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
        setLoading(false);
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
    setLoadingRemove(true);
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
          setLoadingRemove(false);
        } catch (error) {
          setLoadingRemove(false);
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
        setLoadingRemove(false);
      })
  }

  async function getBets() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      chainlist[0].BetAddress,
      chainlist[0].BetAbi,
      signer,
    )
    let betIds = await contract.callStatic.betIds({})
    let conv = BigNumber.from(betIds).toString()
    let bets = []
    for (let i = 0; i < conv; i++) {
      let bet = await contract.callStatic.bets(i)
      let time = BigNumber.from(bet.time).toString()
      let deadline = BigNumber.from(bet.lastTimeToParticipate).toString()
      let status = BigNumber.from(bet.status).toString()
      let prediction = BigNumber.from(bet.futurePrice).toString()
      let finalPrice = BigNumber.from(bet.finalPrice).toString()
      let amount = BigNumber.from(bet.betAmount).toString()
      let playersLenght = BigNumber.from(bet.totalPlayers).toString()
      let players = []
      let pool = 0
      let id = i
      for (let j = 0; j < playersLenght; j++) {
        let player = await contract.callStatic.betPlayers(i, j)
        let deposit = BigNumber.from(player.depositAmount).toString()
        let playerPrediction = BigNumber.from(player.pricePrediction).toString()
        let addr = player.player
        pool += parseInt(deposit)
        let playerStruct = {
          deposit,
          playerPrediction,
          addr,
        }
        players.push(playerStruct)
      }
      const structuredBet = {
        id,
        time,
        deadline,
        status,
        prediction,
        finalPrice,
        amount,
        players,
        pool,
      }
      bets.push(structuredBet)
    }
    console.log('bets: ', bets)
    setBets(bets)
    return bets
  }

  async function createBet(contractAddress, contractABI, user, data) {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner(user)
    const contract = new ethers.Contract(contractAddress, contractABI, signer)
    //let reserves = await getReserves(contractAddress, contractABI, signer, user)
    let convertA = ethers.utils.parseUnits(data.amount.toString(), 18)
    let convertPrediction = ethers.utils.parseUnits(
      data.prediction.toString(),
      18,
    )
    await contract.callStatic
      .createBet(
        dateToTimestamp(data.futureDate),
        dateToTimestamp(data.deadline),
        convertPrediction,
        convertA,
        {
          gasLimit: 500000,
        },
      )
      .then(async (res) => {
        let transaction
        try {
          let create = await contract.createBet(
            dateToTimestamp(data.futureDate),
            dateToTimestamp(data.deadline),
            convertPrediction,
            convertA,
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
          setLoading(false);
        } catch (error) {
          console.log('2 eme try : ', error)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Bet creation failed, retry',
            size: '5',
            confirm: 'OK',
          })
          setLoading(false);
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
        setLoading(false);
      })
  }

  async function participation(
    contractAddress,
    contractABI,
    user,
    data,
    userPrediction,
  ) {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner(user)
    const contract = new ethers.Contract(contractAddress, contractABI, signer)
    console.log('data: ', data)
    await contract.callStatic
      .bet(data.id, userPrediction, data.amount, {
        gasLimit: 500000,
      })
      .then(async (res) => {
        let transaction
        try {
          let part = await contract.bet(data.id, userPrediction, data.amount, {
            gasLimit: 500000,
          })
          transaction = part.hash
          await part.wait()
          swal({
            position: 'center',
            icon: 'success',
            title: `Bet created `,
            text: `Now share your bet with friends and let them bet against you`,
            className: 'text-center',
            button: false,
            footer: `<a target="_blank" href=${chainlist[0].explorer}/tx/${transaction}/>See Transaction</a>`,
          })
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log('2 eme try : ', error)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Bet creation failed, retry',
            size: '5',
            confirm: 'OK',
          })
        }
      })
      .catch((err) => {
        setLoading(false);
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

  async function reward(contractAddress, contractABI, user, betId) {
    setLoading(false);
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner(user)
    const contract = new ethers.Contract(contractAddress, contractABI, signer)
    console.log('data: ', betId)
    await contract.callStatic
      .rewards(betId, {
        gasLimit: 500000,
      })
      .then(async (res) => {
        let transaction
        try {
          let reward = await contract.rewards(betId, {
            gasLimit: 500000,
          })
          transaction = reward.hash
          await reward.wait()
          swal({
            position: 'center',
            icon: 'success',
            title: `Bet created `,
            text: `Now share your bet with friends and let them bet against you`,
            className: 'text-center',
            button: false,
            footer: `<a target="_blank" href=${chainlist[0].explorer}/tx/${transaction}/>See Transaction</a>`,
          })
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log('2 eme try : ', error)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Bet creation failed, retry',
            size: '5',
            confirm: 'OK',
          })
        }
      })
      .catch((err) => {
        setLoading(false);
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

  return (
    <AppContext.Provider
      value={{
        getReserves,
        tokenAllowance,
        tokenBAllowance,
        getAllowanceA,
        getAllowanceB,
        getBetAllowance,
        participation,
        loading,
        loadingApprove,
        reserves,
        loadingRemove,
        approve,
        addLiquidity,
        reward,
        removeLiquidity,
        betAllowance,
        bets,
        createBet,
        getBets,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
