import Web3 from "web3";
import { partition } from "lodash";
import { FC, useEffect, useState } from "react";
import { utils } from "ethers";

import { message, notification, Spin, Typography } from "antd";
import styled from "styled-components";
import background from "../../assets/images/background.png";
import MiddleTextSection from "./components/MiddleText/MiddleTextSection";
import Adoption from "./components/Adoption";
import RealEState from "./components/RealEState";
import UnstakedBoxAdop from "./components/Unstaked/UnstakedBoxAdop";
import UnstakedBoxEst from "./components/Unstaked/UnstakedBoxEst";
import StakedMice from "./components/Staked/StakedMice";
import StakedCats from "./components/Staked/StakedCats";
import StakedRealEstate from "./components/Staked/StakedRealEstate";

import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import Stats from "./components/Logs/Stats";
import Logs from "./components/Logs/Log";
import WhitePaper from "./components/Whitepaper/WhitePaper";
import WhitePaper2 from "./components/Whitepaper/WhitePaper2";
import WhatHappenModal from "../../components/WhatHappenModal/WhatHappenModal";

import MintBox from "./components/MintBox";
import ConnectMetamask from "./components/ConnectMetamask";
import GamePage from "./components/GamePage";
import LoadingModal from "./components/LoadingModal/LoadingModal";
import NotificationLog from "./components/NotificationLog/NotificationLog";
import { useWallet } from "../../hooks/useWallet";
import whitelist from "../../utils/proof.json";

import {
  getContractCheddar,
  getContractCnM,
  getContractCnMGame,
  getContractHabitat,
  getContractHouse,
  getOldContractCnM,
  getContractHouseGame,
  getContractRandomizer,
} from "../../utils/getContract";
import { _HABITAT, _HOUSEGAME } from "../../utils/constants";

// 0 - habitatless, 1 - Shake, 2 - Ranch, 3 - Mansion

const HOME = {
  "0": "Trashcan",
  "1": "Cupboard",
  "2": "Pantry",
  "3": "Vault",
};

const HOME_NFT = {
  "0": "Shack",
  "1": "Ranch",
  "2": "Mansion",
};

