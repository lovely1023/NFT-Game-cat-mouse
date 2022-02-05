import Web3 from "web3";
import { FC, useEffect, useState } from "react";
import { utils } from "ethers";

import { message, notification, Spin, Typography } from "antd";
import styled from "styled-components";
import background from "../../assets/images/background.png";

import { SyncOutlined } from "@ant-design/icons";
import WhitePaper2 from "../Home/components/Whitepaper/WhitePaper2";

import MintBox from "../Home/components/MintBox";
import ConnectMetamask from "../Home/components/ConnectMetamask";
import GamePage from "../Home/components/GamePage";
import LoadingModal from "../Home/components/LoadingModal/LoadingModal";
import WhatHappenModal from "../../components/WhatHappenModal/WhatHappenModal";
import MiddleTextSection2 from "../Home/components/MiddleText/MiddleTextSection2";

import { useWallet } from "../../hooks/useWallet";

import {
  getContractCnM,
  getContractCnMGame,
  getContractRandomizer,
} from "../../utils/getContract";

import whitelist from "../../utils/proof.json";
const loadingIcon = <SyncOutlined style={{ fontSize: 50 }} spin />;
const LandingPage: FC = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen: any = () => setOpen(!open);
  const [loading, setLoading] = useState("");
  const [confirming, setConfirming] = useState("");
  const [whatHappen, setWhatHappen] = useState([] as any);

  const { active, account, connector, library } = useWallet();
  const mintPriceETH = 0.001;
  const [mintCharacterReady, setMintCharacterReady] = useState(false);
  const [data, setData] = useState({
    AdoptionMinted: 0,
    CanMintAdoption: 0,
    mintCostAdoption: 0,
    maxTokensAdoption: 0,
    paidTokensAdoption: 0,
    isGamePausedAdoption: 0,
    hasMintPendingAdoption: 0,
    BalanceOfAccountOwner: 0,
  });

  const listenToEvents = async () => {
    if (connector) {
      // listen events from Randomizer whether it gets ready to claim mint
      const { contract: RanomizerContract } = await getContractRandomizer(
        connector
      );
      const options = {
        fromBlock: "latest",
      };

      await RanomizerContract.events
        .ClaimMintReady(options)
        .on("data", function (event: any) {
          if (event.event === "ClaimMintReady") {
            setMintCharacterReady(true);
          }
        });
    }
  };

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

  const getBlockchainData = async (
    text?: string,
    isShowWhatHappen?: any,
    isFirstLoad?: boolean
  ) => {
    if (connector && library) {
      try {
        isFirstLoad && setLoading("Fetching data...");
        const { contract: CnMContract } = await getContractCnM(connector);
        const { contract: CnMGameContract } = await getContractCnMGame(
          connector
        );

        const walletProvider = await connector.getProvider();
        const web3 = new Web3(walletProvider);

        const BalanceOfAccountOwner = +(await web3.eth.getBalance(
          account as string
        ));

        const AdoptionMinted = +(await CnMContract.methods
          .totalSupply()
          .call());

        const CanMintAdoption = await CnMGameContract.methods
          .canMint(account)
          .call();

        const maxTokensAdoption = +(await CnMContract.methods
          .getMaxTokens()
          .call());

        const paidTokensAdoption = +(await CnMContract.methods
          .getPaidTokens()
          .call());

        const mintCostAdoption = +(await CnMGameContract.methods
          .mintCost(AdoptionMinted, maxTokensAdoption)
          .call());

        const isGamePausedAdoption = +(await CnMGameContract.methods
          .paused()
          .call());

        const hasMintPendingAdoption = +(await CnMGameContract.methods
          .hasMintPending(account)
          .call());

        setData({
          AdoptionMinted,
          CanMintAdoption,
          mintCostAdoption,
          maxTokensAdoption,
          paidTokensAdoption,
          isGamePausedAdoption,
          hasMintPendingAdoption,
          BalanceOfAccountOwner,
        });
        setLoading("");
        setConfirming("");
      } catch (err) {
        setLoading("");
        setConfirming("");
        console.log(err, "<<L<<<");
        throw err;
      }
    }
  };

  useEffect(() => {
    getBlockchainData("", null, true);
    listenToEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector, account, active, library]);
  const {
    AdoptionMinted,
    CanMintAdoption,
    mintCostAdoption,
    maxTokensAdoption,
    paidTokensAdoption,
    isGamePausedAdoption,
    hasMintPendingAdoption,
    BalanceOfAccountOwner,
  } = data;

  const handleMintAdoption = async (amount: number, isStake: boolean) => {
    if (!active) {
      message.error("Please connect wallet!");
      return;
    }

    if (mintCostAdoption > 0) {
      message.error(
        "You can only mint with ETH here! Please enter game screen."
      );
      return;
    }

    if (AdoptionMinted + amount > paidTokensAdoption) {
      message.error("Mint limit exceeded");
      return;
    }

    if (
      amount * mintPriceETH > BalanceOfAccountOwner ||
      BalanceOfAccountOwner == 0
    ) {
      message.error("Insufficient balance");
      return;
    }

    try {
      const { contract: CnMGameContract } = await getContractCnMGame(connector);
      const ehterAmount = utils.parseEther(
        (mintPriceETH * amount).toFixed(3).toString()
      );

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
          gas: gasFee,
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
          setTimeout(() => getBlockchainData(""), 1000);
        });
    } catch (err) {
      handleError(err);
      setLoading("");
      setConfirming("");
    }
  };

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
          gas: gasFee,
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
          gas: gasFee,
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
          setTimeout(() => getBlockchainData(""), 1000);
        });
    } catch (err) {
      handleError(err);
      setLoading("");
      setConfirming("");
    }
  };

  const buttonDisabled = loading || confirming !== "";

  return (
    <Wrapper>
      <LoadingModal />
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

        <MiddleTextSection2 />

        <StyledSRow>
          <MintBox
            minted={AdoptionMinted}
            paidTokens={paidTokensAdoption}
            mintCost={mintPriceETH}
            handleMint={handleMintMain}
            handleClaimMint={handleClaimMintAdoption}
            maxToken={maxTokensAdoption}
            buttonDisabled={buttonDisabled}
            isGamePaused={isGamePausedAdoption}
            hasMintPending={hasMintPendingAdoption}
            canMint={CanMintAdoption}
            claimReady={mintCharacterReady}
          />
          <UnstyledRow className="left">
            {active && <GamePage />}
            {!active && <ConnectMetamask />}
            <WhitePaper2 />
          </UnstyledRow>
        </StyledSRow>
      </Container>
    </Wrapper>
  );
};

const Container = styled.div`
  padding: 50px 50px 50px;
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

const StyledSRow = styled.div`
  display: grid;
  width: 65%;
  margin-bottom: 50px;
  grid-template-columns: 57% 40%;
  grid-column-gap: 4%;
  @media (max-width: 768px) {
    display: block;
  }
  margin: 0 auto;
  .right {
    text-align: right;
  }
  .left {
    text-align: left;
  }
`;

const UnstyledRow = styled.div`
  display: block;
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

export default LandingPage;
