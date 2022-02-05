import hre from "hardhat";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import fs from "fs";

const ethers = hre.ethers;
const tree: any = {};

async function main(addresses: string[]) {
  const leaves = addresses.map((address: string) => {
    const randomInt = Math.floor(Math.random() * 1000000);
    //@ts-ignore
    tree[address.toLowerCase()] = { tokenId: randomInt };
    return hashToken(randomInt, address);
  });

  const merkle = new MerkleTree(leaves, keccak256, {
    sortPairs: true,
  });

  Object.keys(tree).forEach((address: string) => {
    //@ts-ignore
    const value = tree[address];
    const proof = merkle.getHexProof(hashToken(value.tokenId, address));
    //@ts-ignore
    tree[address.toLowerCase()] = {
      ...value,
      proof,
    };
  });

  console.log("========= ROOT =========", merkle.getHexRoot());

  fs.writeFileSync("./proof.json", JSON.stringify(tree));
}

function hashToken(tokenId: number, account: string) {
  return Buffer.from(
    ethers.utils
      .solidityKeccak256(["uint256", "address"], [tokenId, account])
      .slice(2),
    "hex"
  );
}

main(JSON.parse(fs.readFileSync("./whitelist.json", "utf-8")))
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
