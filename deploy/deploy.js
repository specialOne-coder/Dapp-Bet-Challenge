const { ethers, upgrades } = require("hardhat");

module.exports = async function ({ deployments, getNamedAccounts }) {
  // const Box = await ethers.getContractFactory("Bets")
  // console.log("Deploying Bets...")
  // const box = await upgrades.deployProxy(Box,[42], { initializer: 'store'})

  // // console.log(box.address," age(proxy) address")
  // // console.log(await upgrades.erc1967.getImplementationAddress(box.address)," getImplementationAddress")
  // // console.log(await upgrades.erc1967.getAdminAddress(box.address)," getAdminAddress")    

  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  console.log(`>>> your address: ${deployer}`)
  console.log(`On [${hre.network.name}] `)

  await deploy('Bets', {
    // Put your contract name here
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
  })
}

module.exports.tags = ['Bets'] 
