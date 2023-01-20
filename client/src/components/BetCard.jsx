import React, { useState, useContext } from 'react'
import { SiBeatport, SiEthereum } from 'react-icons/si'
import { BsInfoCircle } from 'react-icons/bs'
import { FaMonero, FaVoteYea } from 'react-icons/fa'

const BetCard = () => {
  return (
    <div className="">
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-center md:p-5 py-12 px-4">
          <div className="flex flex-1 justify-center items-center flex-col  mf:ml-30">
            <div className="p-3 justify-center items-start flex-col rounded-xl sm:w-60 w-full my-5 eth-card .white-glassmorphism ">
              <div className="flex justify-center flex-col w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                    <FaMonero fontSize={21} color="#fff" />
                  </div>
                  <BsInfoCircle fontSize={17} color="#fff" />
                </div>
                <div className="cardEth">
                  {/* <ReactRoundedImage
                        image={photo}
                        roundedColor=""
                        imageWidth="150"
                        imageHeight="150"
                        roundedSize="0"
                        hoverColor="#DD1144"
                      /> */}
                  <div className="flex flex-col">
                    <div className="border-double border-4 border-white border rounded-lg text-white mt-5">
                      {' '}
                      <p className="ml-5 mr-5"> Owner : {'0x0000'}</p>
                    </div>
                    <div className="border-double border-4 border-white border rounded-lg text-white mt-5">
                      {' '}
                      <p className="ml-5 mr-5"> Prediction Date : {'18 April 2023'}</p>
                    </div>
                    <div className="border-double border-4 border-white border rounded-lg text-white mt-5">
                      {' '}
                      <p className="ml-5 mr-5"> Prediction : {'1500$'}</p>
                    </div>

                    <div className="border-double border-4 border-white border rounded-lg text-white mt-5">
                      {' '}
                      <p className="ml-5 mr-5"> Pool : {'100$'}</p>
                    </div>

                    <div className="border-double border-4 border-white border rounded-lg text-white mt-5">
                      {' '}
                      <p className="ml-5 mr-5"> Price : {'20 $BET'}</p>
                    </div>
                    <div className="border-double border-4 border-white border rounded-lg text-white mt-5">
                      {' '}
                      <p className="ml-5 mr-5"> Limit Date : {'12/01/23'}</p>
                    </div>
                  </div>
                  <p className="text-white text-center font-semibold text-lg mt-1">
                    {/* {nom} */}
                  </p>
                  <button
                    // key={numero}
                    // type="button"
                    // disabled={disable}
                    // onClick={async () => {
                    //   setDisable(true);
                    //   await votePremierTour(numero);
                    //   setDisable(false);
                    // }}
                    className="flex flex-row justify-center w-full items-center bg-[#2952e3] p-2 rounded-lg cursor-pointer mt-5"
                  >
                    {/* {loading && candidat === numero ? (
                          <Loader taille={10} />
                        ) : (
                          <>
                            <FaVoteYea fontSize={25} className="text-white mr-2" />
                            <p className="text-white text-base font-semibold">
                              Voter
                            </p>
                          </>
                        )} */}
                    <p className="text-white text-base font-semibold">
                      Participate
                    </p>
                  </button>
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
