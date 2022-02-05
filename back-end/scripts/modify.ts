x; // We require the Hardhat Runtime Environment explicitly here. This is optional
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

const CONTRACT_ADDR_TRAIT = "0x502A32eAaa4bb3Ce5fDC0A5A31810a02ec5bCaf6";
const CONTRACT_ADDR_HOUSE_TRAIT = "0xBe6826fE629caFB3C54623aF1A0cf514A2403010";
const CONTRACT_ADDR_HABITAT = "0x996863a1d07838793A1CB29C6d18715BC956d370";
const CONTRACT_ADDR_RANDOM = "0x69D65EA814AAB02A3501F43028eC6A28cFD05425";
const CONTRACT_ADDR_CNM = "0x1bDC2F571054a79f42eCAdA310ccd3242D3D4F0B";
const CONTRACT_ADDR_HOUSE = "0x0507f38951C8FCF10E74D3F23CaBFc886138FeD2";
const CONTRACT_ADDR_CHEDDAR = "0x95F62926c2335ADbB97F4C59253b16c45b253e6B";
const CONTRACT_ADDR_CNMGAME = "0x1099f942eE92156c2F29e8aCdD777Ac22e95Adb5";
const CONTRACT_ADDR_HOUSEGAME = "0x8451453aBB5ACDBF63Db821668A070F14787d7Fe";

async function deployProc() {
  const cnm = await getInstance("CnMCheddar", CONTRACT_ADDR_CNM);
  const cnmGame = await getInstance("CnMGame", CONTRACT_ADDR_CNMGAME);
  const random = await getInstance("RandomGenerator", CONTRACT_ADDR_RANDOM);
  const cheddar = await getInstance("CHEDDAR", CONTRACT_ADDR_CHEDDAR);
  const house = await getInstance("House", CONTRACT_ADDR_HOUSE);
  const houseGame = await getInstance("HouseGame", CONTRACT_ADDR_HOUSEGAME);
  const habitat = await getInstance("Habitat", CONTRACT_ADDR_HABITAT);
  const trait = await getInstance("Traits", CONTRACT_ADDR_TRAIT);
  const houseTrait = await getInstance(
    "HouseTraits",
    CONTRACT_ADDR_HOUSE_TRAIT
  );

  await cnm.setContracts(
    trait.address,
    habitat.address,
    random.address,
    "0xa6AC8E8F8b8A1f78Fd16DA4D6aAD2aFE5dFD058D"
  );
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
  await houseGame.setContracts(
    cheddar.address,
    houseTrait.address,
    habitat.address,
    house.address,
    random.address
  );
}

deployProc();
