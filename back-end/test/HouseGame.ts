// import {
//   CHEDDAR,
//   CnM,
//   CnMGame,
//   House,
//   HouseGame,
//   HouseTraits,
//   RandomGenerator,
//   Habitat,
// } from "../typechain";
// import { ethers } from "hardhat";
// import { expect } from "chai";
// import { toBn } from "evm-bn";
// import { BigNumber } from "ethers";

// describe("HouseGame", function () {
//   let token: any;
//   let houseGame: HouseGame;
//   let cnmGame: CnMGame;
//   let cheddar: CHEDDAR;
//   let houseTraits: HouseTraits;
//   let cnmNFT: CnM;
//   let habitat: Habitat;
//   let randomizer: RandomGenerator;
//   let houseNFT: House;
//   let owner: any, addr1: any, addr2: any;

//   beforeEach(async function () {
//     token = await ethers.getContractFactory("HouseGame");
//     [owner, addr1, addr2] = await ethers.getSigners();
//     houseGame = await token.deploy();

//     token = await ethers.getContractFactory("CHEDDAR");
//     cheddar = await token.deploy();

//     token = await ethers.getContractFactory("HouseTraits");
//     houseTraits = await token.deploy();

//     token = await ethers.getContractFactory("CnM");
//     cnmNFT = await token.deploy(50000);

//     token = await ethers.getContractFactory("Habitat");
//     habitat = await token.deploy();

//     token = await ethers.getContractFactory("RandomGenerator");
//     randomizer = await token.deploy(
//       "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
//       "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B",
//       "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311"
//     );

//     token = await ethers.getContractFactory("House");
//     houseNFT = await token.deploy(50000);

//     token = await ethers.getContractFactory("CnMGame");
//     cnmGame = await token.deploy();
//   });

//   describe("Deployment", function () {
//     it("Should set the right owner", async function () {
//       expect(await houseGame.owner()).to.equal(owner.address);
//     });
//   });

//   describe("Mint, Stake, Unstake, Claim", function () {
//     it("Should mint houseNFT", async function () {
//       await houseGame.setContracts(
//         cheddar.address,
//         houseTraits.address,
//         habitat.address,
//         houseNFT.address,
//         randomizer.address
//       );
//       await habitat.setContracts(
//         cnmNFT.address,
//         cheddar.address,
//         cnmGame.address,
//         houseGame.address,
//         randomizer.address,
//         houseNFT.address
//       );
//       await houseNFT.setContracts(
//         houseTraits.address,
//         habitat.address,
//         randomizer.address
//       );
//       await houseGame.addAdmin(owner.address);
//       await houseGame.setPaused(false);
//       await habitat.setPaused(false);
//       await houseNFT.setPaused(false);
//       await houseTraits.setCnM(houseNFT.address);

//       // add houseGame as admin to cheddar since they call burn method
//       await cheddar.addAdmin(houseGame.address);
//       await cheddar.addAdmin(habitat.address);
//       await cheddar.addAdmin(owner.address);
//       // add houseGame as admin to houseNFT since they call admin function (updateOriginAccess)
//       await houseNFT.addAdmin(houseGame.address);

//       // Mint cheddar to user
//       await cheddar.mint(addr1.address, ethers.utils.parseEther("500000"));
//       await houseGame.connect(addr1).mintCommit(4, false);
//       // get pending mint for the addr1
//       let res = await houseGame.getPendingMint(addr1.address);
//       expect(res.amount).to.be.equal(4);
//       expect(res.stake).to.be.equal(false);

//       // can't be revealed until the random seed is assigned
//       await expect(houseGame.connect(addr1).mintReveal()).to.be.revertedWith(
//         "random seed not set"
//       );

//       // Assign random seed (admin function)
//       let seed: BigNumber;
//       seed = toBn((Math.random() * 10000000000).toString());
//       await randomizer.increaseCommitId();
//       await randomizer.addCommitRandom(seed);

//       // This should be revealed
//       expect(await houseGame.connect(addr1).mintReveal())
//         .to.be.emit(houseGame, "MintRevealed")
//         .withArgs(addr1.address, 4);
//       // Minted number is 4
//       expect(await houseNFT.minted()).to.be.equal(4);

