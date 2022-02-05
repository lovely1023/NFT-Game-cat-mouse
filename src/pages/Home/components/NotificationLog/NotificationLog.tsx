import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import styled from "styled-components";
import background from "../../../../assets/images/LogOverlayBox.png";
import { Typography, Text } from "../../../../components/Typography";
import track from "../../../../assets/images/UnstakedBoxes/ScrollBar.png";
import thumb from "../../../../assets/images/UnstakedBoxes/ScrollTab.png";

const NotificationLog = ({ notification, showAlert }: any) => {
  if (showAlert)
    return (
      <Wrapper>
        <Typography className="noneshadow third fontsize">LOG</Typography>
        <Wrapper2>{notification}</Wrapper2>
      </Wrapper>
    );
  return <div />;
};

export default NotificationLog;

const Wrapper = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 30px 28px 30px 28px;
  width: 100%;
  max-width: 718px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  min-height: 112px;
  .fontsize {
    font-size: 30px;
    text-align: center;
    color: #c99985;
    margin: -21px 0 18px 0;
  }
`;

const Wrapper2 = styled.div`
  width: 100%;
  height: 85%;
  text-align: center;
  overflow-y: auto;
  position: relative;
  z-index: 1;
  ::-webkit-scrollbar {
    width: 15px;
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
