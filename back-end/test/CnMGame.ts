// import {
//   CHEDDAR,
//   CnM,
//   CnMGame,
//   House,
//   HouseGame,
//   RandomGenerator,
//   Habitat,
//   Traits,
// } from "../typechain";
// import { ethers } from "hardhat";
// import { expect } from "chai";
// import { toBn } from "evm-bn";
// import { BigNumber, utils } from "ethers";

// describe("CnMGame", function () {
//   let token: any;
//   let cnmGame: CnMGame;
//   let houseGame: HouseGame;
//   let cheddar: CHEDDAR;
//   let traits: Traits;
//   let cnmNFT: CnM;
//   let habitat: Habitat;
//   let randomizer: RandomGenerator;
//   let houseNFT: House;
//   let owner: any, addr1: any, addr2: any;

//   beforeEach(async function () {
//     token = await ethers.getContractFactory("CnMGame");
//     [owner, addr1, addr2] = await ethers.getSigners();
//     cnmGame = await token.deploy();

//     token = await ethers.getContractFactory("CHEDDAR");
//     cheddar = await token.deploy();

//     token = await ethers.getContractFactory("Traits");
//     traits = await token.deploy();

//     token = await ethers.getContractFactory("CnM");
//     cnmNFT = await token.deploy(50000);
//     await cnmNFT.addAdmin(cnmGame.address);
//     await cnmNFT.addAdmin(habitat.address);

//     token = await ethers.getContractFactory("Habitat");
//     habitat = await token.deploy();

//     token = await ethers.getContractFactory("RandomGenerator");
//     randomizer = await token.deploy(
//       "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
//       "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B",
//       "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311",
//       100
//     );

//     token = await ethers.getContractFactory("House");
//     houseNFT = await token.deploy(50000);

//     token = await ethers.getContractFactory("HouseGame");
//     houseGame = await token.deploy();
//   });

//   describe("Deployment", function () {
//     it("Should set the right owner", async function () {
//       expect(await cnmGame.owner()).to.equal(owner.address);
//     });
//   });

//   describe("Mint, Stake, Claim, Unstake, Roll", function () {
//     it("Should mint cnmNFT", async function () {
//       await cnmGame.setContracts(
//         cheddar.address,
//         traits.address,
//         cnmNFT.address,
//         habitat.address,
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
//       await cnmNFT.setContracts(
//         traits.address,
//         habitat.address,
//         randomizer.address
//       );
//       await cnmGame.addAdmin(owner.address);
//       await cnmGame.setPaused(false);
//       await habitat.setPaused(false);
//       await cnmNFT.setPaused(false);
//       await traits.setCnM(cnmNFT.address);

//       // add cnmGame as admin to cheddar since they call burn method
//       await cheddar.addAdmin(cnmGame.address);
//       await cheddar.addAdmin(habitat.address);
//       // add cnmGame as admin to cnmNFT since they call admin function (updateOriginAccess)
//       await cnmNFT.addAdmin(cnmGame.address);

//       let amount = toBn((0.04).toString());
//       await cnmGame.connect(addr1).mintCommit(4, false, { value: amount });
//       // get pending mint for the addr1
//       let res = await cnmGame.getPendingMint(addr1.address);
//       expect(res.amount).to.be.equal(4);
//       expect(res.stake).to.be.equal(false);

//       // can't be revealed until the random seed is assigned
//       await expect(cnmGame.connect(addr1).mintReveal()).to.be.revertedWith(
//         "random seed not set"
//       );

//       // Assign random seed (admin function)
//       let seed: BigNumber;
//       seed = toBn((Math.random() * 10000000000).toString());
//       await randomizer.increaseCommitId();
//       await randomizer.addCommitRandom(seed);

//       // This should be revealed
//       expect(await cnmGame.connect(addr1).mintReveal())
//         .to.be.emit(cnmGame, "MintRevealed")
//         .withArgs(addr1.address, 4);
//       // Minted number is 4
//       expect(await cnmNFT.minted()).to.be.equal(4);
//     });

//     it("Should mint and stake cnmNFT", async function () {
//       await cnmGame.setContracts(
//         cheddar.address,
//         traits.address,
//         cnmNFT.address,
//         habitat.address,
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
//       await cnmNFT.setContracts(
//         traits.address,
//         habitat.address,
//         randomizer.address
//       );

//       await cnmGame.addAdmin(owner.address);
//       await cnmGame.setPaused(false);
//       await habitat.setPaused(false);
//       await cnmNFT.setPaused(false);
//       await traits.setCnM(cnmNFT.address);

//       // add cnmGame as admin to cheddar since they call burn method
//       await cheddar.addAdmin(cnmGame.address);
//       await cheddar.addAdmin(habitat.address);
//       // add cnmGame as admin to cnmNFT since they call admin function (updateOriginAccess)
//       await cnmNFT.addAdmin(cnmGame.address);
//       await cnmNFT.addAdmin(habitat.address);

