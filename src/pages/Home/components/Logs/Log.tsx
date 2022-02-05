import React from 'react';
import styled from 'styled-components';
import background from '../../../../assets/images/LogBox.png';
import {Text, Typography} from '../../../../components/Typography';
import track from '../../../../assets/images/UnstakedBoxes/ScrollBar.png';
import thumb from '../../../../assets/images/UnstakedBoxes/ScrollTab.png';
import moment from "moment"
import _ from "lodash"

const Logs = ({list}: any) => {
  return (
    <Wrapper>
      <Typography className="noneshadow third fontsize">LOG</Typography>
      <Wrapper2>
        {
          _.orderBy(list, 'time', ['desc']).map((l: any) => (
            <div key={l.id} className="col">
              <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
                <Text>{moment(l.time).fromNow()}</Text>
              </Typography>
              <Typography className="primary noneshadow center" m="25px 10px 7px 10px">
                <Text className="secondary noneshadow">{l.event}</Text>
              </Typography>
            </div>
          ))
        }
      </Wrapper2>
    </Wrapper>
  );
};

export default Logs;

const Wrapper = styled.div`
background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 40px 28px 15px 28px;
  width: 100%;
  height: 460px;
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