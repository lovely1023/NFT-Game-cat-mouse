import {expect} from "chai";
import {ethers} from "hardhat";
import { CnM, RandomGenerator, Habitat, Traits } from "../typechain";
import { BigNumber } from "ethers";
import { toBn } from "evm-bn";

describe("CnM", function () {
  let token;
  let cnmNFT: CnM;
  let traits: Traits;
  let habitat: Habitat;
  let randomizer: RandomGenerator;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    token = await ethers.getContractFactory("CnM");
    [owner, addr1, addr2] = await ethers.getSigners();
    cnmNFT = await token.deploy(50000);

    token = await ethers.getContractFactory("Traits");
    traits = await token.deploy();

    token = await ethers.getContractFactory("Habitat");
    habitat = await token.deploy();

    token = await ethers.getContractFactory("RandomGenerator");
    randomizer = await token.deploy(
      "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
      "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B",
      "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311"
    );
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await cnmNFT.owner()).to.equal(owner.address);
    });

    it("Should assign the max token and paid token", async function () {
      const maxTokens = await cnmNFT.getMaxTokens();
      expect(maxTokens).to.equal(50000);
      const paidToken = await cnmNFT.getPaidTokens();
      expect(paidToken).to.equal(10000);
    });
  });

  describe("Mint && Burn && Transfer", async function () {
    let seed: BigNumber;
    it("Should mint && burn", async function () {
      await cnmNFT.setContracts(
        traits.address,
        habitat.address,
        randomizer.address
      );
      await cnmNFT.setPaused(false);
      await cnmNFT.addAdmin(owner.address);
      seed = toBn((Math.random() * 10000000000).toString());
      await expect(cnmNFT.mint(addr1.address, seed))
        .to.emit(cnmNFT, "TestTokenMinted")
        .withArgs(addr1.address, 1);
      seed = toBn((Math.random() * 10000000000).toString());
      await expect(cnmNFT.mint(addr1.address, seed))
        .to.emit(cnmNFT, "TestTokenMinted")
        .withArgs(addr1.address, 2);
      seed = toBn((Math.random() * 10000000000).toString());
      await expect(cnmNFT.mint(addr2.address, seed))
        .to.emit(cnmNFT, "TestTokenMinted")
        .withArgs(addr2.address, 3);

      await expect(await cnmNFT.minted()).to.equal(3);
      await cnmNFT.burn(3);
      await expect(await cnmNFT.minted()).to.equal(2);
    });

    it("Transfer", async function () {
      await cnmNFT.setContracts(
        traits.address,
        habitat.address,
        randomizer.address
      );
      await cnmNFT.setPaused(false);
      await cnmNFT.addAdmin(owner.address);
      seed = toBn((Math.random() * 10000000000).toString());
      await cnmNFT.mint(addr1.address, seed);
      seed = toBn((Math.random() * 10000000000).toString());
      await cnmNFT.mint(addr1.address, seed);
      seed = toBn((Math.random() * 10000000000).toString());
      await cnmNFT.mint(addr2.address, seed);

      await expect(
        cnmNFT.transferFrom(addr1.address, addr2.address, 3)
      ).to.be.revertedWith("transfer of token that is not own");
      await expect(
        cnmNFT.connect(addr1).transferFrom(addr1.address, addr2.address, 3)
      ).to.be.reverted;

      await cnmNFT.connect(addr1).transferFrom(addr1.address, addr2.address, 1);
      expect(await cnmNFT.ownerOf(1)).to.equal(addr2.address);
    });
  });
});