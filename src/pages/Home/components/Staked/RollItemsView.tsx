import React from "react";

import styled from "styled-components";
import ItemRoll from "./ItemRoll";
import track from "../../../../assets/images/UnstakedBoxes/ScrollBar.png";
import thumb from "../../../../assets/images/UnstakedBoxes/ScrollTab.png";

const RollItemsView = ({
  items,
  tokenIds,
  addToken,
  removeToken,
  handleRoll,
  getCheddarOwed,
}: any) => {
  return (
    <Wrapper>
      {items.map((item: any, index: number) => (
        <ItemRoll
          key={index}
          tokenIds={tokenIds}
          item={item}
          handleRoll={handleRoll}
          handleAdd={addToken}
          handleRemove={removeToken}
          getCheddarOwed={getCheddarOwed}
        />
      ))}
    </Wrapper>
  );
};

export default RollItemsView;

const Wrapper = styled.div`
  width: 24%;
  height: 300px;
  margin: 7px 1%;
  overflow-y: auto;
  position: relative;
  z-index: 1;
  ::-webkit-scrollbar {
    width: 30px;
  }
  ::-webkit-scrollbar-track {
    background-image: url(${track});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 36% 100%;
  }
  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-thumb:hover {
    background-image: url(${thumb});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;
