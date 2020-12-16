import React from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const ButtonBox = styled.div`
  z-index: 2000;
  position: absolute;
  width: ${(props) => props.width || '90px'};
  height: ${(props) => props.height || '90px'};
  top: calc((100% - ${(props) => props.height || '90px'}) / 2);
  > svg,
  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  > svg {
    fill: white;
    filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.5));
  }
  > div {
    visibility = visible;
    cursor: pointer;
  }
  :first-child {
    left: -90px;
  }
  :last-child {
    right: -90px;
  }
`;

function Button(props) {
  return (
    <ButtonBox width={props.width} height={props.height}>
      {props.right ? <IoIosArrowForward /> : <IoIosArrowBack />}
      <div onClick={props.onClick} />
    </ButtonBox>
  );
}

export default Button;