//       console.log(
//         cnmGame.address,
//         "CnMGame",
//         houseGame.address,
//         "HouseGame",
//         cheddar.address,
//         "CHEDDAR",
//         traits.address,
//         "Traits",
//         cnmNFT.address,
//         "CnM",
//         habitat.address,
//         "Habitat",
//         randomizer.address,
//         "RandomGenerator",
//         houseNFT.address,
//         "House",
//         "<<<<<<<<<<<<<<<"
//       );

//       let amount = toBn((0.04).toString());
//       await cnmGame.connect(addr1).mintCommit(4, true, { value: amount });
//       // get pending mint for the addr1
//       let res = await cnmGame.getPendingMint(addr1.address);
//       expect(res.amount).to.be.equal(4);
//       expect(res.stake).to.be.equal(true);

//       // can't be revealed until the random seed is assigned
//       await expect(cnmGame.connect(addr1).mintReveal()).to.be.revertedWith(
//         "random seed not set"
//       );

//       // Assign random seed (admin function)
//       let seed: BigNumber;
//       seed = toBn((Math.random() * 10000000000).toString());
//       await randomizer.increaseCommitId();
//       await randomizer.addCommitRandom(seed);

//       // This should be revealed
//       expect(await cnmGame.connect(addr1).mintReveal())
//         .to.be.emit(cnmGame, "MintRevealed")
//         .withArgs(addr1.address, 4);
//       // Minted number is 4
//       expect(await cnmNFT.minted()).to.be.equal(4);
//       const sevenDays = 7 * 24 * 60 * 60;
//       await ethers.provider.send("evm_increaseTime", [sevenDays]);
//       // @ts-ignore
//       await ethers.provider.send("evm_mine");

//       // Owners should be habitat
//       expect(await cnmNFT.ownerOf(1)).to.be.equal(habitat.address);
//       expect(await cnmNFT.ownerOf(2)).to.be.equal(habitat.address);
//       expect(await cnmNFT.ownerOf(3)).to.be.equal(habitat.address);
//       expect(await cnmNFT.ownerOf(4)).to.be.equal(habitat.address);
//     });

//     it("Should applying roll and decline", async function () {
//       await cnmGame.setContracts(
//         cheddar.address,
//         traits.address,
//         cnmNFT.address,
//         habitat.address,
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
//       await cnmNFT.setContracts(
//         traits.address,
//         habitat.address,
//         randomizer.address
//       );
//       await cnmGame.addAdmin(owner.address);
//       await cnmGame.setPaused(false);
//       await habitat.setPaused(false);
//       await cnmNFT.setPaused(false);
//       await traits.setCnM(cnmNFT.address);

//       // Mint cheddar to user1
//       await cheddar.addAdmin(owner.address);
//       await cheddar.mint(addr1.address, ethers.utils.parseEther("100000"));

//       // add cnmGame as admin to cheddar since they call burn method
//       await cheddar.addAdmin(cnmGame.address);
//       await cheddar.addAdmin(habitat.address);

//       // add cnmGame as admin to cnmNFT since they call admin function (updateOriginAccess)
//       await cnmNFT.addAdmin(cnmGame.address);
//       await cnmNFT.addAdmin(habitat.address);

//       let amount = toBn((0.04).toString());
//       await cnmGame.connect(addr1).mintCommit(4, true, { value: amount });
//       // get pending mint for the addr1
//       let res = await cnmGame.getPendingMint(addr1.address);
//       expect(res.amount).to.be.equal(4);
//       expect(res.stake).to.be.equal(true);

//       // can't be revealed until the random seed is assigned
//       await expect(cnmGame.connect(addr1).mintReveal()).to.be.revertedWith(
//         "random seed not set"
//       );

//       // Assign random seed (admin function)
//       let seed: BigNumber;
//       seed = toBn((Math.random() * 10000000000).toString());
//       await randomizer.increaseCommitId();
//       await randomizer.addCommitRandom(seed);
//       // This should be revealed
//       expect(await cnmGame.connect(addr1).mintReveal())
//         .to.be.emit(cnmGame, "MintRevealed")
//         .withArgs(addr1.address, 4);
//       // Minted number is 4
//       expect(await cnmNFT.minted()).to.be.equal(4);

//       // Owners should be habitat
//       expect(await cnmNFT.ownerOf(1)).to.be.equal(habitat.address);
//       expect(await cnmNFT.ownerOf(2)).to.be.equal(habitat.address);
//       expect(await cnmNFT.ownerOf(3)).to.be.equal(habitat.address);
//       expect(await cnmNFT.ownerOf(4)).to.be.equal(habitat.address);
//       let nftType = await cnmNFT.getTokenTraits(1);
//       console.log("isCat", nftType.isCat);

//       expect(await habitat.isOwner(1, addr1.address)).to.be.equal(true);

//       if (nftType.isCat) {
//         // roll
//         await expect(cnmGame.connect(addr1).rollForage(1)).to.be.revertedWith(
//           "affected only for Mouse NFTs"
//         );
//       } else {
//         /*// roll
//                 const rollResult = await cnmGame.connect(addr1).rollHouse(1);
//                 expect (await cnmGame.connect(addr1).rollHouseCommit(1, true)).to.be.emit(cnmNFT, "RollChanged").withArgs(cnmGame.address, 1, rool);*/
//       }
//     });

