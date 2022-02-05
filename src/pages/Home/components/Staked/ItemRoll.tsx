import React, { useState, useEffect } from "react";

import { Row, Button } from "antd";
import styled from "styled-components";
import unselect from "../../../../assets/images/UnstakedBoxes/ImageBox.png";
import select from "../../../../assets/images/UnstakedBoxes/ImageBox_Selected.png";
import { Typography, Text } from "../../../../components/Typography";
import RollPopupModal from "./RollPopupModal";

const ItemRoll = ({
  item,
  handleRoll,
  acceptRoll,
  tokenIds,
  handleAdd,
  handleRemove,
  getCheddarOwed,
}: any) => {
  const [result, showResult] = useState([]);
  const [cheddarOwed, setCheddarOwed] = useState(0);
  const toggled = !tokenIds.includes(item.id);
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    toggled ? handleAdd(item.id) : handleRemove(item.id);
  };

  const toggleShow = () => {
    setShowInfo(!showInfo);
  };

  const openModal = async () => {
    const result = await handleRoll(Number(item.id));
    if (Number.parseInt(result) < 0) {
      return;
    }

    showResult(result);
    toggleShow();
  };

  var nf = new Intl.NumberFormat();

  async function callGetOwed() {
    const result = await getCheddarOwed(item.id);
    setCheddarOwed(result);
  }

  useEffect(() => {
    if (item) {
      if (getCheddarOwed) {
        callGetOwed();
      }
    }
  }, [item]);
  return (
    <Wrapper>
      <ImageWrapper
        onClick={handleClick}
        // @ts-ignore
        img={toggled ? unselect : select}
      >
        <img src={item.image} />
      </ImageWrapper>
      <Container>
        <RollButton
          type="primary"
          onClick={() => {
            openModal();
          }}
        >
          Roll
        </RollButton>
        <p style={{fontSize: 10}}>{cheddarOwed}</p>
      </Container>
      <RollPopupModal
        item={item}
        result={result}
        visible={showInfo}
        onClose={toggleShow}
      />
    </Wrapper>
  );
};

export default ItemRoll;

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  flex: 0 0 60px;
  position: relative;
  background: url(${(props: any) => props.img});
  background-size: cover;
  display: grid;
  margin: 5px;
  margin-bottom: 15px;
`;

const Wrapper = styled.div`
  width: 0px;
  height: 60px;
  flex: 0 0 60px;
  position: relative;
  background: url(${(props: any) => props.img});
  display: flex;
  margin: 5px;
`;

const RollButton = styled(Button)`
  width: 80px;
  height: 30px;
  line-height: 8px;
  font-size: 12px;
  display: block;
  text-transform: none;
  margin-bottom: 7px;

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

const Container = styled.div`
  display: block;
  color: #ffa700;
  margin-left: 20px;
`;
