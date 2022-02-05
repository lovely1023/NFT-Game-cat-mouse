

import React from 'react';

import { Row, Button } from 'antd';
import styled from 'styled-components';
import background from '../../../../assets/images/StatsBox.png';
import { Typography, Text } from '../../../../components/Typography';
import track from '../../../../assets/images/UnstakedBoxes/ScrollBar.png';
import thumb from '../../../../assets/images/UnstakedBoxes/ScrollTab.png';

const Stats = ({ data }: any) => {
  return (
    <Wrapper>
      <Typography className="noneshadow primary spantitle">STATS</Typography>
      <Wrapper2>
        {
          false && data?.totalStolenByCat && (
              <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
                <Text>Total Cheddar Claimed: </Text>
                <Text className="secondary noneshadow">{data.totalStolenByCat}</Text>
              </Typography>
          )
        }
        {
          false && data?.totalStolenByCat && (
              <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
                <Text>Total Cheddar Burned: </Text>
                <Text className="secondary noneshadow">{data.totalStolenByCat}</Text>
              </Typography>
          )
        }
        {
          false && data?.totalStolenByCat && (
              <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
                <Text>Total Mice Stolen by Cats :</Text>
                <Text className="secondary noneshadow">{data.totalStolenByCat}</Text>
              </Typography>
          )
        }
        {
          false && data?.totalStolenByCrazyCat && (
              <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
                <Text>Total Houses Stolen by Cat Ladies :</Text>
                <Text className="secondary noneshadow">{data.totalStolenByCrazyCat}</Text>
              </Typography>
          )
        }
        {
          data?.mouseMinted && (
              <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
                <Text>Total Mice Minted :</Text>
                <Text className="secondary noneshadow">{data.mouseMinted}</Text>
              </Typography>
          )
        }
        {
          data?.catMinted && (
              <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
                <Text>Total Cats Minted :</Text> <Text className="secondary noneshadow">{data.catMinted}</Text>
              </Typography>
          )
        }
        {
          data?.crazyCatLadyMinted && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Cat Ladies Minted :</Text> <Text className="secondary noneshadow">{data.crazyCatLadyMinted}</Text>
            </Typography>
          )
        }
        {
          data?.mouseStolen && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Mice Stolen :</Text> <Text className="secondary noneshadow">{data.mouseStolen}</Text>
            </Typography>
          )
        }
        {
          data?.catStolen && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Cats Stolen :</Text> <Text className="secondary noneshadow">{data.catStolen}</Text>
            </Typography>
          )
        }
        {
          data?.crazyCatLadyStolen && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Cat Ladies Stolen :</Text> <Text className="secondary noneshadow">{data.crazyCatLadyStolen}</Text>
            </Typography>
          )
        }
        {
          data?.mouseBurned && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Mice Burned :</Text> <Text className="secondary noneshadow">{data.mouseBurned}</Text>
            </Typography>
          )
        }
        {
          data?.catBurned && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Cats Burned :</Text> <Text className="secondary noneshadow">{data.catBurned}</Text>
            </Typography>
          )
        }
        {
          data?.crazyCatLadyBurned && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Cat Ladies Burned :</Text> <Text className="secondary noneshadow">{data.crazyCatLadyBurned}</Text>
            </Typography>
          )
        }
        {
          data?.mouseStaked && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Mice Staked :</Text> <Text className="secondary noneshadow">{data.mouseStaked}</Text>
            </Typography>
          )
        }
        {
          data?.catStaked && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Cats Staked :</Text> <Text className="secondary noneshadow">{data.catStaked}</Text>
            </Typography>
          )
        }
        {
          data?.crazyCatLadyStaked && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Cat Ladies Staked :</Text> <Text className="secondary noneshadow">{data.crazyCatLadyStaked}</Text>
            </Typography>
          )
        }
        {
          data?.shackMinted && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Shacks Minted :</Text> <Text className="secondary noneshadow">{data.shackMinted}</Text>
            </Typography>
          )
        }
        {
          data?.ranchMinted && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Ranches Minted :</Text> <Text className="secondary noneshadow">{data.ranchMinted}</Text>
            </Typography>
          )
        }
        {
          data?.mansionMinted && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Mansions Minted :</Text> <Text className="secondary noneshadow">{data.mansionMinted}</Text>
            </Typography>
          )
        }
        {
          data?.shackStaked && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Shacks Staked :</Text> <Text className="secondary noneshadow">{data.shackStaked}</Text>
            </Typography>
          )
        }
        {
          data?.ranchStaked && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Ranches Staked :</Text> <Text className="secondary noneshadow">{data.ranchStaked}</Text>
            </Typography>
          )
        }
        {
          data?.mansionStaked && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Mansions Staked :</Text> <Text className="secondary noneshadow">{data.mansionStaked}</Text>
            </Typography>
          )
        }
        {
          data?.shackStolen && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Shacks Stolen :</Text> <Text className="secondary noneshadow">{data.shackStolen}</Text>
            </Typography>
          )
        }
        {
          data?.ranchStolen && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Ranches Stolen :</Text> <Text className="secondary noneshadow">{data.ranchStolen}</Text>
            </Typography>
          )
        }
        {
          data?.mansionStolen && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Mansions Stolen :</Text> <Text className="secondary noneshadow">{data.mansionStolen}</Text>
            </Typography>
          )
        }
        {
          data?.shackBurned && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Shacks Burned :</Text> <Text className="secondary noneshadow">{data.shackBurned}</Text>
            </Typography>
          )
        }
        {
          data?.ranchBurned && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Ranches Burned :</Text> <Text className="secondary noneshadow">{data.ranchBurned}</Text>
            </Typography>
          )
        }
        {
          data?.mansionBurned && (
            <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
              <Text>Total Mansions Burned :</Text> <Text className="secondary noneshadow">{data.mansionBurned}</Text>
            </Typography>
          )
        }
      </Wrapper2>
    </Wrapper>
  );
};

export default Stats;

const Wrapper = styled.div`
background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 40px 28px 15px 28px;
  font-size: 20px;
  width: 100%;
  height: 460px;
`;

const Wrapper2 = styled.div`
width: 100%;
height: 85%;
overflow-y: auto;
position: relative;
z-index: 1;
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-thumb:hover {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
}
`;