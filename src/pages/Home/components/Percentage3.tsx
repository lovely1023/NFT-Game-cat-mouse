import React from "react";

import { Row, Button } from "antd";
import styled from "styled-components";

const Percentage3 = ({ percentage, borderimage }: any) => {
  return (
    <Wrapper percent={percentage}>
      {borderimage ? (
        <>
          <Segment13 />
          <Segment26 />
          <Segment40 />
          <Segment20 className="noborder" />
        </>
      ) : (
        <>
          <Segment25 />
          <Segment50 />
          <Segment25 className="noborder" />
        </>
      )}
    </Wrapper>
  );
};

export default Percentage3;

const Wrapper = styled.div<{ percent: number }>`
  border: 4px solid #39221b;
  width: 100%;
  height: 54px;
  margin: 7px 0;
  display: flex;
  position: relative;
  z-index: 1;
  &:after {
    content: "";
    position: absolute;
    background: #ffa700;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    top: 0;
    bottom: 0;
    left: 0;
    width: ${(p: any) => p.percent}%;
  }
  .noborder {
    border-right: none !important;
  }
`;

const Segment13 = styled.div`
  width: 13.4%;
  height: 50px;
  align-items: center;
  position: relative;
  z-index: 2;
  border-right: 4px solid #39221b;
`;
const Segment26 = styled.div`
  width: 26.6%;
  height: 50px;
  align-items: center;
  position: relative;
  z-index: 2;
  border-right: 4px solid #39221b;
`;
const Segment20 = styled.div`
  width: 20%;
  height: 50px;
  align-items: center;
  position: relative;
  z-index: 2;
  border-right: 4px solid #39221b;
`;
const Segment25 = styled.div`
  width: 25%;
  height: 50px;
  align-items: center;
  position: relative;
  z-index: 2;
  border-right: 4px solid #39221b;
`;
const Segment40 = styled.div`
  width: 40%;
  height: 50px;
  align-items: center;
  position: relative;
  z-index: 2;
  border-right: 4px solid #39221b;
`;
const Segment50 = styled.div`
  width: 50%;
  height: 50px;
  align-items: center;
  position: relative;
  z-index: 2;
  border-right: 4px solid #39221b;
`;
