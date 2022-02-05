// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const OLD_CNM = "0x50B03840952Ac65737955C4df4A3d342ae57d1E1";
const NEW_CNM = "0x55ff2f2cffd83a9f48ecad1547607211f65c58fc";
const CONTRACT_ADDR_HABITAT = "0x996863a1d07838793A1CB29C6d18715BC956d370";
const CONTRACT_ADDR_RANDOM = "0x69D65EA814AAB02A3501F43028eC6A28cFD05425";
const CONTRACT_ADDR_CHEDDAR = "0x95F62926c2335ADbB97F4C59253b16c45b253e6B";
const CONTRACT_ADDR_CNMGAME = "0x1099f942eE92156c2F29e8aCdD777Ac22e95Adb5";

const deploy = async (name: string, ...args: any) => {
  const Registry = await ethers.getContractFactory(name);
  const registry = await Registry.deploy(...args);
  await registry.deployed();
  console.log(`${name} deployed to:`, registry.address);
  return registry;
};

const getInstance = async (name: string, address: string) => {
  // Set up an ethers contract, representing our deployed Box instance
  const Contract = await ethers.getContractFactory(name);
  const instance = await Contract.attach(address);

  return instance;
};

async function deployProc() {
  const cnmGame = await getInstance("CnMGame", CONTRACT_ADDR_CNMGAME);
  const random = await getInstance("RandomGenerator", CONTRACT_ADDR_RANDOM);
  const cheddar = await getInstance("CHEDDAR", CONTRACT_ADDR_CHEDDAR);
  const habitat = await getInstance("Habitat", CONTRACT_ADDR_HABITAT);
  const oldCnm = await getInstance("CnM", OLD_CNM);
  const cnm = await getInstance("CnMCheddar", NEW_CNM);
  const trait = await deploy("Traits");

  await cnmGame.setContracts(
    cheddar.address,
    trait.address,
    cnm.address,
    habitat.address,
    random.address
  );
  await trait.setCnM(cnm.address);
  await cnm.setContracts(
    trait.address,
    habitat.address,
    random.address,
    OLD_CNM
  );
  await oldCnm.setContracts(trait.address, habitat.address, random.address);
}

deployProc();
