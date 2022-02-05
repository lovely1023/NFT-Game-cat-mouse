import { expect } from "chai";
import { CHEDDAR } from "../typechain";
import { ethers } from "hardhat";

describe("CHEDDAR", function () {
  let Token;
  let hardhatToken: CHEDDAR;
  let owner: { address: string; };
  let addr1: { address: string; };
  let addr2: { address: string; };
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("CHEDDAR");
    [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    hardhatToken = await Token.deploy();
  });


  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transaction", function () {
    it ("Should fail if sender doesn’t have enough tokens", async function() {
      await expect(hardhatToken.transfer(addr1.address, 100)).to.be.revertedWith("RC20: transfer amount exceeds balance");
    });
  });

  describe("Mint", function () {
    it ("Should mint token to owner", async function() {
      // first, add admin to mint token
      await hardhatToken.addAdmin(owner.address);
      await hardhatToken.mint(owner.address, 1000);
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      const totalSupply = await hardhatToken.totalSupply();
      expect(ownerBalance).to.equal("1000");
    })

    // it ("Should transfer cheddar to recipient", async function() {
    //   await hardhatToken.addAdmin(owner.address);
    //   await hardhatToken.mint(owner.address, 1000);
    //   await hardhatToken.transfer(addr1.address, 5);
    //   await hardhatToken.transferFrom(addr1.address, addr2.address, 1);
    //   const addr1Balance = await hardhatToken.balanceOf(addr1.address);
    //   expect(addr1Balance).to.equal("4000000000000000000");
    //   const addr2Balance = await hardhatToken.balanceOf(addr2.address);
    //   expect(addr2Balance).to.equal("1000000000000000000");
    // })
  });
});