//     it("Claim cnmNFT", async function () {
//       await cnmGame.setContracts(
//         cheddar.address,
//         traits.address,
//         cnmNFT.address,
//         habitat.address,
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
//       await cnmNFT.setContracts(
//         traits.address,
//         habitat.address,
//         randomizer.address
//       );
//       await cnmGame.addAdmin(owner.address);
//       await cnmGame.setPaused(false);
//       await habitat.setPaused(false);
//       await cnmNFT.setPaused(false);
//       await traits.setCnM(cnmNFT.address);

//       // add cnmGame as admin to cheddar since they call burn method
//       await cheddar.addAdmin(cnmGame.address);
//       // add habitat as admin to cheddar since they call updateOriginAccess
//       await cheddar.addAdmin(habitat.address);
//       // add cnmGame as admin to cnmNFT since they call admin function (updateOriginAccess)
//       await cnmNFT.addAdmin(cnmGame.address);
//       await cnmNFT.addAdmin(habitat.address);

//       let amount = toBn((0.04).toString());
//       await cnmGame.connect(addr1).mintCommit(4, true, { value: amount });
//       // get pending mint for the addr1
//       let res = await cnmGame.getPendingMint(addr1.address);
//       expect(res.amount).to.be.equal(4);
//       expect(res.stake).to.be.equal(true);

//       // can't be revealed until the random seed is assigned
//       await expect(cnmGame.connect(addr1).mintReveal()).to.be.revertedWith(
//         "random seed not set"
//       );

//       // Assign random seed (admin function)
//       let seed: BigNumber;
//       seed = toBn((Math.random() * 10000000000).toString());
//       await randomizer.increaseCommitId();
//       await randomizer.addCommitRandom(seed);
//       // This should be revealed
//       expect(await cnmGame.connect(addr1).mintReveal())
//         .to.be.emit(cnmGame, "MintRevealed")
//         .withArgs(addr1.address, 4);
//       // Minted number is 4
//       expect(await cnmNFT.minted()).to.be.equal(4);

//       // Owners should be habitat
//       // expect(await cnmNFT.ownerOf(1)).to.be.equal(habitat.address);
//       // expect(await cnmNFT.ownerOf(2)).to.be.equal(habitat.address);
//       // expect(await cnmNFT.ownerOf(3)).to.be.equal(habitat.address);
//       // expect(await cnmNFT.ownerOf(4)).to.be.equal(habitat.address);

//       await expect(
//         habitat.connect(addr1).claimManyFromHabitatAndYield([1], false)
//       ).to.be.revertedWith("Not all genesis tokens are minted");
//     });

//     it("Should not unstake cnmNFT until they claim more", async function () {
//       await cnmGame.setContracts(
//         cheddar.address,
//         traits.address,
//         cnmNFT.address,
//         habitat.address,
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
//       await cnmNFT.setContracts(
//         traits.address,
//         habitat.address,
//         randomizer.address
//       );
//       await cnmGame.addAdmin(owner.address);
//       await cnmGame.setPaused(false);
//       await habitat.setPaused(false);
//       await cnmNFT.setPaused(false);
//       await traits.setCnM(cnmNFT.address);

//       // add cnmGame as admin to cheddar since they call burn method
//       await cheddar.addAdmin(cnmGame.address);
//       // add habitat as admin to cheddar since they call updateOriginAccess
//       await cheddar.addAdmin(habitat.address);
//       // add cnmGame as admin to cnmNFT since they call admin function (updateOriginAccess)
//       await cnmNFT.addAdmin(cnmGame.address);
//       await cnmNFT.addAdmin(habitat.address);

//       let amount = toBn((0.04).toString());
//       await cnmGame.connect(addr1).mintCommit(4, true, { value: amount });
//       // get pending mint for the addr1
//       let res = await cnmGame.getPendingMint(addr1.address);
//       expect(res.amount).to.be.equal(4);
//       expect(res.stake).to.be.equal(true);

//       // can't be revealed until the random seed is assigned
//       await expect(cnmGame.connect(addr1).mintReveal()).to.be.revertedWith(
//         "random seed not set"
//       );

//       // Assign random seed (admin function)
//       let seed: BigNumber;
//       seed = toBn((Math.random() * 10000000000).toString());
//       await randomizer.increaseCommitId();
//       await randomizer.addCommitRandom(seed);

//       // This should be revealed
//       expect(await cnmGame.connect(addr1).mintReveal())
//         .to.be.emit(cnmGame, "MintRevealed")
//         .withArgs(addr1.address, 4);
//       // Minted number is 4
//       expect(await cnmNFT.minted()).to.be.equal(4);

//       // Owners should be habitat
//       expect(await cnmNFT.ownerOf(1)).to.be.equal(habitat.address);
//       expect(await cnmNFT.ownerOf(2)).to.be.equal(habitat.address);
//       expect(await cnmNFT.ownerOf(3)).to.be.equal(habitat.address);
//       expect(await cnmNFT.ownerOf(4)).to.be.equal(habitat.address);
//     });
//   });
// });
