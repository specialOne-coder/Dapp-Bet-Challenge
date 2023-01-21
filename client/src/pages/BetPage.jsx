import React, { useContext, useEffect } from 'react'
import { BetCard, Welcome } from '../components/index'
import { AppContext } from '../context/AppContext'

const BetPage = () => {
  const { getBets, bets } = useContext(AppContext)

  useEffect(() => {
    const interval = setInterval(async () => {
      await getBets()
    }, 1000)

    return () => clearInterval(interval)
  }, [])
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        <div className=" w-full text-white text-center py-3 font-bold">
          <p className=" text-4xl"> Bets</p> <br></br> <br />
          <div className="flex justify-center items-start ">
            {bets.map((bet, i) => (
              <BetCard key={i} bet={bet} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BetPage
