import { useState } from "react";
import styled from "styled-components";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { Button, message } from "antd";
import { Typography, Text } from "../../../../components/Typography";
import background from "../../../../assets/images/UnstakedBoxes/UnstakeBox.png";
import SelectItemsView from "../Unstaked/SelectItemsView";
import FilterElems from "../Unstaked/FilterElems";
import unselect from "../../../../assets/images/UnstakedBoxes/FilterToggle.png";
import select from "../../../../assets/images/UnstakedBoxes/FilterToggleOn.png";

const StakedRealEstate = ({
  list,
  minted,
  mintCost,
  handleUnstaking,
  handleMint,
  maxToken,
  buttonDisabled,
  isGamePaused,
  hasMintPending,
  handleClaimMint,
  canMint,
}: any) => {
  const [filters, setFilters]: [string[], any] = useState([]);
  const [tokenIds, setTokenIds]: [string[], any] = useState([]);
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    const toggled = !selected;
    setTokenIds(toggled ? list.map((c: any) => c.id) : []);
    setSelected(toggled);
  };

  const addFilter = (filter: string) => {
    setFilters(filters.concat([filter]));
  };

  const removeFilter = (filter: string) => {
    setFilters(filters.filter((filtering) => filtering !== filter));
  };

  const addToken = (id: string) => {
    setTokenIds(tokenIds.concat([id]));
  };

  const removeToken = (id: string) => {
    setTokenIds(tokenIds.filter((tokenId) => tokenId !== id));
  };

  const toRender =
    filters.length == 0
      ? list
      : list.filter((item: any) => {
          return filters.includes(item.type);
        });

  const submit = async (bool: boolean) => {
    console.log("tokenids", tokenIds);
    await handleUnstaking(tokenIds, bool);
  };

  return (
    <Wrapper>
      <Container>
        <TitleText className="primary center">
          <ScriptTitle>Houses</ScriptTitle>
          <ScriptFilter>
            <Typography
              className="primary center noneshadow"
              $size="20px"
              m="8px 0 0 16px"
            >
              Filter
            </Typography>
            <FilterView>
              <FilterElems
                addFilter={addFilter}
                removeFilter={removeFilter}
                name={"Shack"}
              />
              <FilterElems
                addFilter={addFilter}
                removeFilter={removeFilter}
                name={"Ranch"}
              />
              <FilterElems
                addFilter={addFilter}
                removeFilter={removeFilter}
                name={"Mansion"}
              />
            </FilterView>
          </ScriptFilter>
        </TitleText>
        <SelectItemsView
          tokenIds={tokenIds}
          items={toRender}
          handleAdd={addToken}
          handleRemove={removeToken}
        />
        <BottomNav className="primary center">
          <NavTitle>
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
          </NavTitle>
          <NavTitle>
            <MintButton
              type="primary"
              onClick={() => {
                if (buttonDisabled) message.error("Fetching data");
                else if (isGamePaused) message.error("Game is paused");
                else submit(false);
              }}
              style={{fontSize: 14}}
            >
              <p>Claim</p>
              <p>Selected</p>
            </MintButton>
          </NavTitle>
          <NavTitle>
            <MintButton
              type="primary"
              onClick={() => {
                if (buttonDisabled) message.error("Fetching data");
                else if (isGamePaused) message.error("Game is paused");
                else submit(true);
              }}
              style={{fontSize: 14}}
            >
              <p>Unstake</p>
              <p>Selected</p>
            </MintButton>
          </NavTitle>
        </BottomNav>
      </Container>
    </Wrapper>
  );
};

const Container = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 12px 28px 15px 28px;
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

const FilterView = styled.div`
  display: flex;
  height: 46px;
  line-height: 14px;
  justify-content: center;
  align-items: center;
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
  margin: 5px 0 0 0;
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
  width: 40%;
  height: 68px;
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: left;
  position: relative;
  z-index: 2;
  text-align: left;
  margin-left: 5px;
  text-shadow: none;
  @media (max-width: 768px) {
    font-size: 9px;
  }
`;

const ScriptFilter = styled.div`
  width: 60%;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  text-align: center;
  text-shadow: none;
  p {
    margin-block-start: 0;
    margin-block-end: 0;
  }
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

const BottomNav = styled(Typography)`
  font-size: 24px;
  line-height: 21px;
  margin: 0 20px 10px 20px;
  display: flex;
`;

const NavTitle = styled.div`
  width: 33.333333%;
  height: 50px;
  font-size: 26px;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  text-align: center;
  text-shadow: none;
  display: flex;
  margin: auto;
  @media (max-width: 768px) {
    font-size: 9px;
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

export default StakedRealEstate;
