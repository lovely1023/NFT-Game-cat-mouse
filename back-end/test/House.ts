import {expect} from "chai";
import {ethers} from "hardhat";
import { House, HouseTraits, RandomGenerator, Habitat } from "../typechain";
import { BigNumber } from "ethers";
import { toBn } from "evm-bn";

describe("House", function () {
  let token;
  let houseNFT: House;
  let houseTraits: HouseTraits;
  let habitat: Habitat;
  let randomizer: RandomGenerator;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    token = await ethers.getContractFactory("House");
    [owner, addr1, addr2] = await ethers.getSigners();
    houseNFT = await token.deploy(50000);

    token = await ethers.getContractFactory("HouseTraits");
    houseTraits = await token.deploy();

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
      expect(await houseNFT.owner()).to.equal(owner.address);
    });

    it("Should assign the max token", async function () {
      const maxTokens = await houseNFT.getMaxTokens();
      expect(maxTokens).to.equal(50000);
    });
  });

  describe("Mint && Burn && Transfer", async function () {
    let seed: BigNumber;
    it("Should mint && burn", async function () {
      await houseNFT.setContracts(
        houseTraits.address,
        habitat.address,
        randomizer.address
      );
      await houseNFT.setPaused(false);
      await houseNFT.addAdmin(owner.address);
      seed = toBn((Math.random() * 10000000000).toString());
      await expect(houseNFT.mint(addr1.address, seed))
        .to.emit(houseNFT, "TestTokenMinted")
        .withArgs(addr1.address, 1);

      for (let i = 0; i < 100; i++) {
        const r = await houseNFT.generate(
          owner.address,
          1,
          toBn((Math.random() * 10000000000).toString())
        );
        //   console.log(r);
      }

      seed = toBn((Math.random() * 10000000000).toString());
      await expect(houseNFT.mint(addr1.address, seed))
        .to.emit(houseNFT, "TestTokenMinted")
        .withArgs(addr1.address, 2);
      seed = toBn((Math.random() * 10000000000).toString());
      await expect(houseNFT.mint(addr2.address, seed))
        .to.emit(houseNFT, "TestTokenMinted")
        .withArgs(addr2.address, 3);

      await expect(await houseNFT.minted()).to.equal(3);
      await houseNFT.burn(3);
      await expect(await houseNFT.minted()).to.equal(2);
    });

    it("Transfer", async function () {
      await houseNFT.setContracts(
        houseTraits.address,
        habitat.address,
        randomizer.address
      );
      await houseNFT.setPaused(false);
      await houseNFT.addAdmin(owner.address);
      seed = toBn((Math.random() * 10000000000).toString());
      await houseNFT.mint(addr1.address, seed);
      seed = toBn((Math.random() * 10000000000).toString());
      await houseNFT.mint(addr1.address, seed);
      seed = toBn((Math.random() * 10000000000).toString());
      await houseNFT.mint(addr2.address, seed);

      await expect(
        houseNFT.transferFrom(addr1.address, addr2.address, 3)
      ).to.be.revertedWith("transfer of token that is not own");
      await expect(
        houseNFT.connect(addr1).transferFrom(addr1.address, addr2.address, 3)
      ).to.be.reverted;

      await houseNFT
        .connect(addr1)
        .transferFrom(addr1.address, addr2.address, 1);
      expect(await houseNFT.ownerOf(1)).to.equal(addr2.address);
    });
  });
});