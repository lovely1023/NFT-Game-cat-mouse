import { useEffect, useState } from "react";
import styled from "styled-components";

import { Button, message } from "antd";
import { Text, Typography } from "../../../components/Typography";
import background from "../../../assets/images/MintBox/MintBox.png";

import Percentage2 from "./Percentage2";

import btnMintnor from "../../../assets/images/MintBox/Button_Mint.png";
import btnMinthov from "../../../assets/images/MintBox/Button_Mint_Pressed.png";

import btnMintStakenor from "../../../assets/images/MintBox/Button_MintStake.png";
import btnMintStakehov from "../../../assets/images/MintBox/Button_MintStake_Pressed.png";

const MintBox = ({
  minted,
  paidTokens,
  mintCost,
  handleMint,
  handleClaimMint,
  maxToken,
  buttonDisabled,
  isGamePaused,
  hasMintPending,
  canMint,
  claimReady,
}: any) => {
  const percentage = (minted / 50000) * 100;
  const [amount, setAmount] = useState(1);
  var nf = new Intl.NumberFormat();

  const decrease = () => {
    if (amount === 1) {
      return;
    }
    setAmount(amount - 1);
  };
  const increase = () => {
    if (amount === 100) {
      return;
    }
    if (!(minted + amount < maxToken)) {
      message.error("All tokens on-sale already sold");
      return;
    }
    setAmount(amount + 1);
  };
  useEffect(() => {
    if (!hasMintPending) {
      return;
    }
    setAmount(1);
  }, [hasMintPending]);

  const genesisSoldOut = true; //minted >= paidTokens;

  return (
    <Wrapper>
      <Container>
        <TitleText className="primary center">
          <ScriptTitle>Mint</ScriptTitle>
          <ScriptDesc>
            <p>Price: {nf.format(mintCost)} ETH</p>
            <p>Minted: {nf.format(minted)}/10k</p>
          </ScriptDesc>
        </TitleText>

        {genesisSoldOut ? (
          <Typography
            className="secondary center noneshadow"
            $size="24px"
            style={{
              height: 200,
            }}
          >
            GENESIS MINT SOLD OUT
          </Typography>
        ) : (
          <>
            {!hasMintPending ? (
              <>
                <Typography
                  className="secondary center noneshadow"
                  $size="24px"
                  m="14px 0"
                >
                  {nf.format(mintCost * amount)}
                </Typography>
                <NumberInput>
                  <Text
                    className="primary noneshadow cursorPointer"
                    onClick={decrease}
                  >
                    -
                  </Text>
                  <Typography className="primary noneshadow">
                    {amount}
                  </Typography>
                  <Text
                    className="primary noneshadow cursorPointer"
                    onClick={increase}
                  >
                    +
                  </Text>
                </NumberInput>
              </>
            ) : (
              <div style={{ height: 91 }} />
            )}

            <MintRow>
              <MintButtonContainer>
                {hasMintPending ? (
                  <MintButton
                    disabled={!claimReady && !canMint}
                    onClick={() => {
                      if (buttonDisabled) message.error("Fetching data");
                      else if (isGamePaused) message.error("Game is paused");
                      else if (!canMint && !claimReady)
                        message.error(
                          "Your mint is not ready. Try again in 5m"
                        );
                      else handleClaimMint();
                    }}
                  >
                    CLAIM MINT
                  </MintButton>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      className="mintstakeButton"
                      // type="primary"
                      // disabled={minted < paidTokens || buttonDisabled || isGamePaused}
                      onClick={() => {
                        // if (minted < paidTokens) message.error('Not enough minted');
                        // else
                        if (buttonDisabled) message.error("Fetching data");
                        else if (isGamePaused) message.error("Game is paused");
                        else handleMint(amount, true);
                      }}
                    />
                    <div
                      className="mintButton"
                      // type="primary"
                      // disabled={minted < paidTokens || buttonDisabled || isGamePaused}
                      onClick={() => {
                        // if (minted < paidTokens) message.error('Not enough minted');
                        // else
                        if (buttonDisabled) message.error("Fetching data");
                        else if (isGamePaused) message.error("Game is paused");
                        else handleMint(amount, false);
                      }}
                    />
                  </div>
                )}
              </MintButtonContainer>
            </MintRow>

            <Percentage2
              percentage={percentage}
              borderimage={true}
            ></Percentage2>
            <PercentLavel>
              <First>Gen0</First>
              <Second>20K</Second>
              <Third>40K</Third>
              <Fourth>50K</Fourth>
            </PercentLavel>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

const Container = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 25px 20px 29px 25px;
  font-size: 20px;
  width: 100%;
  @media (max-width: 768px) {
    text-align: center;
  }
  .ant-col {
    text-align: center;
  }
`;

const PercentLavel = styled.div`
  padding: 10 0;
  display: flex;
  color: black;
`;

const MintRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 50px;
  @media (max-width: 480px) {
    display: block;
    text-align: center;
  }
`;

const Wrapper = styled.div`
  position: relative;
  &.ant-col-md-12 {
    flex: 0 0 49%;
  }
  @media (max-width: 800px) {
    &.ant-col-md-12 {
      flex: 0 0 100%;
    }
  }
`;

const TitleText = styled(Typography)`
  font-size: 24px;
  line-height: 21px;
  margin: 0 0 20px;
  display: flex;
`;

const ScriptTitle = styled.div`
  width: 45%;
  height: 68px;
  font-size: 34px;
  display: flex;
  align-items: center;
  justify-content: left;
  position: relative;
  z-index: 2;
  text-align: left;
  text-shadow: none;
  @media (max-width: 768px) {
    font-size: 9px;
  }
`;

const ScriptDesc = styled.div`
  text-align: left !important;
  margin-top: 15px;
  width: 55%;
  font-size: 14px;
  align-items: center;
  justify-content: right;
  position: relative;
  z-index: 2;
  text-align: right;
  text-shadow: none;
  p {
    margin-block-start: 0;
    margin-block-end: 0;
  }
  @media (max-width: 768px) {
    font-size: 9px;
  }
`;

const First = styled.div`
  width: 20%;
  height: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  text-align: center;
  &.active {
    background: #6f1d1bc7;
  }
  @media (max-width: 768px) {
    font-size: 9px;
  }
  .border {
    border-right: 4px solid #39221b;
  }
`;
const Second = styled.div`
  width: 20%;
  height: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  text-align: center;
  &.active {
    background: #6f1d1bc7;
  }
  @media (max-width: 768px) {
    font-size: 9px;
  }
  .border {
    border-right: 4px solid #39221b;
  }
`;
const Third = styled.div`
  width: 40%;
  height: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  text-align: center;
  &.active {
    background: #6f1d1bc7;
  }
  @media (max-width: 768px) {
    font-size: 9px;
  }
  .border {
    border-right: 4px solid #39221b;
  }
`;
const Fourth = styled.div`
  width: 20%;
  height: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  text-align: center;
  &.active {
    background: #6f1d1bc7;
  }
  @media (max-width: 768px) {
    font-size: 9px;
  }
  .border {
    border-right: 4px solid #39221b;
  }
`;

const NumberInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-typography {
    font-size: 28px;
    margin: 0 20px;
  }
  .anticon {
    font-size: 20px;
    user-select: none;
  }

  .cursorPointer {
    cursor: pointer;
  }
`;

const MintButton = styled(Button)`
  width: 215px;
  display: block;
  text-transform: none;
  margin-bottom: 45px;
  margin-top: 20px;

  @media (max-width: 1280px) {
    width: auto;
    font-size: 16px;
  }
  @media (max-width: 1024px) {
    margin: 10px auto;
    width: auto;
    text-align: center;
  }

  @media (max-width: 450px) {
    width: auto;
    font-size: 16px;
  }
`;

const MintButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  @media (max-width: 1024px) {
    display: block;
    text-align: center;
    margin-left: 20px;
  }

  .mintButton {
    background-image: url(${btnMintnor});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    width: 140px;
    height: 40px;
    margin: 0 auto;
    margin-top: 10px;
  }
  .mintButton:hover,
  .mintButton:active {
    background-image: url(${btnMinthov});
  }

  .mintstakeButton {
    background-image: url(${btnMintStakenor});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    width: 220px;
    height: 60px;
    margin: 0 auto;
  }
  .mintstakeButton:hover,
  .mintstakeButton:active {
    background-image: url(${btnMintStakehov});
  }
`;

export default MintBox;
