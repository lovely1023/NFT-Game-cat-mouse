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

const TRIGGER = 3;

// Create contract instances
const RANDOM_ABI = require("./abi/random.json");
const RANDOM_CONTRACT_ADDRESS = process.env.RANDOM_CONTRACT;
const random = new web3.eth.Contract(RANDOM_ABI, RANDOM_CONTRACT_ADDRESS);

const HOUSE_GAME_ABI = require("./abi/houseGameAbi.json");
const HOUSE_GAME_CONTRACT_ADDRESS = process.env.HOUSE_GAME_CONTRACT;
const houseGame = new web3.eth.Contract(
  HOUSE_GAME_ABI,
  HOUSE_GAME_CONTRACT_ADDRESS
);

const CNM_GAME_ABI = require("./abi/cnmGameAbi.json");
const CNM_GAME_CONTRACT = process.env.CNM_GAME_CONTRACT;
const cnmGame = new web3.eth.Contract(CNM_GAME_ABI, CNM_GAME_CONTRACT);

const data = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
const lastBlock = Number(data.lastBlock);

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const updateRandom = async (currentCnm, currentHouse) => {
  let rand = Math.round(
    Math.pow(Math.random() * (currentCnm + 1), 1 / (currentHouse + 1)) *
      10 ** 18
  );
  let randBN = toBn(rand.toString());
  const gas = await random.methods.addCommitRandom(randBN).estimateGas({
    from: account.address,
  });
  await random.methods.addCommitRandom(randBN).send({
    from: account.address,
    gas: gas + 100000,
  });
  const blockNumber = await web3.eth.getBlockNumber();
  console.log("UPDATED RANDOM SEED");
  fs.writeFileSync(
    "./config.json",
    JSON.stringify({
      lastBlock: blockNumber,
    })
  );
};

async function main(noise) {
  // const cnmEvents = await cnmGame.getPastEvents("MintCommitted", {
  //   fromBlock: lastBlock,
  //   toBlock: "latest",
  // });
  // const houseEvents = await houseGame.getPastEvents("MintCommitted", {
  //   fromBlock: lastBlock,
  //   toBlock: "latest",
  // });

  // const totalCnM = cnmEvents.reduce((acc, cv) => {
  //   return acc + Number(cv.returnValues.amount);
  // }, 0);
  // const totalHouse = houseEvents.reduce((acc, cv) => {
  //   return acc + Number(cv.returnValues.amount);
  // }, 0);

  // const isTriggered = totalCnM + totalHouse >= TRIGGER;
  if (true) {
    try {
      const gas = await random.methods.increaseCommitId().estimateGas({
        from: account.address,
      });
      await random.methods.increaseCommitId().send({
        from: account.address,
        gas: gas + 100000,
      });
      console.log("INCREMENTED COMMIT ID");
    } catch (e) {
      if (e.message.includes("Random seed not set")) {
        await updateRandom(
          getRandomArbitrary(0, 10000),
          getRandomArbitrary(0, 10000)
        );
        return;
      }
    }
    await updateRandom(
      getRandomArbitrary(0, 10000),
      getRandomArbitrary(0, 10000)
    );
  }
}

async function mainMain() {
  for (let i = 0; i < 17; i++) {
    await main()
      .then((_) => console.log("Success ==================================== "))
      .catch((e) =>
        console.log("Error =================================== ", e)
      );
  }
}

mainMain();