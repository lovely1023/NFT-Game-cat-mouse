import React from "react";

import { Row, Button } from "antd";
import styled from "styled-components";
import background from "../../../../assets/images/WhitepaperBox/WhitepaperBox.png";
import btnnor from "../../../../assets/images/WhitepaperBox/Button_Whitepaper.png";
import btnhov from "../../../../assets/images/WhitepaperBox/Button_Whitepaper_Pressed.png";
import { Typography, Text } from "../../../../components/Typography";

const WhitePaper = () => {
  return (
    <Wrapper>
      <a href='https://whitepaper.catandmouse.game' target="_blank" >
        <div className="whitepaperbtn" ></div>
      </a>
    </Wrapper>
  );
};

export default WhitePaper;

const Wrapper = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 40px 28px 15px 28px;
  font-size: 20px;
  width: 340px;

  height: 175px;
  margin: 0 auto;

  .whitepaperbtn {
    background-image: url(${btnnor});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    width: 260px;
    height: 116px;
    margin: -10px auto 0 auto;
  }
  .whitepaperbtn:hover,
  .whitepaperbtn:active {
    background-image: url(${btnhov});
  }
`;
