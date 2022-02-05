
import React, {useState} from 'react';

import { Typography, Text } from '../../../../components/Typography';
import styled from 'styled-components';
import unselect from '../../../../assets/images/UnstakedBoxes/FilterToggle.png';
import select from '../../../../assets/images/UnstakedBoxes/FilterToggleOn.png';

const FilterElems = ({ addFilter, removeFilter, name }: any) => {
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    const toggle = !selected;
    toggle ? addFilter(name) : removeFilter(name);
    setSelected(toggle);
  };

  return (
    <Wrapper>
      <Typography
        className="primary center noneshadow lineheight"
        $size="14px"
        m="0 4px 0 0"
      >
        {name}
      </Typography>
      {selected ? (
        <img
          src={select}
          onClick={() => {
            handleClick();
          }}
          className="lineheight"
          alt="select"
          width="25px"
          height="25px"
        />
      ) : (
        <img
          src={unselect}
          onClick={() => {
            handleClick();
          }}
          className="lineheight"
          alt="select"
          width="25px"
          height="25px"
        />
      )}
    </Wrapper>
  );
};

export default FilterElems;

const Wrapper = styled.div`
    margin: 0 7px;
    display: flex;
    position: relative;
    z-index: 1;
    .lineheight {
        display: flex;
        line-height: 14px;
        text-align: right;
        cursor: pointer;
        align-items: center;
    }
`;