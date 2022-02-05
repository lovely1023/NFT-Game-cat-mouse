import React from 'react';
import styled from 'styled-components';
import unselect from '../../../../assets/images/UnstakedBoxes/ImageBox.png';
import select from '../../../../assets/images/UnstakedBoxes/ImageBox_Selected.png';

const ImageContainer = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
`;

const ItemCheck = ({item, tokenIds, handleAdd, handleRemove}: any) => {
  const toggled = !tokenIds.includes(item.id);

  const handleClick = () => {
    toggled ? handleAdd(item.id) : handleRemove(item.id);
  };

  return (
    <div style={{display: "flex", flexDirection: "column", }}>
      <Wrapper
        onClick={handleClick}
        // @ts-ignore
        img={toggled ? unselect : select}
      >
        <img src={item.image}/>
      </Wrapper>

      {!!item.staked &&
      <p style={{fontSize: 10, textAlign: "center"}}>{item.owed}</p>
      }

    </div>
  );
};

export default ItemCheck;

const Wrapper = styled.div`
  width: 80px;
  height: 80px;
  flex: 0 0 80px;
  position: relative;
  background: url(${(props: any) => props.img});
  background-size: cover;
  display: grid;
  margin: 5px;
`;

