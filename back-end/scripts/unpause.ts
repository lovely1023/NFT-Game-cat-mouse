// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { spawn } from "child_process";
import { ethers } from "hardhat";

// export const _OLDCNM = "0x1bDC2F571054a79f42eCAdA310ccd3242D3D4F0B";
// export const _TRAITS = "0xEab70BbEc7814e44eD7c5Cf796c866Eb01309Bae";
// export const _HOUSETRAITS = "0xBe6826fE629caFB3C54623aF1A0cf514A2403010";
// export const _HABITAT = "0x996863a1d07838793A1CB29C6d18715BC956d370";
// export const _RANDOM_GEN = "0x69D65EA814AAB02A3501F43028eC6A28cFD05425";
// export const _CNM = "0x1C2699178121e79ac9AA125507D86699597ABBd8";
// export const _HOUSE = "0x0507f38951C8FCF10E74D3F23CaBFc886138FeD2";
// export const _CHEDDAR = "0x95F62926c2335ADbB97F4C59253b16c45b253e6B";
// export const _CNMGAME = "0x1099f942eE92156c2F29e8aCdD777Ac22e95Adb5";
// export const _HOUSEGAME = "0x8451453aBB5ACDBF63Db821668A070F14787d7Fe";

const CONTRACT_ADDR_TRAIT = "0xEab70BbEc7814e44eD7c5Cf796c866Eb01309Bae";
const CONTRACT_ADDR_HOUSE_TRAIT = "0xBe6826fE629caFB3C54623aF1A0cf514A2403010";
const CONTRACT_ADDR_HABITAT = "0x996863a1d07838793A1CB29C6d18715BC956d370";
const CONTRACT_ADDR_RANDOM = "0x69D65EA814AAB02A3501F43028eC6A28cFD05425";
const CONTRACT_ADDR_CNM = "0x1C2699178121e79ac9AA125507D86699597ABBd8";
const CONTRACT_ADDR_HOUSE = "0x0507f38951C8FCF10E74D3F23CaBFc886138FeD2";
const CONTRACT_ADDR_CHEDDAR = "0x95F62926c2335ADbB97F4C59253b16c45b253e6B";
const CONTRACT_ADDR_CNMGAME = "0x1099f942eE92156c2F29e8aCdD777Ac22e95Adb5";
const CONTRACT_ADDR_HOUSEGAME = "0x8451453aBB5ACDBF63Db821668A070F14787d7Fe";

const getInstance = async (name: string, address: string) => {
  // Set up an ethers contract, representing our deployed Box instance
  const Contract = await ethers.getContractFactory(name);
  const instance = await Contract.attach(address);

  return instance;
};

async function unpause() {
  const cnm = await getInstance("CnM", CONTRACT_ADDR_CNM);
  const cnmGame = await getInstance("CnMGame", CONTRACT_ADDR_CNMGAME);
  const house = await getInstance("House", CONTRACT_ADDR_HOUSE);
  const houseGame = await getInstance("HouseGame", CONTRACT_ADDR_HOUSEGAME);
  const habitat = await getInstance("Habitat", CONTRACT_ADDR_HABITAT);
  const trait = await getInstance("Traits", CONTRACT_ADDR_TRAIT);
  const houseTrait = await getInstance(
    "HouseTraits",
    CONTRACT_ADDR_HOUSE_TRAIT
  );
  await trait.setCnM(cnm.address);
  await houseTrait.setCnM(house.address);
  await cnm.setPaused(false);
  await cnmGame.setPaused(false);
  await house.setPaused(false);
  await houseGame.setPaused(false);
  await habitat.setPaused(false);
}

unpause();