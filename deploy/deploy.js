const { ethers, upgrades } = require("hardhat");

module.exports = async function ({ deployments, getNamedAccounts }) {
  // Upgreadable bet contract
  // const Bet = await ethers.getContractFactory("Bets")
  // console.log("Deploying Bets...")
  // const bet = await upgrades.deployProxy(Bet,["0x6E072Ae62ed777875971F5016967E138F2F71F70"], { initializer: '_betToken'})

  // // console.log(bet.address," bet(proxy) address")
  // // console.log(await upgrades.erc1967.getImplementationAddress(bet.address)," getImplementationAddress")
  // // console.log(await upgrades.erc1967.getAdminAddress(bet.address)," getAdminAddress")   
  
   // Upgreadable Token contract
  // const BeToken = await ethers.getContractFactory("Betis")
  // console.log("Deploying Bet token...")
  // const betoken = await upgrades.deployProxy(BeToken,[10000000], { initializer: 'intialSupply'})

  // // console.log(betoken.address," bet(proxy) address")
  // // console.log(await upgrades.erc1967.getImplementationAddress(betoken.address)," getImplementationAddress")
  // // console.log(await upgrades.erc1967.getAdminAddress(betoken.address)," getAdminAddress") 
  
    // Upgreadable AMM contract
  // const AMM = await ethers.getContractFactory("AMM")
  // console.log("Deploying Bet token...")
  // const amm = await upgrades.deployProxy(AMM,["0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889","0x6E072Ae62ed777875971F5016967E138F2F71F70"], { initializer: {token0,token1}}})

  // // console.log(amm.address," amm(proxy) address")
  // // console.log(await upgrades.erc1967.getImplementationAddress(amm.address)," getImplementationAddress")
  // // console.log(await upgrades.erc1967.getAdminAddress(amm.address)," getAdminAddress")  

  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  console.log(`>>> your address: ${deployer}`)
  console.log(`On [${hre.network.name}] `)

  // await deploy('Bets', {
  //   // Put your contract name here
  //   from: deployer,
  //   args: ["0x6E072Ae62ed777875971F5016967E138F2F71F70"],
  //   log: true,
  //   waitConfirmations: 1,
  // })

  // await deploy('Betis', {
  //   // Put your contract name here
  //   from: deployer,
  //   args: [100000000],
  //   log: true,
  //   waitConfirmations: 1,
  // })

  await deploy('AMM', {
    // Put your contract name here
    from: deployer,
    args: ["0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889","0x6E072Ae62ed777875971F5016967E138F2F71F70"],
    log: true,
    waitConfirmations: 1,
  })

}

module.exports.tags = ['BeTokenAmm'] 
