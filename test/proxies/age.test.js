// test/1.Age.test.ts
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Contract, BigNumber } = require("ethers");

describe("Age (proxy)", function () {
  let age;

  beforeEach(async function () {
    const Age = await ethers.getContractFactory("Age");
    //initialize with 42
    age = await upgrades.deployProxy(Age, [42], { initializer: "store" });
  });

  it("should retrieve value previously stored", async function () {
    // console.log(age.address," age(proxy)")
    // console.log(await upgrades.erc1967.getImplementationAddress(age.address)," getImplementationAddress")
    // console.log(await upgrades.erc1967.getAdminAddress(age.address), " getAdminAddress")

    expect(await age.getAge()).to.equal(BigNumber.from("42"));
    
    await age.store(100);
    expect(await age.getAge()).to.equal(BigNumber.from("100"));
  });
});
