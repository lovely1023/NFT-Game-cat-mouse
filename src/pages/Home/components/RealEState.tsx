import { useState } from "react";
import styled from "styled-components";

import { Button, message } from "antd";
import { Text, Typography } from "../../../components/Typography";
import background from "../../../assets/images/RealEstateBox/RealEstateBox.png";
import Percentage from "./Percentage";

const RealEState = ({
  minted,
  paidTokens,
  mintCost,
  handleMint,
  maxToken,
  buttonDisabled,
  isGamePaused,
  hasMintPending,
  handleClaimMint,
  handleIncreaseAllowance,
  isApproved,
  canMint,
  claimReady,
}: any) => {
  const percentage = (minted / 10000) * 100;
  const [amount, setAmount] = useState(1);
  var nf = new Intl.NumberFormat();

  const decrease = () => {
    if (amount === 1) {
      return;
    }
    setAmount(amount - 1);
  };
  const increase = () => {
    if (amount === 10) {
      return;
    }
    if (!(minted + amount < maxToken)) {
      message.error("All tokens on-sale already sold");
      return;
    }
    setAmount(amount + 1);
  };

  return (
    <Wrapper>
      <Container>
        <TitleText className="primary center">
          <ScriptTitle>REAL ESTATE</ScriptTitle>
          <ScriptDesc>
            <p>Shacks,</p>
            <p>Ranches,</p>
            <p>Mansions</p>
          </ScriptDesc>
        </TitleText>

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
              <Typography className="primary noneshadow">{amount}</Typography>
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
          {isApproved > 0 ? (
            <MintButtonContainer>
              {hasMintPending ? (
                <MintButton
                  type="primary"
                  disabled={!claimReady && !canMint}
                  onClick={() => {
                    if (buttonDisabled) message.error("Fetching data");
                    else if (isGamePaused) message.error("Game is paused");
                    else if (!canMint && !claimReady)
                      message.error("Your mint is not ready. Try again in 5m");
                    else {
                      setAmount(1);
                      handleClaimMint();
                    }
                  }}
                >
                  CLAIM MINT
                </MintButton>
              ) : (
                <>
                  {" "}
                  <MintButton
                    type="primary"
                    // disabled={minted < paidTokens || buttonDisabled || isGamePaused}
                    onClick={() => {
                      // if (minted < paidTokens) message.error('Not enough minted');
                      // else
                      if (buttonDisabled) message.error("Fetching data");
                      else if (isGamePaused) message.error("Game is paused");
                      else handleMint(amount, false);
                    }}
                  >
                    Mint
                  </MintButton>
                  <MintButton
                    type="primary"
                    // disabled={minted < paidTokens || buttonDisabled || isGamePaused}
                    onClick={() => {
                      // if (minted < paidTokens) message.error('Not enough minted');
                      // else
                      if (buttonDisabled) message.error("Fetching data");
                      else if (isGamePaused) message.error("Game is paused");
                      else handleMint(amount, true);
                    }}
                  >
                    Mint + Stake
                  </MintButton>
                </>
              )}
            </MintButtonContainer>
          ) : (
            <ApprovalContainer>
              <MintButton
                type="primary"
                onClick={() => {
                  if (buttonDisabled) message.error("Fetching data");
                  else if (isGamePaused) message.error("Game is paused");
                  else handleIncreaseAllowance();
                }}
              >
                Approve Cheddar
              </MintButton>
            </ApprovalContainer>
          )}
        </MintRow>
        <div>
          <Typography
            className="primary noneshadow center"
            m="25px 10px 7px 10px"
          >
            Current Price :{" "}
            <Text className="secondary noneshadow">
              {nf.format(mintCost)} $CHEDDAR
            </Text>
          </Typography>
        </div>
        <Percentage percentage={percentage} borderimage={false}></Percentage>
        <PercentLavel>
          <First>0-2.5K</First>
          <Second>2.5-7.5K</Second>
          <Third>7.5-10K</Third>
        </PercentLavel>
      </Container>
    </Wrapper>
  );
};

const Container = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 25px 28px 15px 28px;
  font-size: 20px;
  width: 100%;
  height: 100%;
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
  margin: 10px 0 20px;
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

const WizardImg = styled.img`
  position: absolute;
  top: -30px;
  left: -20px;
  @media (max-width: 800px) {
    position: static;
  }
`;

const ScriptTitle = styled.div`
  width: 70%;
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
  width: 30%;
  font-size: 16px;
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
  width: 25%;
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
  width: 50%;
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
  width: 25%;
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
  width: 240px;
  display: block;
  margin-left: 20px;
  text-transform: none;

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

const Description = styled(Typography)`
  color: #c4c4c4;
  font-size: 11px;
`;

const MintButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  @media (max-width: 1024px) {
    display: block;
    text-align: center;
    margin-left: 20px;
  }
`;

const ApprovalContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 25px;
`;
export default RealEState;
