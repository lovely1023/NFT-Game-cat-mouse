# How to use this

1. Add env variables from .env
   * `NODE_URL` Web3 provider RPC URL
   * `CNM_CONTRACT_ADDRESS` CnmGame contract address
   * `HOUSE_CONTRACT_ADDRESS` HouseGame contract address
   * `OWNER_KEY` is the private key of the owner wallet address
   

2. Copy the CnMGame & HouseGame contracts' abi.json files into the "abi" directory


3. updateRandomNumber() is the function that generate random number.
4. 2 scripts

   * `npm run interval` runs the script to assign random number per 5 minutes
   * `npm run mint` runs the script to assign random number per 100 mints