//       // should set the address as Admin
//       await houseNFT.addAdmin(owner.address);
//       expect(await houseNFT.ownerOf(1)).to.be.equal(addr1.address);
//     });

//     it("Should mint and stake cnmNFT", async function () {
//       await houseGame.setContracts(
//         cheddar.address,
//         houseTraits.address,
//         habitat.address,
//         houseNFT.address,
//         randomizer.address
//       );
//       await habitat.setContracts(
//         cnmNFT.address,
//         cheddar.address,
//         cnmGame.address,
//         houseGame.address,
//         randomizer.address,
//         houseNFT.address
//       );
//       await houseNFT.setContracts(
//         houseTraits.address,
//         habitat.address,
//         randomizer.address
//       );
//       await houseGame.addAdmin(owner.address);
//       await houseGame.setPaused(false);
//       await habitat.setPaused(false);
//       await houseNFT.setPaused(false);
//       await houseTraits.setCnM(houseNFT.address);

//       // add houseGame as admin to cheddar since they call burn method
//       await cheddar.addAdmin(houseGame.address);
//       await cheddar.addAdmin(owner.address);
//       await cheddar.addAdmin(habitat.address);
//       // add houseGame as admin to houseNFT since they call admin function (updateOriginAccess)
//       await houseNFT.addAdmin(houseGame.address);

//       // Mint cheddar to user
//       await cheddar.mint(addr1.address, ethers.utils.parseEther("500000"));
//       await houseGame.connect(addr1).mintCommit(4, true);
//       // get pending mint for the addr1
//       let res = await houseGame.getPendingMint(addr1.address);
//       expect(res.amount).to.be.equal(4);
//       expect(res.stake).to.be.equal(true);

//       // can't be revealed until the random seed is assigned
//       await expect(houseGame.connect(addr1).mintReveal()).to.be.revertedWith(
//         "random seed not set"
//       );

//       // Assign random seed (admin function)
//       let seed: BigNumber;
//       seed = toBn((Math.random() * 10000000000).toString());
//       await randomizer.increaseCommitId();
//       await randomizer.addCommitRandom(seed);

//       // This should be revealed
//       expect(await houseGame.connect(addr1).mintReveal())
//         .to.be.emit(houseGame, "MintRevealed")
//         .withArgs(addr1.address, 4);
//       // Minted number is 4
//       expect(await houseNFT.minted()).to.be.equal(4);

//       // Owners should be habitat
//       expect(await houseNFT.ownerOf(1)).to.be.equal(habitat.address);
//       expect(await houseNFT.ownerOf(2)).to.be.equal(habitat.address);
//       expect(await houseNFT.ownerOf(3)).to.be.equal(habitat.address);
//       expect(await houseNFT.ownerOf(4)).to.be.equal(habitat.address);
//     });

//     it("Claim cnmNFT", async function () {
//       await houseGame.setContracts(
//         cheddar.address,
//         houseTraits.address,
//         habitat.address,
//         houseNFT.address,
//         randomizer.address
//       );
//       await habitat.setContracts(
//         cnmNFT.address,
//         cheddar.address,
//         cnmGame.address,
//         houseGame.address,
//         randomizer.address,
//         houseNFT.address
//       );
//       await houseNFT.setContracts(
//         houseTraits.address,
//         habitat.address,
//         randomizer.address
//       );
//       await houseGame.addAdmin(owner.address);
//       await houseGame.setPaused(false);
//       await habitat.setPaused(false);
//       await houseNFT.setPaused(false);
//       await houseTraits.setCnM(houseNFT.address);

//       // add houseGame as admin to cheddar since they call burn method
//       await cheddar.addAdmin(houseGame.address);
//       await cheddar.addAdmin(owner.address);
//       await cheddar.addAdmin(habitat.address);
//       // add houseGame as admin to houseNFT since they call admin function (updateOriginAccess)
//       await houseNFT.addAdmin(houseGame.address);

