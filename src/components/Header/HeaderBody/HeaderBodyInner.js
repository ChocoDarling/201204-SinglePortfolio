import React from 'react';
import styled from 'styled-components';

const HeaderBodyInnerBox = styled.div`
  height: 100%;
`;

const MovieName = styled.div`
  height: 100%;
`;

function HeaderBodyInner({ children }) {
  return (
    <HeaderBodyInnerBox>
      <MovieName className="center-item">
        <div className="title-font">{children}</div>
      </MovieName>
    </HeaderBodyInnerBox>
  );
}

export default HeaderBodyInner;
