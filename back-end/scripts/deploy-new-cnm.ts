// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const getInstance = async (name: string, address: string) => {
  // Set up an ethers contract, representing our deployed Box instance
  const Contract = await ethers.getContractFactory(name);
  const instance = await Contract.attach(address);

  return instance;
};

// Traits deployed to: 0x502A32eAaa4bb3Ce5fDC0A5A31810a02ec5bCaf6
// HouseTraits deployed to: 0xE2E0E45aCF8619fba85Dd827FE137c6bB6A8B78b
// Habitat deployed to: 0xd69c21975C66206dD0186B0Dc40f77F08F9eB27B
// RandomGenerator deployed to: 0x687ED0BBe2d0582C5B772fA6c10B32A5A1c639eF
// CnM deployed to: 0x1bDC2F571054a79f42eCAdA310ccd3242D3D4F0B
// House deployed to: 0x538a49eC4F7BCF8C7D2F92c7Bb05366c5e4db446
// CHEDDAR deployed to: 0xeb762c1f7964D0B61da8B274315020aDDc479D66
// CnMGame deployed to: 0xeAf5dDA6f0f56cc97E847311ed6cE37f5d9154e9
// HouseGame deployed to: 0x0F63bc03b43Df28a2e6B1f64594f5694bCA85D62

const OLD_CNM = "0x104c7ade921b3c0b35c5f37c8ba5e6492d10e281";
const CONTRACT_ADDR_HABITAT = "0xd69c21975C66206dD0186B0Dc40f77F08F9eB27B";
const CONTRACT_ADDR_RANDOM = "0x687ED0BBe2d0582C5B772fA6c10B32A5A1c639eF";
const CONTRACT_ADDR_HOUSE = "0x538a49eC4F7BCF8C7D2F92c7Bb05366c5e4db446";
const CONTRACT_ADDR_CHEDDAR = "0xeb762c1f7964D0B61da8B274315020aDDc479D66";
const CONTRACT_ADDR_CNMGAME = "0xeAf5dDA6f0f56cc97E847311ed6cE37f5d9154e9";
const CONTRACT_ADDR_HOUSEGAME = "0x0F63bc03b43Df28a2e6B1f64594f5694bCA85D62";

const deploy = async (name: string, ...args: any) => {
  const Registry = await ethers.getContractFactory(name);
  const registry = await Registry.deploy(...args);
  await registry.deployed();
  console.log(`${name} deployed to:`, registry.address);
  return registry;
};

async function deployProc() {
  const cnmGame = await getInstance("CnMGame", CONTRACT_ADDR_CNMGAME);
  const random = await getInstance("RandomGenerator", CONTRACT_ADDR_RANDOM);
  const cheddar = await getInstance("CHEDDAR", CONTRACT_ADDR_CHEDDAR);
  const house = await getInstance("House", CONTRACT_ADDR_HOUSE);
  const houseGame = await getInstance("HouseGame", CONTRACT_ADDR_HOUSEGAME);
  const habitat = await getInstance("Habitat", CONTRACT_ADDR_HABITAT);

  const oldCnm = await getInstance("CnM", OLD_CNM);

  const cnm = await deploy("CnMCheddar", 50000);
  const trait = await deploy("Traits");

  await cnm.setContracts(
    trait.address,
    habitat.address,
    random.address,
    OLD_CNM
  );
  await habitat.setContracts(
    cnm.address,
    cheddar.address,
    cnmGame.address,
    houseGame.address,
    random.address,
    house.address
  );
  await cnmGame.setContracts(
    cheddar.address,
    trait.address,
    cnm.address,
    habitat.address,
    random.address
  );

  await cnm.addAdmin(cnmGame.address);
  await cnm.addAdmin(habitat.address);
  await trait.setCnM(cnm.address);
  await oldCnm.addAdmin(cnm.address);
  await cnm.setPaused(false);
  await cnm.setMinted();
}

deployProc();
