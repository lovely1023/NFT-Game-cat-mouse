import { useState } from "react";
import styled from "styled-components";

import { Button, message } from "antd";
import { Typography } from "../../../../components/Typography";
import background from "../../../../assets/images/StakedMice/StakedMiceBox.png";
import RollItemsView from "./RollItemsView";
import unselect from "../../../../assets/images/UnstakedBoxes/FilterToggle.png";
import select from "../../../../assets/images/UnstakedBoxes/FilterToggleOn.png";

import { getContractHabitat } from "../../../../utils/getContract";

const StakedMice = ({
  list,
  handleRoll,
  acceptRoll,
  handleUnstaking,
  buttonDisabled,
  isGamePaused,
  getCheddarOwed,
}: any) => {
  const [tokenIds, setTokenIds]: [string[], any] = useState([]);
  var nf = new Intl.NumberFormat();

  const addToken = (id: string) => {
    console.log(id);
    setTokenIds(tokenIds.concat([id]));
  };

  const removeToken = (id: string) => {
    setTokenIds(tokenIds.filter((tokenId) => tokenId !== id));
  };

  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    const toggled = !selected;
    setTokenIds(toggled ? list.map((c: any) => c.id) : []);
    setSelected(toggled);
  };

  const submit = async (bool: boolean) => {
    // The second paramter 'true' is saying it is for mouse
    await handleUnstaking(tokenIds, true, bool);
  };

  const trashcan = list.filter((mouse: any) => mouse.forage === "Trashcan");
  const cupboard = list.filter((mouse: any) => mouse.forage === "Cupboard");
  const pantry = list.filter((mouse: any) => mouse.forage === "Pantry");
  const vault = list.filter((mouse: any) => mouse.forage === "Vault");

  return (
    <Wrapper>
      <Container>
        <TitleText className="primary center">
          <ScriptTitle>Trashcan</ScriptTitle>
          <ScriptTitle>Cupboard</ScriptTitle>
          <ScriptTitle>Pantry</ScriptTitle>
          <ScriptTitle>Vault</ScriptTitle>
        </TitleText>
        <RollPanel>
          <RollItemsView
            name="Trashcan"
            items={trashcan}
            handleRoll={handleRoll}
            addToken={addToken}
            removeToken={removeToken}
            tokenIds={tokenIds}
            getCheddarOwed={getCheddarOwed}
          />
          <RollItemsView
            name="Cupboard"
            items={cupboard}
            handleRoll={handleRoll}
            addToken={addToken}
            removeToken={removeToken}
            tokenIds={tokenIds}
            getCheddarOwed={getCheddarOwed}
          />
          <RollItemsView
            name="Pantry"
            items={pantry}
            handleRoll={handleRoll}
            addToken={addToken}
            removeToken={removeToken}
            tokenIds={tokenIds}
            getCheddarOwed={getCheddarOwed}
          />
          <RollItemsView
            name="Vault"
            items={vault}
            handleRoll={handleRoll}
            addToken={addToken}
            removeToken={removeToken}
            tokenIds={tokenIds}
            getCheddarOwed={getCheddarOwed}
          />
        </RollPanel>
        <TitleText className="primary center">
          <ScriptTitle>
            <ScriptWrapper>
              <Typography
                className="primary center noneshadow lineheight"
                $size="20px"
                m="0 2px 0 0"
              >
                Select All:
              </Typography>
              {selected ? (
                <img
                  src={select}
                  onClick={() => {
                    handleClick();
                  }}
                  className="lineheight"
                  alt="select"
                  width="40px"
                  height="40px"
                />
              ) : (
                <img
                  src={unselect}
                  onClick={() => {
                    handleClick();
                  }}
                  className="lineheight"
                  alt="select"
                  width="40px"
                  height="40px"
                />
              )}
            </ScriptWrapper>
          </ScriptTitle>
          <ScriptTitle>
            <MintButton
              type="primary"
              onClick={() => {
                if (buttonDisabled) message.error("Fetching data");
                else if (isGamePaused) message.error("Game is paused");
                else submit(false);
              }}
              style={{ fontSize: 14 }}
            >
              <p>Claim</p>
              <p>Selected</p>
            </MintButton>
          </ScriptTitle>
          <ScriptTitle>
            <MintButton
              type="primary"
              onClick={() => {
                if (buttonDisabled) message.error("Fetching data");
                else if (isGamePaused) message.error("Game is paused");
                else submit(true);
              }}
              style={{ fontSize: 14 }}
            >
              <p>Unstake</p>
              <p>Selected</p>
            </MintButton>
          </ScriptTitle>
          <ScriptTitle>
            <Typography
              className="secondary center noneshadow"
              $size="20px"
              m="2px 0"
            >
              Roll Price: ${nf.format(3000)}
            </Typography>
          </ScriptTitle>
        </TitleText>
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

const Wrapper = styled.div`
  position: relative;
  max-width: 70%;
  margin: 0 auto;
  &.ant-col-md-12 {
    flex: 0 0 49%;
  }
  @media (max-width: 800px) {
    &.ant-col-md-12 {
      flex: 0 0 100%;
    }
  }
`;

const ScriptWrapper = styled.div`
  margin: 0 7px;
  display: flex;
  position: relative;
  z-index: 1;
  .lineheight {
    display: flex;
    line-height: 20px;
    text-align: left;
    cursor: pointer;
    align-items: center;
  }
`;

const TitleText = styled(Typography)`
  font-size: 20px;
  line-height: 21px;
  margin: 0 0 20px;
  display: flex;
`;

const RollPanel = styled.div`
  display: flex;
  margin: 0 -10px 26px -10px;
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
  width: 25%;
  height: 50px;
  font-size: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  text-align: center;
  text-shadow: none;
  @media (max-width: 768px) {
    font-size: 9px;
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
`;

const MintButton = styled(Button)`
  width: 140px;
  display: block;
  margin-left: 20px;
  text-transform: none;
  line-height: 4px;
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
export default StakedMice;