//       // Mint cheddar to user
//       await cheddar.mint(addr1.address, ethers.utils.parseEther("500000"));
//       await houseGame.connect(addr1).mintCommit(4, true);
//       // get pending mint for the addr1
//       let res = await houseGame.getPendingMint(addr1.address);
//       expect(res.amount).to.be.equal(4);
//       expect(res.stake).to.be.equal(true);

//       // can't be revealed until the random seed is assigned
//       await expect(houseGame.connect(addr1).mintReveal()).to.be.revertedWith(
//         "random seed not set"
//       );

//       // Assign random seed (admin function)
//       let seed: BigNumber;
//       seed = toBn((Math.random() * 10000000000).toString());
//       await randomizer.increaseCommitId();
//       await randomizer.addCommitRandom(seed);

//       // This should be revealed
//       expect(await houseGame.connect(addr1).mintReveal())
//         .to.be.emit(houseGame, "MintRevealed")
//         .withArgs(addr1.address, 4);
//       // Minted number is 4
//       expect(await houseNFT.minted()).to.be.equal(4);

//       // Owners should be habitat
//       expect(await houseNFT.ownerOf(1)).to.be.equal(habitat.address);
//       expect(await houseNFT.ownerOf(2)).to.be.equal(habitat.address);
//       expect(await houseNFT.ownerOf(3)).to.be.equal(habitat.address);
//       expect(await houseNFT.ownerOf(4)).to.be.equal(habitat.address);

//       const nftType = await houseNFT.getTokenTraits(1);
//       await expect(
//         habitat.connect(addr1).claimManyHouseFromHabitat([1], false)
//       ).to.be.revertedWith("Not all genesis tokens are minted");
//     });

//     it("Should not unstake cnmNFT until they claim more", async function () {
//       await houseGame.setContracts(
//         cheddar.address,
//         houseTraits.address,
//         habitat.address,
//         houseNFT.address,
//         randomizer.address
//       );
//       await habitat.setContracts(
//         cnmNFT.address,
//         cheddar.address,
//         cnmGame.address,
//         houseGame.address,
//         randomizer.address,
//         houseNFT.address
//       );
//       await houseNFT.setContracts(
//         houseTraits.address,
//         habitat.address,
//         randomizer.address
//       );
//       await houseGame.addAdmin(owner.address);
//       await houseGame.setPaused(false);
//       await habitat.setPaused(false);
//       await houseNFT.setPaused(false);
//       await houseTraits.setCnM(houseNFT.address);

//       // add houseGame as admin to cheddar since they call burn method
//       await cheddar.addAdmin(houseGame.address);
//       await cheddar.addAdmin(owner.address);
//       await cheddar.addAdmin(habitat.address);
//       // add houseGame as admin to houseNFT since they call admin function (updateOriginAccess)
//       await houseNFT.addAdmin(houseGame.address);

//       // Mint cheddar to user
//       await cheddar.mint(addr1.address, ethers.utils.parseEther("500000"));
//       await houseGame.connect(addr1).mintCommit(4, true);
//       // get pending mint for the addr1
//       let res = await houseGame.getPendingMint(addr1.address);
//       expect(res.amount).to.be.equal(4);
//       expect(res.stake).to.be.equal(true);

//       // can't be revealed until the random seed is assigned
//       await expect(houseGame.connect(addr1).mintReveal()).to.be.revertedWith(
//         "random seed not set"
//       );

//       // Assign random seed (admin function)
//       let seed: BigNumber;
//       seed = toBn((Math.random() * 10000000000).toString());
//       await randomizer.increaseCommitId();
//       await randomizer.addCommitRandom(seed);

//       // This should be revealed
//       expect(await houseGame.connect(addr1).mintReveal())
//         .to.be.emit(houseGame, "MintRevealed")
//         .withArgs(addr1.address, 4);
//       // Minted number is 4
//       expect(await houseNFT.minted()).to.be.equal(4);

//       // Owners should be habitat
//       expect(await houseNFT.ownerOf(1)).to.be.equal(habitat.address);
//       expect(await houseNFT.ownerOf(2)).to.be.equal(habitat.address);
//       expect(await houseNFT.ownerOf(3)).to.be.equal(habitat.address);
//       expect(await houseNFT.ownerOf(4)).to.be.equal(habitat.address);
//     });
//   });
// });
