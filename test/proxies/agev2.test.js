// test/1.Agev2.test.ts
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Contract, BigNumber } = require("ethers");


describe("Box (proxy) V2", function () {
  let box
  let boxV2;

  beforeEach(async function () {
    const Box = await ethers.getContractFactory("Age")
    const BoxV2 = await ethers.getContractFactory("AgeV2")

    //initilize with 42
    box = await upgrades.deployProxy(Box, [42], {initializer: 'store'})
    // console.log(box.address," box/proxy")
    // console.log(await upgrades.erc1967.getImplementationAddress(box.address)," getImplementationAddress")
    // console.log(await upgrades.erc1967.getAdminAddress(box.address), " getAdminAddress")   

    boxV2 = await upgrades.upgradeProxy(box.address, BoxV2)
    // console.log(boxV2.address," box/proxy after upgrade")
    // console.log(await upgrades.erc1967.getImplementationAddress(boxV2.address)," getImplementationAddress after upgrade")
    // console.log(await upgrades.erc1967.getAdminAddress(boxV2.address)," getAdminAddress after upgrade")   
  })

  it("should retrieve value previously stored and increment correctly", async function () {
    expect(await boxV2.getAge()).to.equal(BigNumber.from('42'))
     
    //result = 42 + 1 = 43
    expect(await boxV2.getAgeV2()).to.equal(BigNumber.from('1'))

    await boxV2.store(100)
    expect(await boxV2.getAge()).to.equal(BigNumber.from('100'))
  })

})