import React from 'react';
import styled from 'styled-components';
import HeaderBody from './HeaderBody';
import topBackground from '../../images/header/top-background.png';

const HeaderBox = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  background-image: url(${topBackground});
  &.stop {
    position: fixed;
  }
`;

function Header({ movieNm, user, onLogout }) {
  return (
    <HeaderBox id="header" data-scrolly="0">
      <HeaderBody movieNm={movieNm} user={user} onLogout={onLogout} />
    </HeaderBox>
  );
}

export default Header;
