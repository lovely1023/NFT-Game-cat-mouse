import { expect } from "chai";
import {RandomGenerator} from "../typechain";
import { ethers } from "hardhat";

describe("RandomGenerator", function () {
    let Token;
    let randomizer: RandomGenerator;
    let owner: any;
    let addr1: any;
    let addr2: any;
    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        Token = await ethers.getContractFactory("RandomGenerator");
        [owner, addr1, addr2] = await ethers.getSigners();
        randomizer = await Token.deploy(
          "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
          "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B",
          "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311"
        );
    });


    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await randomizer.owner()).to.equal(owner.address);
        });
    });

    describe("Get Random", function () {
        it("Should return random number", async function() {
            let randomNumber = await randomizer.random();
            console.log("randomNumber====>", randomNumber.hash);
            randomNumber = await randomizer.random();
            console.log("randomNumber====>", randomNumber.hash);
        })
    })

});
