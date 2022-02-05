// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { spawn } from "child_process";
import { ethers } from "hardhat";
const CONTRACT_ADDR_RANDOM = "0x7f10F12E86cF266285775cd4aFB0D2deab0D2982";

const getInstance = async (name: string, address: string) => {
  // Set up an ethers contract, representing our deployed Box instance
  const Contract = await ethers.getContractFactory(name);
  const instance = await Contract.attach(address);

  return instance;
};

async function unpause() {
  const random = await getInstance("RandomGenerator", CONTRACT_ADDR_RANDOM);
  await random
    .addAdmin("0xb1716E8DbDc47055aa0C5b2aBb73DcAad4b711F3", {
      gasPrice: 8000000000,
    })
    .then(() => {
      console.log("ADDED ADMIN");
    });
}

unpause();
