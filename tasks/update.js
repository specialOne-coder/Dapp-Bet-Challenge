

module.exports = async function (taskArgs, hre) {
  
  const proxyAddress = '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0'
  console.log(proxyAddress," original Box(proxy) address")
  const AgeV2 = await ethers.getContractFactory("AgeV2")
  console.log("upgrade to AgeV2...")
  const ageV2 = await upgrades.upgradeProxy(proxyAddress, AgeV2)
  console.log(ageV2.address," AgeV2 address(should be the same)")
  
  console.log(await upgrades.erc1967.getImplementationAddress(ageV2.address)," getImplementationAddress")
  console.log(await upgrades.erc1967.getAdminAddress(ageV2.address), " getAdminAddress")    
}