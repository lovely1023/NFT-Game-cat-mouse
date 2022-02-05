import { expect } from "chai";
import { chunk } from "lodash";
import { ethers } from "hardhat";
import {
  CnM,
  RandomGenerator,
  Habitat,
  Traits,
  CnMGame,
  House,
  CHEDDAR,
  HouseGame,
  HouseTraits,
} from "../typechain";
import { BigNumber, utils } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function parseURI(uri: string) {
  const buffer = uri.split(",")[1];
  const string = Buffer.from(buffer, "base64").toString("ascii");
  return JSON.parse(string);
}

const SUPPLY = 100;
const newCollection = 50;
// describe("CnMCheddar", function () {
//   let token;
//   let cnmNFT: CnM;
//   let cnmCheddarNFT: any;
//   let traits: Traits;
//   let habitat: Habitat;
//   let randomizer: RandomGenerator;
//   let owner: any;
//   let addr1: any;
//   let addr2: any;

//   beforeEach(async function () {
//     token = await ethers.getContractFactory("CnM");
//     [owner, addr1, addr2] = await ethers.getSigners();
//     cnmNFT = await token.deploy(50000);

//     token = await ethers.getContractFactory("Traits");
//     traits = await token.deploy();

//     token = await ethers.getContractFactory("Habitat");
//     habitat = await token.deploy();

//     token = await ethers.getContractFactory("RandomGenerator");
//     randomizer = await token.deploy(
//       "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
//       "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B",
//       "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311"
//     );
//     await cnmNFT.setContracts(
//       traits.address,
//       habitat.address,
//       randomizer.address
//     );
//     await cnmNFT.addAdmin(owner.address);

//     await cnmNFT.setPaused(false);
//     for (let i = 0; i < SUPPLY; i++) {
//       await cnmNFT.mint(
//         owner.address,
//         BigNumber.from(Math.floor(getRandomArbitrary(0, 100000)).toString())
//       );
//     }

//     token = await ethers.getContractFactory("CnMCheddar");
//     cnmCheddarNFT = await token.deploy(50000);
//     await cnmCheddarNFT.setContracts(
//       traits.address,
//       habitat.address,
//       randomizer.address,
//       cnmNFT.address
//     );
//     await traits.setCnM(cnmCheddarNFT.address);
//     await cnmCheddarNFT.addAdmin(owner.address);
//     await cnmCheddarNFT.setPaused(false);

//     for (let i = 0; i < newCollection; i++) {
//       await cnmCheddarNFT.mint(
//         owner.address,
//         BigNumber.from(Math.floor(getRandomArbitrary(0, 100000)).toString())
//       );
//     }
//   });

//   it("should set minted based off old collection", async () => {
//     const number = await cnmCheddarNFT.minted();
//     expect(number).to.be.eql(SUPPLY + newCollection);
//   });

//   it("should set first tokenId in new collection based off last totalSupply", async () => {
//     await cnmCheddarNFT.mint(
//       owner.address,
//       BigNumber.from(Math.floor(getRandomArbitrary(0, 100000)).toString())
//     );

//     const tokenIndex = Number(await cnmCheddarNFT.tokenByIndex(0));
//     expect(tokenIndex).to.eql(SUPPLY + 1);
//   });

//   it("should fetch tokenURI based off the correct collection", async () => {
//     for (let i = 1; i < newCollection + SUPPLY; i++) {
//       const uri = await cnmCheddarNFT.tokenURI(i);
//       const data = parseURI(uri);
//       expect(data.name.split("#")[1]).to.eql(i.toString());
//     }
//   }).timeout(50000);

//   it("should fetch tokenURI based off the correct collection", async () => {
//     for (let i = 1; i <= SUPPLY + newCollection; i++) {
//       const trait = await cnmCheddarNFT.getTokenTraits(i);
//       const response = trait.filter((c: any) => c === 0);
//       expect(response.length).to.be.lessThan(13);
//     }
//   }).timeout(50000);

//   it("should burn the correct one", async () => {
//     const previousSupplyOG = Number(await cnmNFT.totalSupply());
//     await cnmNFT.addAdmin(cnmCheddarNFT.address);
//     await cnmCheddarNFT.burn(1);
//     expect(Number(await cnmNFT.totalSupply())).to.eql(previousSupplyOG - 1);
//     const previousSupplyNew = Number(await cnmCheddarNFT.totalSupply());
//     await cnmCheddarNFT.burn(SUPPLY + 1);
//     expect(Number(await cnmCheddarNFT.totalSupply())).to.eql(
//       previousSupplyNew - 1
//     );
//   });
// });

