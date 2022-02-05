import { useState } from "react";
import styled from "styled-components";

import { Button, message } from "antd";
import { Text, Typography } from "../../../components/Typography";
import background from "../../../assets/images/AdoptionBox/AdoptionBox.png";
import Percentage from "./Percentage";
import Percentage3 from "./Percentage3";

const Adoption = ({
  minted,
  mintCost,
  handleMint,
  handleClaimMint,
  maxToken,
  buttonDisabled,
  isGamePaused,
  hasMintPending,
  amountToMint,
  canMint,
  claimReady,
}: any) => {
  const percentage = (minted / 50000) * 100;
  const [amount, setAmount] = useState(amountToMint);
  const mintPriceETH = 0.001;
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

  return (
    <Wrapper>
      <Container>
        <TitleText className="primary center">
          <ScriptTitle>ADOPTION</ScriptTitle>
          <ScriptDesc>
            <p>Mice,</p>
            <p>Cats,</p>
            <p>Cat Ladies</p>
          </ScriptDesc>
        </TitleText>

        {!hasMintPending ? (
          <>
            <Typography
              className="secondary center noneshadow"
              $size="24px"
              m="14px 0"
            >
              {mintCost > 0
                ? nf.format((mintCost / 1e18) * amount)
                : nf.format(mintPriceETH * amount)}
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
                    else {
                      handleMint(amount, false);
                    }
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
        </MintRow>
        <div>
          <Typography
            className="primary noneshadow center"
            m="25px 10px 7px 10px"
          >
            Current Price :{" "}
            {mintCost > 0 ? (
              <Text className="secondary noneshadow">
                {nf.format(mintCost / 1e18)} $CHEDDAR
              </Text>
            ) : (
              <Text className="secondary noneshadow">
                {nf.format(mintPriceETH)} ETH
              </Text>
            )}
          </Typography>
        </div>
        <Percentage3 percentage={percentage} borderimage={true}></Percentage3>
        <PercentLavel>
          <First>Gen0</First>
          <Second>6.7K-20K</Second>
          <Third>20-40K</Third>
          <Fourth>40-50K</Fourth>
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
  width: 13.4%;
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
  width: 26.6%;
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
export default Adoption;
