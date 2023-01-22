import React, { useContext, useEffect } from 'react'
import { BetCard, Loader, Welcome } from '../components/index'
import { AppContext } from '../context/AppContext'

const BetPage = () => {
  const { getBets, bets, betAllowance } = useContext(AppContext)

  useEffect(() => {
    const interval = setInterval(async () => {
      await getBets()
    }, 1000)

    return () => clearInterval(interval)
  }, [])
  return (
    <div>
      <p className=" text-4xl text-center text-white"> Bets</p> <br></br> <br />
      {bets.length == 0 ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-center">
          {bets
            .sort(function (a, b) {
              return b.id - a.id
            })
            .map((bet, i) => (
              <BetCard key={i} bet={bet} />
            ))}
        </div>
      )}
    </div>
  )
}

export default BetPage
