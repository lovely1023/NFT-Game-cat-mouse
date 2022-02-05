// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { spawn } from "child_process";
import { ethers } from "hardhat";

const getInstance = async (name: string, address: string) => {
  // Set up an ethers contract, representing our deployed Box instance
  const Contract = await ethers.getContractFactory(name);
  const instance = await Contract.attach(address);

  return instance;
};

// Traits deployed to: 0x502A32eAaa4bb3Ce5fDC0A5A31810a02ec5bCaf6
// HouseTraits deployed to: 0xBe6826fE629caFB3C54623aF1A0cf514A2403010
// Habitat deployed to: 0x996863a1d07838793A1CB29C6d18715BC956d370
// RandomGenerator deployed to: 0x69D65EA814AAB02A3501F43028eC6A28cFD05425
// CnM deployed to: 0x1bDC2F571054a79f42eCAdA310ccd3242D3D4F0B
// House deployed to: 0x0507f38951C8FCF10E74D3F23CaBFc886138FeD2
// CHEDDAR deployed to: 0x95F62926c2335ADbB97F4C59253b16c45b253e6B
// CnMGame deployed to: 0x1099f942eE92156c2F29e8aCdD777Ac22e95Adb5
// HouseGame deployed to: 0x8451453aBB5ACDBF63Db821668A070F14787d7Fe

// export const _TRAITS = "0x40106F72223216f25d57971905E6be8bFE2b4e4B";
// export const _HOUSETRAITS = "0xBe6826fE629caFB3C54623aF1A0cf514A2403010";

const OLD_CNM = "0x1A1AE43Cd3533254474A5feE5CC37BA66D3612ee";
const CONTRACT_ADDR_CNM = "0x50B03840952Ac65737955C4df4A3d342ae57d1E1";

async function deployProc() {
  const oldCnm = await getInstance("CnM", OLD_CNM);
  const newCnm = await getInstance("CnMCheddar", CONTRACT_ADDR_CNM);

  await oldCnm.addAdmin(newCnm.address);
}

deployProc();
