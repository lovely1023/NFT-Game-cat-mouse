
import React,  {useState} from 'react';

import { Row, Button } from 'antd';
import styled from 'styled-components';
import ItemCheck from './ItemCheck';
import track from '../../../../assets/images/UnstakedBoxes/ScrollBar.png';
import thumb from '../../../../assets/images/UnstakedBoxes/ScrollTab.png';

const SelectItemsView = ({
  handleAdd,
  handleRemove,
  type,
  items,
  tokenIds,
  borderimage,
}: any) => {
  if (!items || items.length == 0) return <Wrapper></Wrapper>;
  return (
    <Wrapper>
      {items.map((item: any) => (
        <ItemCheck
          tokenIds={tokenIds}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          key={item.name}
          item={item}
        />
      ))}
    </Wrapper>
  );
};

export default SelectItemsView;

const Wrapper = styled.div`
width: 25%%;
height: 200px;
margin: 7px 0;
display: flex;
flex-wrap: wrap;
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
  background-size: contain;
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-thumb:hover {
  background-image: url(${thumb});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
}
`;
