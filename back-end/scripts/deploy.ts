// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import {spawn} from "child_process";
import {ethers} from "hardhat";

const deploy = async (name: string, ...args: any) => {
  const Registry = await ethers.getContractFactory(name);
  const registry = await Registry.deploy(...args);
  await registry.deployed();
  console.log(`${name} deployed to:`, registry.address);
  return registry;
};

async function deployProc() {
  /** Deploy contracts **/
  const trait = await deploy("Traits");
  const houseTrait = await deploy("HouseTraits");
  const habitat = await deploy("Habitat");
  const random = await deploy(
    "RandomGenerator",
    "0xf0d54349aDdcf704F77AE15b96510dEA15cb7952",
    "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    "0xAA77729D3466CA35AE8D28B3BBAC7CC36A5031EFDC430821C02BC31A238AF445"
  );
  const cnm = await deploy("CnM", 50000);

  const house = await deploy("House", 50000);
  const cheddar = await deploy("CHEDDAR");
  const cnmGame = await deploy("CnMGame");
  const houseGame = await deploy("HouseGame");

  /** make controller admin */
  await cnm.addAdmin(cnmGame.address);
  await cnm.addAdmin(habitat.address);
  await cnmGame.addAdmin(cnmGame.address);
  await cheddar.addAdmin(cnmGame.address);
  await cheddar.addAdmin(habitat.address);
  await house.addAdmin(houseGame.address);
  await house.addAdmin(habitat.address);
  await houseGame.addAdmin(cnmGame.address);
  await cheddar.addAdmin(houseGame.address);

  /**set contracts**/
  await cnm.setContracts(trait.address, habitat.address, random.address);
  await house.setContracts(houseTrait.address, habitat.address, random.address);
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
  await cnmGame.setRoot(
    "0xccae15edda06943547e52d8adb572c44f61a912ff0e6ee69a2431e97454aebfe"
  );
  await houseGame.setContracts(
    cheddar.address,
    houseTrait.address,
    habitat.address,
    house.address,
    random.address
  );
  await houseTrait.setCnM(house.address);
  await trait.setCnM(cnm.address);
  await cnmGame.togglePublicSale();
}

deployProc();