describe("End to End tests", async () => {
  let token;
  let cnmGame: CnMGame;
  let cnmNFT: any;
  let houseGame: HouseGame;
  let house: House;
  let houseTraits: HouseTraits;
  let cnmCheddarNFT: any;
  let traits: Traits;
  let habitat: Habitat;
  let randomizer: RandomGenerator;
  let owner: any;
  let cheddar: CHEDDAR;
  let signers: SignerWithAddress[];
  let mapping: any = {};

  beforeEach(async function () {
    signers = await ethers.getSigners();
    owner = signers[0];

    mapping[signers[0].address] = [];
    mapping[signers[1].address] = [];
    mapping[signers[2].address] = [];
    token = await ethers.getContractFactory("CnM");
    const cnmNFTOLD = await token.deploy(50000);

    token = await ethers.getContractFactory("CnMCheddar");
    cnmNFT = await token.deploy(50000);

    token = await ethers.getContractFactory("Habitat");
    habitat = await token.deploy();

    token = await ethers.getContractFactory("CnMGame");
    cnmGame = await token.deploy();

    token = await ethers.getContractFactory("HouseGame");
    houseGame = await token.deploy();

    token = await ethers.getContractFactory("House");
    house = await token.deploy(50000);

    token = await ethers.getContractFactory("HouseTraits");
    houseTraits = await token.deploy();

    token = await ethers.getContractFactory("Traits");
    traits = await token.deploy();

    token = await ethers.getContractFactory("Habitat");
    habitat = await token.deploy();

    token = await ethers.getContractFactory("CHEDDAR");
    cheddar = await token.deploy();

    token = await ethers.getContractFactory("RandomGenerator");
    randomizer = await token.deploy(
      "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
      "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B",
      "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311"
    );
    await cnmNFT.setContracts(
      traits.address,
      habitat.address,
      randomizer.address,
      cnmNFTOLD.address
    );

    await cnmNFT.addAdmin(cnmGame.address);
    await cnmNFT.addAdmin(habitat.address);
    await cnmGame.addAdmin(cnmGame.address);
    await cheddar.addAdmin(cnmGame.address);
    await cheddar.addAdmin(habitat.address);
    await house.addAdmin(houseGame.address);
    await house.addAdmin(habitat.address);
    await houseGame.addAdmin(cnmGame.address);
    await cheddar.addAdmin(houseGame.address);

    await house.setContracts(
      houseTraits.address,
      habitat.address,
      randomizer.address
    );
    await habitat.setContracts(
      cnmNFT.address,
      cheddar.address,
      cnmGame.address,
      houseGame.address,
      randomizer.address,
      house.address
    );
    await cnmGame.setContracts(
      cheddar.address,
      traits.address,
      cnmNFT.address,
      habitat.address,
      randomizer.address
    );
    await cnmGame.setRoot(
      "0xccae15edda06943547e52d8adb572c44f61a912ff0e6ee69a2431e97454aebfe"
    );
    await houseGame.setContracts(
      cheddar.address,
      houseTraits.address,
      habitat.address,
      house.address,
      randomizer.address
    );
    await houseTraits.setCnM(house.address);
    await traits.setCnM(cnmNFT.address);

    await cnmNFT.setPaused(false);
    await cnmGame.setPaused(false);
    await house.setPaused(false);
    await houseGame.setPaused(false);
    await habitat.setPaused(false);

    await cnmGame.togglePublicSale();
    await cnmGame.setContracts(
      cheddar.address,
      traits.address,
      cnmNFT.address,
      habitat.address,
      randomizer.address
    );
  });

  const deployCheddar = async () => {
    token = await ethers.getContractFactory("CnMCheddar");
    cnmCheddarNFT = await token.deploy(50000);
    await cnmCheddarNFT.setContracts(
      traits.address,
      habitat.address,
      randomizer.address,
      cnmNFT.address
    );
    token = await ethers.getContractFactory("Traits");
    traits = await token.deploy();
    await traits.setCnM(cnmCheddarNFT.address);

    await cnmCheddarNFT.addAdmin(cnmGame.address);
    await cnmCheddarNFT.addAdmin(habitat.address);
    await cnmCheddarNFT.addAdmin(owner.address);
    await cnmCheddarNFT.setPaused(false);

    await cnmGame.setContracts(
      cheddar.address,
      traits.address,
      cnmCheddarNFT.address,
      habitat.address,
      randomizer.address
    );
  };

  it("should pass end to end tests", async () => {
    await cnmGame.mintCommit(1, true, {
      value: utils.parseEther("0.001"),
    });

    await cnmGame.connect(signers[1]).mintCommit(2, true, {
      value: utils.parseEther("0.002"),
    });

    await randomizer.increaseCommitId();
    await randomizer.addCommitRandom(Math.floor(getRandomArbitrary(0, 100000)));

    await cnmGame.mintReveal();
    await cnmGame.connect(signers[1]).mintReveal();
    await deployCheddar();

    await cnmGame.mintCommit(1, true, {
      value: utils.parseEther("0.001"),
    });

    await cnmGame.connect(signers[1]).mintCommit(2, true, {
      value: utils.parseEther("0.002"),
    });

    await randomizer.increaseCommitId();
    await randomizer.addCommitRandom(Math.floor(getRandomArbitrary(0, 100000)));
    await cnmGame.mintReveal();
  });
});
