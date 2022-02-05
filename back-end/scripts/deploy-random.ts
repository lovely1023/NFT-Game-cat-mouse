// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const deploy = async (name: string, ...args: any) => {
  const Registry = await ethers.getContractFactory(name);
  const registry = await Registry.deploy(...args);
  await registry.deployed();
  console.log(`${name} deployed to:`, registry.address);
  return registry;
};

async function deployProc() {
  await deploy(
    "RandomGenerator",
    "0xf0d54349aDdcf704F77AE15b96510dEA15cb7952",
    "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    "0xAA77729D3466CA35AE8D28B3BBAC7CC36A5031EFDC430821C02BC31A238AF445"
  );
}

deployProc();
