import { useState } from "react";
import styled from "styled-components";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { Button, message } from "antd";
import { Typography, Text } from "../../../../components/Typography";
import background from "../../../../assets/images/UnstakedBoxes/UnstakeBox.png";
import borderimage from "../../../../assets/images/AdoptionBox/AdoptionBarBorder.png";
import SelectItemsView from "./SelectItemsView";
import FilterElems from "./FilterElems";

const UnstakedBoxAdop = ({
  list,
  isApproved,
  sendApproval,
  handleStakingCnM,
  buttonDisabled,
  isGamePaused,
}: any) => {
  const [filters, setFilters]: [string[], any] = useState([]);
  const [tokenIds, setTokenIds]: [string[], any] = useState([]);

  const addFilter = (filter: string) => {
    setFilters(filters.concat([filter]));
  };

  const removeFilter = (filter: string) => {
    setFilters(filters.filter((filtering) => filtering !== filter));
  };

  const addToken = (id: string) => {
    console.log(id);
    setTokenIds(tokenIds.concat([id]));
  };

  const removeToken = (id: string) => {
    setTokenIds(tokenIds.filter((tokenId) => tokenId !== id));
  };

  const submit = async () => {
    try {
      await handleStakingCnM(tokenIds);
      setTokenIds([]);
    } catch (e) {}
  };

  const toRender =
    filters.length == 0
      ? list
      : list.filter((item: any) => filters.includes(item.type));

  return (
    <Wrapper>
      <Container>
        <TitleText className="primary center">
          <ScriptTitle>Mice, Cats, Cat Ladies</ScriptTitle>
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
                name={"Mice"}
              />
              <FilterElems
                addFilter={addFilter}
                removeFilter={removeFilter}
                name={"Cats"}
              />
              <FilterElems
                addFilter={addFilter}
                removeFilter={removeFilter}
                name={"Cat Ladies"}
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
        <MintRow>
          <MintButtonContainer>
            <MintButton
              type="primary"
              onClick={() => {
                if (buttonDisabled) message.error("Fetching data");
                else if (isGamePaused) message.error("Game is paused");
                else if (!isApproved) sendApproval();
                else submit();
              }}
            >
              {!isApproved ? "" : "Stake Selected"}
            </MintButton>
          </MintButtonContainer>
        </MintRow>
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

const MintRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 10px;
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
  position: static;
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
  margin-top: 10px;
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
export default UnstakedBoxAdop;
