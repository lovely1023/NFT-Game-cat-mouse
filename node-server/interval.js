const Web3 = require('web3');
require('dotenv').config()
const {
    setIntervalAsync,
    clearIntervalAsync
} = require('set-interval-async/dynamic')
const {toBn} = require('evm-bn')


// ENTER A VALID RPC URL!
const web3 = new Web3(process.env.NODE_URL);

// Set owner account as default account
const account = web3.eth.accounts.privateKeyToAccount('0x' + process.env.OWNER_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;
console.log("default account===============>", web3.eth.defaultAccount);

// Create contract instances
const CNM_CONTRACT_ADDRESS = process.env.CNM_CONTRACT_ADDRESS;
const CNM_CONTRACT_ABI = require('./abi/cnmGameAbi.json');
const HOUSE_CONTRACT_ADDRESS = process.env.HOUSE_CONTRACT_ADDRESS;
const HOUSE_CONTRACT_ABI = require('./abi/houseGameAbi.json')
const cnmContract = new web3.eth.Contract(CNM_CONTRACT_ABI, CNM_CONTRACT_ADDRESS);
const houseContract = new web3.eth.Contract(HOUSE_CONTRACT_ABI, HOUSE_CONTRACT_ADDRESS);

let cnmCallCount = 0;
let cnmAmount = 0;
let houseCallCount = 0;
let houseAmount = 0;


addAdmins().then(() => {
    getEvents().then(() => {
        // updateRandomNumber function every 5 mins
        setIntervalAsync(
            async () => {
                console.log('===========Adding random number============')
                await updateRandomNumber();
                console.log('===========Successfully added==============')
            },
            1000 * 60 * 5
        )

    }).catch(e => {
        console.log(e);
    })
}).catch(e => {
    console.log("error while adding admins", e);
})


/**
 * Generate random number and then calls addCommitRandom() methods in both of CnMGame and HouseGame contract.
 *
 */
async function updateRandomNumber() {
    // our own random number based on the amount will be here
    let rand = Math.round(Math.pow(Math.random() * (cnmAmount + 1), 1/(cnmCallCount + 1)) * (10**18)); // replace here
    let randBN = toBn((rand).toString());
    try {
        await cnmContract.methods.addCommitRandom(randBN).send({from: account.address, gas: 100000});
    } catch (e) {
        console.log("error while adding random to CnMGame", e)
    }

    try {
        await houseContract.methods.addCommitRandom(randBN).send({from: account.address, gas: 1000000});
    } catch (e) {
        console.log("error while adding random to HouseGame", e)
    }

    // Format counts
    cnmCallCount = 0;
    cnmAmount = 0;
    houseCallCount = 0;
    houseAmount = 0;
}


/**
 * Call addAdmin method in both of CnMGame and HouseGame contract with the parameter of Owner wallet address.
 *
 */
async function addAdmins() {
    // Add admin to CnM && House Game contract
    try {
        await cnmContract.methods.increaseCommitId().send({from: account.address, gas: 100000});
        await cnmContract.methods.addAdmin(account.address).send({from: account.address, gas: 100000});
        console.log("Added admin to CnMGame==============");
    }catch (e) {
        console.log("error=====>", e)
    }

    try {
        await houseContract.methods.increaseCommitId().send({from: account.address, gas: 1000000});
        await houseContract.methods.addAdmin(account.address).send({from: account.address, gas: 1000000});
        console.log("Added admin to HouseGame==============");
    } catch (e) {
        console.log("error in houseContract======>", e);
    }
}


/**
 * Listen MintCommitted event from both of CnMGame and HouseGame contracts.
 *
 */
async function getEvents() {
    cnmContract.events.MintCommitted({}, function (error, event) {
    }).on('data', function (event) {
        cnmCallCount ++ ;
        // This is amount of mint
        let blockNumber = event.blockNumber;
        let amount = event.returnValues.amount;
        cnmAmount += amount;

    }).on('changed', function (event) {
    }).on('error', console.error);

    houseContract.events.MintCommitted({}, function (error, event) {
    }).on('data', function (event) {
        houseCallCount ++ ;
        // This is amount of mint
        let blockNumber = event.blockNumber;
        let amount = event.returnValues.amount;
        houseAmount += amount;
    }).on('changed', function (event) {
    }).on('error', console.error);
};


