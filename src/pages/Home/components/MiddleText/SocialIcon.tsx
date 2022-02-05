import React from 'react';

import { Row, Button } from 'antd';
import styled from 'styled-components';
import Twitter from '../../../../assets/images/TwitterIcon.png';
import Discord from '../../../../assets/images/DiscordIcon.png';
import Opensea from '../../../../assets/images/OpenSeaIcon.png';

const SocialIcon = () => {
  return (
    <IconContainer>
      <Row>
      <a href="https://opensea.io/explore-collections" target="_blank" rel="noreferrer">
        <IconButton icon={<img src={Opensea} alt="Opensea" width="100%" height="100%"/>} />
      </a>
      </Row>
      <Row>
      <a href="https://twitter.com/catandmousenft" target="_blank" rel="noreferrer">
        <IconButton icon={<img src={Twitter} alt="Twitter" width="100%" height="100%" />} />
      </a>
      </Row>
      <Row>
      <a href="http://discord.gg/catandmousegame" target="_blank" rel="noreferrer">
        <IconButton icon={<img src={Discord} alt="Discord" width="100%" height="100%"/>} />
      </a>
      </Row>
    </IconContainer>
  );
};

export default SocialIcon;

const IconButton = styled(Button)`
  color: #fff;
  width: 48px;
  height: 48px;
  background: transparent;
  margin: 5px 0;
  border: none;
  box-shadow: none;
  @media (max-width: 1368px) {
    width: 42px;
    height: 42px;
  }
  @media (max-width: 1200px) {
    width: 36px;
    height: 36px;
  }
  @media (max-width: 992px) {
    width: 30px;
    height: 30px;
  }
  @media (max-width: 832px) {
    width: 30px;
    height: 30px;
  }
`;

const IconContainer = styled.div`
  padding-left: 30px;
  max-width: 40px;
  @media (max-width: 1368px) { 
    top: 40px;
  }
  @media (max-width: 1200px) {
    top: 36px;
  }
  @media (max-width: 992px) {
    top: 21px;
  }
  @media (max-width: 832px) {
    top: 46px;
  }
`;
