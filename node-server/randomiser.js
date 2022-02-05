const Web3 = require("web3");
require("dotenv").config();
const { toBn } = require("evm-bn");
const fs = require("fs");

// ENTER A VALID RPC URL!
const web3 = new Web3(process.env.NODE_URL);

// Set owner account as default account
const account = web3.eth.accounts.privateKeyToAccount(
  "0x" + process.env.OWNER_KEY
);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;
console.log("default account===============>", web3.eth.defaultAccount);

// Create contract instances
const RANDOM_ABI = require("./abi/random.json");
const { Console } = require("console");
const RANDOM_CONTRACT_ADDRESS = process.env.RANDOM_CONTRACT;
const NEW_RANDOM = process.env.NEW_RANDOM;
const oldRandom = new web3.eth.Contract(RANDOM_ABI, RANDOM_CONTRACT_ADDRESS);
const newRandom = new web3.eth.Contract(RANDOM_ABI, NEW_RANDOM);

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const updateRandom = async () => {
  // let rand = Math.round(
  //   Math.pow(
  //     Math.random() * getRandomArbitrary(1, 10),
  //     1 / getRandomArbitrary(1, 10)
  //   ) *
  //     10 ** 18
  // );
  // console.log(rand);
  for (let i = 0; i < 300; i++) {
    const id = await newRandom.methods.getCommitRandom().call();
    console.log(id, i);
  }
};

async function main() {
  // const gas = await newRandom.methods
  //   .addAdmin("0x1FF7f3377Ece3A2a4DdD4ddAc6f84648dCC83D64")
  //   .estimateGas();
  // await newRandom.methods
  //   .addAdmin("0x1FF7f3377Ece3A2a4DdD4ddAc6f84648dCC83D64")
  //   .send({
  //     from: account.address,
  //     gas,
  //   });

  const id = await oldRandom.methods.random().call();
  console.log(id);
}

main()
  .then((_) => console.log("Success ==================================== "))
  .catch((e) => console.log("Error =================================== ", e))
  .finally(() => process.exit(1));
