import React from 'react';
import styled from 'styled-components';
import BodyTop from './BodyTop';
import BodyMiddle from './BodyMiddle';

const MainBodyBox = styled.div`
  position: relative;
  left: 0;
  top: 120px;
`;

function MainBody(props) {
  return (
    <MainBodyBox id="main-body">
      <BodyTop movieNm={props.movieNm} />
      <BodyMiddle></BodyMiddle>
    </MainBodyBox>
  );
}

export default MainBody;
