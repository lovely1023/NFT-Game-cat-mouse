/* eslint-disable import/prefer-default-export */
import Web3 from 'web3';

import CheddarABI from '../contracts/CheddarABI.json';
import CnMABI from '../contracts/CnMABI.json';
import CnmGameABI from '../contracts/CnmGameABI.json';
import HouseABI from '../contracts/HouseABI.json';
import HouseGameABI from '../contracts/HouseGameABI.json';
import HouseTraitsABI from '../contracts/HouseTraitsABI.json';
import HabitatABI from "../contracts/HabitatABI.json";
import TraitsABI from "../contracts/TraitsABI.json";
import RandomizerABI from "../contracts/Randomizer.json";

import {
  _TRAITS,
  _OLDCNM,
  _HOUSETRAITS,
  _HABITAT,
  _RANDOM_GEN,
  _CNM,
  _HOUSE,
  _CHEDDAR,
  _CNMGAME,
  _HOUSEGAME,
} from "./constants";

export const getContractCheddar = async (connector: any) => {
  if (!connector) throw Error("No connector found");
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = CheddarABI.abi;

  const contractAddress = _CHEDDAR;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractCnM = async (connector: any) => {
  if (!connector) throw Error("No connector found");
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = CnMABI.abi;
  const contractAddress = _CNM;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getOldContractCnM = async (connector: any) => {
  if (!connector) throw Error("No connector found");
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = CnMABI.abi;
  const contractAddress = _OLDCNM;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractCnMGame = async (connector: any) => {
  if (!connector) throw Error("No connector found");
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = CnmGameABI.abi;
  const contractAddress = _CNMGAME;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractHouse = async (connector: any) => {
  if (!connector) throw Error("No connector found");
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = HouseABI.abi;
  const contractAddress = _HOUSE;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractHouseGame = async (connector: any) => {
  if (!connector) throw Error("No connector found");
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = HouseGameABI.abi;
  const contractAddress = _HOUSEGAME;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractHouseTraits = async (connector: any) => {
  if (!connector) throw Error("No connector found");
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = HouseTraitsABI.abi;
  const contractAddress = _HOUSETRAITS;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractHabitat = async (connector: any) => {
  if (!connector) throw Error("No connector found");
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = HabitatABI.abi;
  const contractAddress = _HABITAT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractTraits = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = TraitsABI.abi;
  const contractAddress = _TRAITS;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractRandomizer = async (connector: any) => {
  if (!connector) throw Error("No connector found");
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = RandomizerABI.abi;
  const contractAddress = _RANDOM_GEN;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};