const loadingIcon = <SyncOutlined style={{ fontSize: 50 }} spin />;
const HabitatPage: FC = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen: any = () => setOpen(!open);
  const [loading, setLoading] = useState("");
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [whatHappen, setWhatHappen] = useState([] as any);
  const [confirming, setConfirming] = useState("");
  const [nfts, setNFts] = useState({
    stakedNfts: [],
    unstakedNfts: [],
    stakedHouses: [],
    unstakedHouses: [],
  });
  const [approved, setApproved] = useState({
    isApprovedForCnM: false,
    isApprovedForHouse: false,
    allowance: 0,
  });
  const [refetchApproval, setRefetchApproval] = useState(false);
  const [refetchNFTs, setRefetchNFTs] = useState(false);

  const { active, account, connector, library } = useWallet();
  const mintPriceETH = 0.001;

  const [mintCharacterReady, setMintCharacterReady] = useState(false);
  const [mintHouseReady, setMintHouseReady] = useState(false);

  const [data, setData] = useState({
    globalStatus: {},
    globalLog: [],
    BalanceOfAccountOwner: 0,
    BalanceOfCheddar: 0,
    AdoptionMinted: 0,
    RealeEstateMinted: 0,
    CanMintAdoption: 0,
    CanMintRealEstate: 0,
    mintCostAdoption: 0,
    maxTokensAdoption: 0,
    mintCostRealEstate: 0,
    maxTokensRealEstate: 0,
    isGamePausedAdoption: 0,
    isGamePausedRealEstate: 0,
    paidTokensAdoption: 0,
    hasMintPendingAdoption: 0,
    paidTokensRealEstate: 0,
    hasMintPendingRealEstate: 0,
  });

  const [notificationToggle, setNotificationToggle] = useState(false);
  const [notificationLog, setNotificationLog] = useState("");
  const [amount, setAmount] = useState(1);

  function delay(time: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, time * 1000));
  }

  async function tryNTimes(toTry: any, times = 5, interval = 10) {
    if (times < 1)
      throw new Error(
        `Bad argument: 'times' must be greater than 0, but ${times} was received.`
      );
    let attemptCount = 0;
    while (true) {
      await delay(interval);
      try {
        const result = await toTry();
        setConfirming("");
        return result;
      } catch (error) {
        if (++attemptCount >= times) throw error;
      }
    }
  }

  const fetchNFTs = async () => {
    const { contract: oldContractCNM } = await getOldContractCnM(connector);
    const { contract: CnMContract } = await getContractCnM(connector);
    const { contract: HouseContract } = await getContractHouse(connector);
    const query = await axios({
      url: "https://api.thegraph.com/subgraphs/name/vigorousdeveloper/crazycatladies5",
      method: "post",
      data: {
        query: `
          query{
              tokenEntity(id: "${account?.toLowerCase()}") {
                id
                tokens (first: 1000) {
                  id
                  type
                  staked
                  claimed
                }
              }
          }
          `,
      },
    });

    let CnM: any = [[], []];
    let houses: any = [[], []];

    if (query.data.data.tokenEntity) {
      const [nft, houseNfts] = partition(
        query.data.data.tokenEntity.tokens,
        (token) => {
          return token.id.includes("_cnm");
        }
      );

      const CnMNfts = await Promise.all(
        nft.map(async (token: any) => {
          const id = Number(token.id.split("_cnm")[0]);
          const uri = await (id <= data.paidTokensAdoption
            ? oldContractCNM
            : CnMContract
          ).methods
            .tokenURI(id)
            .call();
          const traits = await CnMContract.methods.getTokenTraits(id).call();
          if (id === 296 || id === 301 || id === 326) console.log(traits);
          const isCat = traits[0];
          const isCrazy = traits[1];
          const type = isCat ? (isCrazy ? "Cat Ladies" : "Cats") : "Mice";
          const owed = await getCheddarOwedCnM(id);
          return {
            ...token,
            ...JSON.parse(atob(uri.split(",")[1])),
            id,
            owed,
            forage: HOME[traits.roll as "0" | "1" | "2" | "3"],
            type,
          };
        })
      );

      const HouseNfts = await Promise.all(
        houseNfts.map(async (token: any) => {
          const id = Number(token.id.split("_house")[0]);
          const uri = await HouseContract.methods.tokenURI(id).call();
          const traits = await HouseContract.methods.getTokenTraits(id).call();
          const owed = await getCheddarOwedHouse(id);
          return {
            ...token,
            ...JSON.parse(atob(uri.split(",")[1])),
            id,
            owed,
            type: HOME_NFT[traits.roll as "0" | "1" | "2"],
          };
        })
      );

      CnM = partition(CnMNfts, (token) => token.staked);
      houses = partition(HouseNfts, (token) => token.staked);
    }

    setNFts({
      // @ts-ignore
      stakedNfts: CnM[0],
      // @ts-ignore
      unstakedNfts: CnM[1],
      stakedHouses: houses[0],
      // @ts-ignore
      unstakedHouses: houses[1],
    });
    setRefetchNFTs(false);
    setConfirming("");
  };

  useEffect(() => {
    if (account && refetchNFTs && data.paidTokensAdoption) {
      fetchNFTs();
    }
  }, [account, refetchNFTs, data]);

  const handleError = (err: any) => {
    if (err?.message.includes("execution reverted")) {
      if (err?.message.includes("guarding")) {
        notification.error({
          message: "",
          description:
            "Execution reverted: Wizard needs to be staked for 2 days",
        });

        return;
      }
      notification.error({
        message: "",
        description:
          err.message.substr(0, err.message.indexOf("{")) || err.message,
      });
    } else {
      notification.error({
        message: "",
        description: err.message,
      });
    }
  };

  async function fetchApproval() {
    const { contract: CnMContract } = await getContractCnM(connector);
    const { contract: HouseContract } = await getContractHouse(connector);
    const { contract: CheddarContract } = await getContractCheddar(connector);

    const isApprovedForCnM = await CnMContract.methods
      .isApprovedForAll(account, _HABITAT)
      .call();

    const isApprovedForHouse = await HouseContract.methods
      .isApprovedForAll(account, _HABITAT)
      .call();

    const allowance = await CheddarContract.methods
      .allowance(account, _HOUSEGAME)
      .call();

    setApproved({
      isApprovedForCnM: true,
      isApprovedForHouse: true,
      allowance,
    });
    setRefetchApproval(false);
  }

  useEffect(() => {
    if (refetchApproval && connector) {
      fetchApproval();
    }
  }, [refetchApproval, connector]);

  const getBlockchainData = async (
    text?: string,
    isShowWhatHappen?: any,
    isFirstLoad?: boolean
  ) => {
    if (connector && library) {
      try {
        isFirstLoad && setLoading("Fetching data...");
        const { contract: CheddarContract } = await getContractCheddar(
          connector
        );
        const { contract: CnMContract } = await getContractCnM(connector);
        const { contract: CnMGameContract } = await getContractCnMGame(
          connector
        );
        const { contract: HouseContract } = await getContractHouse(connector);
        const { contract: HouseGameContact } = await getContractHouseGame(
          connector
        );

        const { contract: HabitatContract } = await getContractHabitat(
          connector
        );

        const walletProvider = await connector.getProvider();
        const web3 = new Web3(walletProvider);

        console.log("-------STEP 1---------");
        const BalanceOfAccountOwner = +(await web3.eth.getBalance(
          account as string
        ));
        console.log("-------STEP 2---------");
        const BalanceOfCheddar = +(
          (await CheddarContract.methods.balanceOf(account).call()) / 1e18
        );

        // const TotalCheddarSupply = +(await HabitatContract.methods
        //   .totalSupply()
        //   .call());
        console.log("-------STEP 3---------");
        const AdoptionMinted = +(await CnMContract.methods.minted().call());
        const RealeEstateMinted = +(await HouseContract.methods
          .totalSupply()
          .call());
        console.log("-------STEP 5---------");
        const CanMintAdoption = await CnMGameContract.methods
          .canMint(account)
          .call();
        console.log("-------STEP 6---------");
        const CanMintRealEstate = await HouseGameContact.methods
          .canMint(account)
          .call();
        console.log("-------STEP 7---------");
        const maxTokensAdoption = +(await CnMContract.methods
          .getMaxTokens()
          .call());
        console.log("-------STEP 8---------");
        const paidTokensAdoption = +(await CnMContract.methods
          .getPaidTokens()
          .call());
        console.log("-------STEP 9---------");
        const mintCostAdoption = +(await CnMGameContract.methods
          .mintCost(AdoptionMinted, maxTokensAdoption)
          .call());
        console.log(mintCostAdoption, "=====");
        console.log("-------STEP 10---------");
        const hasMintPendingAdoption = +(await CnMGameContract.methods
          .hasMintPending(account)
          .call());
        console.log("-------STEP 11---------");
        const maxTokensRealEstate = +(await HouseContract.methods
          .getMaxTokens()
          .call());
        console.log("-------STEP 12---------");
        const paidTokensRealEstate = +0; //(await HouseContract.methods.getPaidTokens().call());
        const mintCostRealEstate =
          +(await HouseGameContact.methods
            .mintCost(RealeEstateMinted, maxTokensRealEstate)
            .call()) / 1e18;
        console.log("-------STEP 13---------");
        const hasMintPendingRealEstate = +(await HouseGameContact.methods
          .hasMintPending(account)
          .call());
        console.log("-------STEP 14---------");
        const isGamePausedAdoption = await CnMGameContract.methods
          .paused()
          .call();
        console.log("-------STEP 15---------");
        const isGamePausedRealEstate = await HouseGameContact.methods
          .paused()
          .call();

        console.log("-------STEP 16---------");
        await fetchApproval();
        console.log("-------STEP 17---------");
        await fetchNFTs();

        console.log("-------STEP 18---------");
        const query = await axios({
          url: "https://api.thegraph.com/subgraphs/name/vigorousdeveloper/crazycatladies5",
          method: "post",
          data: {
            query: `
              query{
                statisEntity(id: "0x01") {
                  catMinted
                  mouseMinted
                  catStaked
                  mouseStaked
                  totalStolenByCat
                  totalStolenByCrazyCat
                }

                logEntities(first: 100, where: { owner: "${account?.toLowerCase()}" }, orderDirection:desc) {
                    id
                     time
                     owner
                     event
                     token {
                       id
                     }
                }
              }
              `,
          },
        });

        console.log("-------STEP 19---------");
        let AppStatus: any = {};
        console.log(query.data.data);
        if (query.data.data.statisEntity) {
          AppStatus = query.data.data.statisEntity;
        }

        let AppLog: any = [];
        if (query.data.data.logEntities) {
          AppLog = query.data.data.logEntities;
        }
        console.log("-------STEP 20---------");
        setData({
          globalStatus: AppStatus,
          globalLog: AppLog,
          BalanceOfAccountOwner,
          BalanceOfCheddar,
          AdoptionMinted,
          RealeEstateMinted,
          CanMintAdoption,
          CanMintRealEstate,
          mintCostAdoption,
          maxTokensAdoption,
          mintCostRealEstate,
          maxTokensRealEstate,
          isGamePausedAdoption,
          isGamePausedRealEstate,
          paidTokensAdoption,
          hasMintPendingAdoption,
          paidTokensRealEstate,
          hasMintPendingRealEstate,
        });
        setLoading("");
        setConfirming("");
      } catch (err) {
        setLoading("");
        setConfirming("");

        notification.error({
          message: "",
          description: "Your data is being updated. Please refresh browser.",
        });
        throw err;
      }
    }
  };

  const handleEvent = (msg: string) => () => {
    setNotificationToggle(true);
    setNotificationLog(msg);
    setTimeout(() => {
      setNotificationToggle(false);
    }, 1000);
  };

  const listenToEvents = async () => {
    if (connector) {
      // listen events from Randomizer whether it gets ready to claim mint
      const { contract: RanomizerContract } = await getContractRandomizer(
        connector
      );
      const { contract: CnMontract } = await getContractCnM(connector);
      const { contract: HouseContract } = await getContractHouse(connector);
      const options = {
        fromBlock: "latest",
      };

      await CnMontract.events
        .CatStolen(options)
        .on("data", handleEvent("Cat Stolen"));

      await CnMontract.events
        .CrazyCatLadyStolen(options)
        .on("data", handleEvent("Cat Cat Lady Stolen"));

      await CnMontract.events
        .MouseStolen(options)
        .on("data", handleEvent("Mouse Stolen"));

      await HouseContract.events
        .ShackStolen(options)
        .on("data", handleEvent("Shack Stolen"));

      await HouseContract.events
        .RanchStolen(options)
        .on("data", handleEvent("Ranch Stolen"));

      await HouseContract.events
        .MansionStolen(options)
        .on("data", handleEvent("Mansion Stolen"));

      await RanomizerContract.events
        .ClaimMintReady(options)
        .on("data", function (event: any) {
          if (event.event === "ClaimMintReady") {
            setMintCharacterReady(true);
            setMintHouseReady(true);
          }
        });
    }
  };

  useEffect(() => {
    getBlockchainData("", null, true);
    listenToEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector, account, active, library]);
  const {
    BalanceOfAccountOwner,
    BalanceOfCheddar,
    AdoptionMinted,
    RealeEstateMinted,
    CanMintAdoption,
    CanMintRealEstate,
    mintCostAdoption,
    maxTokensAdoption,
    mintCostRealEstate,
    maxTokensRealEstate,
    isGamePausedAdoption,
    isGamePausedRealEstate,
    paidTokensAdoption,
    hasMintPendingAdoption,
    paidTokensRealEstate,
    hasMintPendingRealEstate,
  } = data;

  const HandleWhitelistMint = async (amount: number, isStake: boolean) => {
    //@ts-ignore
    try {
      //@ts-ignore
      console.log(whitelist[account]);
      //@ts-ignore
      if (whitelist[account?.toLowerCase()] === undefined) {
        message.error("not whitelisted user");
        return;
      }
      //@ts-ignore
      console.log(account);
      //@ts-ignore
      console.log(whitelist[account?.toLowerCase()]);
      //@ts-ignore
      const { tokenId, proof } = whitelist[account?.toLowerCase()];
      const { contract: CnMGameContract } = await getContractCnMGame(connector);
      const ehterAmount = utils.parseEther(
        (mintPriceETH * amount).toFixed(3).toString()
      );

      let gasFee = await CnMGameContract.methods
        .whitelistMint(amount, isStake, tokenId, proof)
        .estimateGas({
          from: account,
          value: ehterAmount,
        });

      await CnMGameContract.methods
        .whitelistMint(amount, isStake, tokenId, proof)
        .send({
          from: account,
          value: ehterAmount,
          gas: Math.floor(gasFee * 1.5),
        })
        .on("transactionHash", async () => {
          setLoading("Minting... ");
        })
        .on("receipt", async () => {
          setLoading("");
          setConfirming("Confirming...");
          notification.success({
            message: "",
            description: !isStake ? "Mint success" : "Mint & stake success",
          });
          setAmount(1);
          setTimeout(
            () =>
              getBlockchainData(
                !isStake ? "Mint success" : "Mint & stake success"
              ),
            15000
          );
        });
    } catch (err) {
      handleError(err);
      setLoading("");
      setConfirming("");
    }
  };

  const handleMintAdoption = async (amount: number, isStake: boolean) => {
    if (!active) return;
    try {
      // Out of genesis mint
      console.log(AdoptionMinted, amount, paidTokensAdoption);
      if (AdoptionMinted + amount > paidTokensAdoption) {
        // Some mints might be eth and some cheddar in same txn
        const ethMintsRemaining = Math.max(
          paidTokensAdoption - AdoptionMinted,
          0
        );
        let ethMints = 0;
        if (ethMintsRemaining >= amount) {
          ethMints = amount;
        } else if (ethMintsRemaining == 0) {
          ethMints = 0;
        } else {
          ethMints = amount - ethMintsRemaining;
        }
        const chedMints = amount - ethMints;

        if (
          chedMints * (mintCostAdoption / 1e18) > BalanceOfCheddar ||
          BalanceOfCheddar === 0
        ) {
          message.error("Insufficient balance");
          return;
        }

        if (ethMintsRemaining * mintPriceETH > BalanceOfAccountOwner) {
          message.error("Insufficient balance");
          return;
        }
      } else {
        if (
          amount * mintPriceETH > BalanceOfAccountOwner ||
          BalanceOfAccountOwner == 0
        ) {
          message.error("Insufficient balance");
          return;
        }
      }

      const { contract: CnMGameContract } = await getContractCnMGame(connector);
      const mintPrice =
        AdoptionMinted >= paidTokensAdoption ? 0 : mintPriceETH * amount;
      const ehterAmount = utils.parseEther(mintPrice.toString());

      let gasFee = await CnMGameContract.methods
        .mintCommit(amount, isStake)
        .estimateGas({
          from: account,
          value: ehterAmount,
        });

      await CnMGameContract.methods
        .mintCommit(amount, isStake)
        .send({
          from: account,
          value: ehterAmount,
          gas: Math.floor(gasFee * 1.5),
        })
        .on("transactionHash", async () => {
          setLoading("Minting... ");
        })
        .on("receipt", async () => {
          setMintCharacterReady(false);
          setLoading("");
          setConfirming("Confirming...");
          notification.success({
            message: "",
            description: !isStake ? "Mint success" : "Mint & stake success",
          });
          setAmount(1);
          // tryNTimes(() =>
          //   getBlockchainData(
          //     !isStake ? "Mint success" : "Mint & stake success"
          //   )
          // );
          setTimeout(
            () =>
              getBlockchainData(
                !isStake ? "Mint success" : "Mint & stake success"
              ),
            15000
          );
        });
    } catch (err) {
      handleError(err);
      setLoading("");
      setConfirming("");

      notification.error({
        message: "",
        description: "Your data is being updated. Please refresh browser.",
      });
    }
  };

  const handleMintMain = async (amount: number, isStake: boolean) => {
    const { contract: CnMGameContract } = await getContractCnMGame(connector);
    console.log(CnMGameContract);
    const isWhiteListActive = await CnMGameContract.methods
      .isWhitelistActive()
      .call();

    isWhiteListActive
      ? HandleWhitelistMint(amount, isStake)
      : handleMintAdoption(amount, isStake);
  };

  const handleApproveForCnM = async () => {
    const { contract: CnMContract } = await getContractCnM(connector);
    await CnMContract.methods
      .setApprovalForAll(_HABITAT, true)
      .send({ from: account })
      .on("transactionHash", async () => {
        setLoading("Sending Approval...");
      })
      .on("receipt", async (_receipt: any) => {
        setLoading("");
        notification.success({
          message: "",
          description: "Successfully Approved",
        });
        setApproved({
          ...approved,
          isApprovedForCnM: true,
        });

        setLoading("");
        setConfirming("Confirming...");
        setTimeout(() => getBlockchainData("", null, true), 15000);
      });
  };

  const handleApproveForHouse = async () => {
    const { contract: HouseContract } = await getContractHouse(connector);
    await HouseContract.methods
      .setApprovalForAll(_HABITAT, true)
      .send({ from: account })
      .on("transactionHash", async () => {
        setLoading("Sending Approval...");
      })
      .on("receipt", async (_receipt: any) => {
        setLoading("");
        notification.success({
          message: "",
          description: "Successfully Approved",
        });

        setApproved({
          ...approved,
          isApprovedForHouse: true,
        });

        setLoading("");
        setConfirming("Confirming...");
        setTimeout(() => getBlockchainData("", null, true), 15000);
      });
  };

  const handleStakingCnM = async (ids: string[]) => {
    if (ids.length < 1) {
      return;
    }

    const { contract: HabitatContract } = await getContractHabitat(connector);
    const mapped = ids.map(Number);

    await HabitatContract.methods
      .addManyToStakingPool(account, mapped)
      .send({
        from: account,
      })
      .on("transactionHash", async () => {
        setLoading("Staking...");
      })
      .on("receipt", async (_receipt: any) => {
        notification.success({
          message: "",
          description: "Successfully Staked",
        });
        setLoading("");
        setConfirming("Confirming...");
        setTimeout(() => setRefetchNFTs(true), 15000);
      });
  };

  const handleIncreaseAllowance = async () => {
    try {
      const { contract: HouseGameContract } = await getContractHouseGame(
        connector
      );
      const { contract: CheddarContract } = await getContractCheddar(connector);

      // console.log(allowance, amount * mintCostRealEstate);
      if (
        approved.allowance === 0 ||
        amount * mintCostRealEstate > approved.allowance
      ) {
        //@ts-ignore
        const maxApproval = new Web3.utils.toBN(
          "115792089237316195423570985008687907853269984665640564039457584007913129639935"
        );

        await CheddarContract.methods
          .increaseAllowance(_HOUSEGAME, maxApproval)
          .send({
            from: account,
          });
      }
    } catch (err) {
      handleError(err);
      setLoading("");
      setConfirming("");

      notification.error({
        message: "",
        description: "Your data is being updated. Please refresh browser.",
      });
    }
  };
  const handleStakingRealEstate = async (ids: string[]) => {
    if (ids.length < 1) {
      return;
    }

    const { contract: HouseContract } = await getContractHouse(connector);
    const { contract: HabitatContract } = await getContractHabitat(connector);
    const mapped = ids.map(Number);

    const isApproved = await HouseContract.methods
      .isApprovedForAll(account, _HABITAT)
      .call();

    if (!isApproved)
      await HouseContract.methods.setApprovalForAll(_HABITAT, true).call();

    await HabitatContract.methods
      .addManyHouseToStakingPool(account, mapped)
      .send({
        from: account,
      })
      .on("transactionHash", async () => {
        setLoading("Staking...");
      })
      .on("receipt", async (_receipt: any) => {
        setLoading("");
        notification.success({
          message: "",
          description: "Successfully Staked",
        });
        setConfirming("Confirming...");
        setTimeout(() => setRefetchNFTs(true), 15000);
      });
  };

  const handleClaimMintAdoption = async () => {
    try {
      const { contract: CnMGameContract } = await getContractCnMGame(connector);
      let gasFee = await CnMGameContract.methods.mintReveal().estimateGas({
        from: account,
      });
      await CnMGameContract.methods
        .mintReveal()
        .send({
          from: account,
          gas: Math.floor(gasFee * 1.5),
        })
        .on("transactionHash", async () => {
          setLoading("Claiming mint... ");
        })
        .on("receipt", async (receipt: any) => {
          let logs = [];

          if (Array.isArray(receipt?.events?.CatMinted)) {
            receipt?.events?.CatMinted.forEach((item: any) => {
              const { tokenId } = item?.returnValues;
              logs.push({
                tokenId,
                catMinted: true,
              });
            });
          } else if (receipt?.events?.CrazyCatLadyMinted) {
            const { tokenId } =
              receipt?.events?.CrazyCatLadyMinted?.returnValues;
            logs.push({
              tokenId,
              crazyCatLadyMinted: true,
            });
          }

          if (Array.isArray(receipt?.events?.MouseMinted)) {
            receipt?.events?.MouseMinted.forEach((item: any) => {
              const { tokenId } = item?.returnValues;
              logs.push({
                tokenId,
                mouseMinted: true,
              });
            });
          } else if (receipt?.events?.CatStolen) {
            const { tokenId } = receipt?.events?.CatStolen?.returnValues;
            logs.push({
              tokenId,
              catStolen: true,
            });
          } else if (receipt?.events?.CrazyCatLadyStolen) {
            const { tokenId } =
              receipt?.events?.CrazyCatLadyStolen?.returnValues;
            logs.push({
              tokenId,
              crazyCatLadyStolen: true,
            });
          } else if (receipt?.events?.MouseStolen) {
            const { tokenId } = receipt?.events?.MouseStolen?.returnValues;
            logs.push({
              tokenId,
              mouseStolen: true,
            });
          } else if (receipt?.events?.CatBurned) {
            const { tokenId } = receipt?.events?.CatBurned?.returnValues;
            logs.push({
              tokenId,
              catBurned: true,
            });
          } else if (receipt?.events?.CrazyCatLadyBurned) {
            const { tokenId } =
              receipt?.events?.CrazyCatLadyBurned?.returnValues;
            logs.push({
              tokenId,
              crazyCatLadyBurned: true,
            });
          } else if (receipt?.events?.MouseBurned) {
            const { tokenId } = receipt?.events?.MouseBurned?.returnValues;
            logs.push({
              tokenId,
              mouseBurned: true,
            });
          }

          let results = [] as any;

          logs.forEach((item: any) => {
            if (item.catMinted) {
              results.push({
                message: `Cat #${item.tokenId} was minted`,
              });
            } else if (item.crazyCatLadyMinted) {
              results.push({
                message: `CrazyCatLady #${item.tokenId} was minted`,
              });
            } else if (item.mouseMinted) {
              results.push({
                message: `Mouse #${item.tokenId} was minted`,
              });
            } else if (item.catStolen) {
              results.push({
                message: `Cat #${item.tokenId} was stolen`,
              });
            } else if (item.crazyCatLadyStolen) {
              results.push({
                message: `CrazyCatLady #${item.tokenId} was stolen`,
              });
            } else if (item.mouseStolen) {
              results.push({
                message: `Mouse #${item.tokenId} was stolen`,
              });
            } else if (item.catBurned) {
              results.push({
                message: `Cat #${item.tokenId} was burned`,
              });
            } else if (item.crazyCatLadyBurned) {
              results.push({
                message: `CrazyCatLady #${item.tokenId} was burned`,
              });
            } else if (item.mouseBurned) {
              results.push({
                message: `Mouse #${item.tokenId} was burned`,
              });
            }
          });
          setLoading("");
          if (results.length > 0) {
            setWhatHappen(results);
            toggleOpen();
          }
          setConfirming("Confirming...");
          notification.success({
            message: "",
            description: "Claim mint success",
          });
          setTimeout(() => getBlockchainData("", null, true), 15000);
        });
    } catch (err) {
      handleError(err);
      setLoading("");
      setConfirming("");

      notification.error({
        message: "",
        description: "Your data is being updated. Please refresh browser.",
      });
    }
  };

  const handleMintRealEstate = async (amount: number, isStake: boolean) => {
    try {
      if (
        amount * mintCostRealEstate > BalanceOfCheddar ||
        BalanceOfCheddar === 0
      ) {
        message.error("Insufficient balance");
        return;
      }
      const { contract: HouseGameContract } = await getContractHouseGame(
        connector
      );
      const { contract: CheddarContract } = await getContractCheddar(connector);

      // console.log(allowance, amount * mintCostRealEstate);
      if (
        approved.allowance === 0 ||
        amount * mintCostRealEstate > approved.allowance
      ) {
        //@ts-ignore
        const maxApproval = new Web3.utils.toBN(
          "115792089237316195423570985008687907853269984665640564039457584007913129639935"
        );

        await CheddarContract.methods
          .increaseAllowance(_HOUSEGAME, maxApproval)
          .send({
            from: account,
          });
      }

      await HouseGameContract.methods.mintCommit(amount, isStake).call({
        from: account,
      });
      await HouseGameContract.methods
        .mintCommit(amount, isStake)
        .send({
          from: account,
        })
        .on("transactionHash", async () => {
          setLoading("Minting... ");
        })
        .on("receipt", async () => {
          setMintHouseReady(false);
          setLoading("");
          setConfirming("Confirming...");
          notification.success({
            message: "",
            description: !isStake ? "Mint success" : "Mint & stake success",
          });
          setAmount(1);

          setTimeout(
            () =>
              getBlockchainData(
                !isStake ? "Mint success" : "Mint & stake success"
              ),
            15000
          );
        });
    } catch (err) {
      handleError(err);
      setLoading("");
      setConfirming("");

      notification.error({
        message: "",
        description: "Your data is being updated. Please refresh browser.",
      });
    }
  };

  const handleClaimMintRealEstate = async () => {
    try {
      const { contract: HouseGameContract } = await getContractHouseGame(
        connector
      );

      await HouseGameContract.methods.mintReveal().call({
        from: account,
      });
      await HouseGameContract.methods
        .mintReveal()
        .send({
          from: account,
        })
        .on("transactionHash", async () => {
          setLoading("Claiming mint... ");
        })
        .on("receipt", async (receipt: any) => {
          let logs = [];
          if (Array.isArray(receipt?.events?.ShakeMinted)) {
            receipt?.events?.ShakeMinted.forEach((item: any) => {
              const { tokenId } = item?.returnValues;
              logs.push({
                tokenId,
                ShakeMinted: true,
              });
            });
          } else if (receipt?.events?.RanchMinted) {
            const { tokenId } = receipt?.events?.RanchMinted?.returnValues;
            logs.push({
              tokenId,
              RanchMinted: true,
            });
          }

          if (Array.isArray(receipt?.events?.MansionMinted)) {
            receipt?.events?.MansionMinted.forEach((item: any) => {
              const { tokenId } = item?.returnValues;
              logs.push({
                tokenId,
                MansionMinted: true,
              });
            });
          } else if (receipt?.events?.ShakeStolen) {
            const { tokenId } = receipt?.events?.ShakeStolen?.returnValues;
            logs.push({
              tokenId,
              ShakeStolen: true,
            });
          } else if (receipt?.events?.RanchStolen) {
            const { tokenId } = receipt?.events?.RanchStolen?.returnValues;
            logs.push({
              tokenId,
              RanchStolen: true,
            });
          } else if (receipt?.events?.MansionStolen) {
            const { tokenId } = receipt?.events?.MansionStolen?.returnValues;
            logs.push({
              tokenId,
              MansionStolen: true,
            });
          } else if (receipt?.events?.ShakeBurned) {
            const { tokenId } = receipt?.events?.ShakeBurned?.returnValues;
            logs.push({
              tokenId,
              ShakeBurned: true,
            });
          } else if (receipt?.events?.RanchBurned) {
            const { tokenId } = receipt?.events?.RanchBurned?.returnValues;
            logs.push({
              tokenId,
              RanchBurned: true,
            });
          } else if (receipt?.events?.MansionBurned) {
            const { tokenId } = receipt?.events?.MansionBurned?.returnValues;
            logs.push({
              tokenId,
              MansionBurned: true,
            });
          }

          let results = [] as any;

          logs.forEach((item: any) => {
            if (item.ShakeMinted) {
              results.push({
                message: `Shake #${item.tokenId} was minted`,
              });
            } else if (item.RanchMinted) {
              results.push({
                message: `Ranch #${item.tokenId} was minted`,
              });
            } else if (item.MansionMinted) {
              results.push({
                message: `Mansion #${item.tokenId} was minted`,
              });
            } else if (item.ShakeStolen) {
              results.push({
                message: `Shake #${item.tokenId} was stolen`,
              });
            } else if (item.RanchStolen) {
              results.push({
                message: `Ranch #${item.tokenId} was stolen`,
              });
            } else if (item.MansionStolen) {
              results.push({
                message: `Mansion #${item.tokenId} was stolen`,
              });
            } else if (item.ShakeBurned) {
              results.push({
                message: `Shake #${item.tokenId} was burned`,
              });
            } else if (item.RanchBurned) {
              results.push({
                message: `Ranch #${item.tokenId} was burned`,
              });
            } else if (item.MansionBurned) {
              results.push({
                message: `Mansion #${item.tokenId} was burned`,
              });
            }
          });
          setLoading("");
          if (results.length > 0) {
            setWhatHappen(results);
            toggleOpen();
          }
          setConfirming("Confirming...");
          notification.success({
            message: "",
            description: "Claim mint success",
          });
          setTimeout(() => getBlockchainData("", null, true), 15000);
        });
    } catch (err) {
      handleError(err);
      setLoading("");
      setConfirming("");

      notification.error({
        message: "",
        description: "Your data is being updated. Please refresh browser.",
      });
    }
  };

  const handleUnstakingCnM = async (
    ids: string[],
    isMice: boolean,
    bool: boolean
  ) => {
    if (ids.length < 1) {
      return;
    }

    const { contract: CnMContract } = await getContractCnM(connector);
    const { contract: HabitatContract } = await getContractHabitat(connector);

    // check if it is claimable
    const result = await CnMContract.methods.isClaimable().call();
    if (!result) {
      message.error(
        "You can't claim or unstake until the genesis mint is complete"
      );
      return;
    }

    let validTokens: Number[] = [];
    const values = ids.map(Number);

    async function callGetOwed(id: number) {
      // const cheddarAccrued = await getCheddarOwedCnM(id);
      // if (cheddarAccrued < 20000) {
      //   notification.error({
      //     message: "",
      //     description:
      //       "Execution reverted: You can only unstake after generating 20,000 $CHEDDAR",
      //   });
      // }

      validTokens.push(id);
    }

    // if its unstaking
    if (bool && isMice) {
      values.map((value: any) => callGetOwed(value));

      if (validTokens.length < 1) {
        return;
      }
    } else {
      validTokens = ids.map(Number);
    }

    await HabitatContract.methods
      .claimManyFromHabitatAndYield(validTokens, bool)
      .send({
        from: account,
      });

    setLoading("");
    setConfirming("Confirming...");
    setTimeout(() => setRefetchNFTs(true), 15000);
  };

  const handleUnstakingHouse = async (ids: string[], bool: boolean) => {
    if (ids.length < 1) {
      return;
    }

    const { contract: CnMContract } = await getContractCnM(connector);
    // check if it is claimable
    const result = await CnMContract.methods.isClaimable().call();
    if (!result) {
      message.error(
        "You can't claim or unstake until the genesis mint is complete"
      );
      return;
    }

    const { contract: HabitatContact } = await getContractHabitat(connector);
    const values = ids.map(Number);
    await HabitatContact.methods.claimManyHouseFromHabitat(values, bool).send({
      from: account,
    });

    setLoading("");
    setConfirming("Confirming...");
    setTimeout(() => setRefetchNFTs(true), 15000);
  };

  const handleRoll = async (tokenId: number) => {
    const { contract: CnMGameContract } = await getContractCnMGame(connector);
    const { contract: CnMContract } = await getContractCnM(connector);

    if (BalanceOfCheddar < 3000) {
      notification.error({
        message: "",
        description: "You need 3000 $CHEDDAR to roll for a new location .",
      });

      return "-1";
    }
    const before = await CnMContract.methods.getTokenTraits(tokenId).call();
    setShowLoadingModal(true);
    await CnMGameContract.methods.rollForage(tokenId).send({
      from: account,
    });
    const after = await CnMContract.methods.getTokenTraits(tokenId).call();

    setLoading("");
    setConfirming("Confirming...");
    setTimeout(() => setRefetchNFTs(true), 15000);
    setShowLoadingModal(false);
    return [before.roll, after.roll];
  };

  const getCheddarOwedCnM = async (tokenId: number) => {
    const { contract: HabitatContract } = await getContractHabitat(connector);
    const result = await HabitatContract.methods.getOwedForCnM(tokenId).call();
    console.log(tokenId, result);
    return Math.floor(result / 1e18);
  };

  const getCheddarOwedHouse = async (tokenId: number) => {
    const { contract: HabitatContract } = await getContractHabitat(connector);
    const result = await HabitatContract.methods
      .getOwedForHouse(tokenId)
      .call();
    return Math.floor(result / 1e18);
  };

  const buttonDisabled = loading || confirming !== "";
  return (
    <Wrapper>
      <LoadingModal
        open={showLoadingModal}
        toggleOpen={() => setShowLoadingModal(!showLoadingModal)}
      />
      {loading && (
        <Confirm>
          <Spin indicator={loadingIcon} />
          <Typography className="shadow">{loading}</Typography>
        </Confirm>
      )}

      {open && (
        <WhatHappenModal
          toggleOpen={toggleOpen}
          open={open}
          whatHappen={whatHappen}
        />
      )}

      <Container>
        {confirming !== "" && (
          <Confirm>
            <Spin indicator={loadingIcon} />
            <Typography className="shadow primary">FETCHING</Typography>
          </Confirm>
        )}

        <MiddleTextSection cheddar={BalanceOfCheddar} />

        {active ? (
          <>
            <NotificationLog
              showAlert={notificationToggle}
              notification={notificationLog}
            />
            <StyledRow>
              <Adoption
                minted={AdoptionMinted}
                paidTokens={paidTokensAdoption}
                mintCost={mintCostAdoption}
                handleMint={handleMintMain}
                handleClaimMint={handleClaimMintAdoption}
                maxToken={maxTokensAdoption}
                buttonDisabled={buttonDisabled}
                isGamePaused={isGamePausedAdoption}
                hasMintPending={hasMintPendingAdoption}
                canMint={CanMintAdoption}
                amountToMint={amount}
                claimReady={mintCharacterReady}
              />
              <RealEState
                minted={RealeEstateMinted}
                paidTokens={paidTokensRealEstate}
                mintCost={mintCostRealEstate}
                isApproved={approved.allowance}
                handleIncreaseAllowance={handleIncreaseAllowance}
                handleMint={handleMintRealEstate}
                handleClaimMint={handleClaimMintRealEstate}
                maxToken={maxTokensRealEstate}
                buttonDisabled={buttonDisabled}
                isGamePaused={isGamePausedRealEstate}
                hasMintPending={hasMintPendingRealEstate}
                canMint={CanMintRealEstate}
                claimReady={mintHouseReady}
              />
            </StyledRow>
            <Typography className="noneshadow primary spantitle">
              UNSTAKED:
            </Typography>
            <StyledRow>
              <UnstakedBoxAdop
                handleStakingCnM={handleStakingCnM}
                list={nfts.unstakedNfts}
                isApproved={approved.isApprovedForCnM}
                sendApproval={handleApproveForCnM}
                buttonDisabled={buttonDisabled}
                isGamePaused={isGamePausedAdoption}
              />
              <UnstakedBoxEst
                handleStakingRealEstate={handleStakingRealEstate}
                list={nfts.unstakedHouses}
                isApproved={approved.isApprovedForHouse}
                sendApproval={handleApproveForHouse}
                buttonDisabled={buttonDisabled}
                isGamePaused={isGamePausedAdoption}
              />
            </StyledRow>
            <Typography className="noneshadow primary spantitle">
              STAKED:
            </Typography>
            <StakedMice
              handleRoll={handleRoll}
              handleUnstaking={handleUnstakingCnM}
              list={nfts.stakedNfts.filter((nft: any) => nft.type === "Mice")}
              getCheddarOwed={getCheddarOwedCnM}
              buttonDisabled={buttonDisabled}
              isGamePaused={isGamePausedAdoption}
            />
            <Typography className="noneshadow primary spannone" />
            <StyledRow>
              <StakedCats
                handleUnstaking={handleUnstakingCnM}
                list={nfts.stakedNfts.filter((nft: any) => nft.type !== "Mice")}
                buttonDisabled={buttonDisabled}
                isGamePaused={isGamePausedAdoption}
              />
              <StakedRealEstate
                list={nfts.stakedHouses}
                handleUnstaking={handleUnstakingHouse}
                buttonDisabled={buttonDisabled}
                isGamePaused={isGamePausedAdoption}
              />
            </StyledRow>
            <Typography className="noneshadow primary spannone" />
            <StyledSmallRow>
              <Stats data={data.globalStatus} />
              <Logs list={data.globalLog} />
            </StyledSmallRow>
            <WhitePaper />
          </>
        ) : (
          <>
            <StyledSRow>
              <MintBox
                minted={AdoptionMinted}
                paidTokens={paidTokensAdoption}
                mintCost={mintCostAdoption}
                handleMint={handleMintMain}
                handleClaimMint={handleClaimMintAdoption}
                maxToken={maxTokensAdoption}
                buttonDisabled={buttonDisabled}
                isGamePaused={isGamePausedAdoption}
                hasMintPending={hasMintPendingAdoption}
                canMint={CanMintAdoption}
              />
              <UnstyledRow className="left">
                <GamePage />
                <ConnectMetamask />
                <WhitePaper2 />
              </UnstyledRow>
            </StyledSRow>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

const Container = styled.div`
  padding: 80px 50px 0;
  max-width: 1440px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;
const Wrapper = styled.div`
  background-image: url(${background});
  min-width: 100vw;
  background-repeat: repeat-y;
  background-size: 100% auto;
  .spantitle {
    font-size: 30px;
    text-align: center;
    color: #ee3d37;
    margin: -21px 0 18px 0;
  }
  .spannone {
    height: 30px;
  }
`;

const StyledRow = styled.div`
  display: grid;
  margin-bottom: 50px;
  grid-template-columns: 49% 49%;
  grid-column-gap: 2%;
  @media (max-width: 768px) {
    display: block;
  }
  .right {
    text-align: right;
  }
  .left {
    min-width: 340px;
    text-align: left;
  }
`;

const StyledSRow = styled.div`
  display: grid;
  width: 80%;
  margin-bottom: 50px;
  grid-template-columns: 49% 49%;
  grid-column-gap: 2%;
  justify-items: center;
  @media (max-width: 768px) {
    display: block;
  }
  margin: 0 auto;
  .right {
    text-align: right;
  }
  .left {
    min-width: 340px;
    text-align: left;
  }
`;

const UnstyledRow = styled.div`
  display: block;
`;

const StyledSmallRow = styled.div`
  display: grid;
  width: 60%;
  margin: 0 auto;
  margin-bottom: 50px;
  grid-template-columns: 49% 49%;
  grid-column-gap: 2%;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Confirm = styled.div`
  position: fixed;
  right: 15px;
  top: 20vh;
  width: 300px;
  height: 50px;
  background-color: #989898;
  opacity: 1;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  color: black;
  font-size: 12px;
  z-index: 125;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  .anticon {
    font-size: 26px !important;
    margin-right: 10px;
  }
`;

export default HabitatPage;
