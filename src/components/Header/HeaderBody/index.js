import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HeaderBodyInner from './HeaderBodyInner';
import { RiLoginBoxLine, RiLogoutBoxLine } from 'react-icons/ri';

const HeaderBodyBox = styled.div`
  position: relative;
  height: 120px;
  div.login-box {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 28px;
    right: 0;
    svg {
      font-size: 64px;
    }
    > div {
      display: inline-flex;
      flex-direction: column;
      margin-left: 10px;
      text-align: right;
      height: 64px;
      align-items: flex-end;
      > p {
        font-size: 24px;
      }
    }
  }
`;

function HeaderBody({ movieNm, user, onLogout }) {
  return (
    <HeaderBodyBox className="inner">
      <HeaderBodyInner>{movieNm ? movieNm : ''}</HeaderBodyInner>
      {user ? (
        <div className="login-box">
          <div>
            <p>{user.name} 님</p>
            <p>어서오세요</p>
          </div>
          <div onClick={onLogout}>
            <RiLogoutBoxLine />
          </div>
        </div>
      ) : (
        <>
          <Link to="/auth/login">
            <div className="login-box">
              <RiLoginBoxLine />
            </div>
          </Link>
        </>
      )}
    </HeaderBodyBox>
  );
}

export default HeaderBody;
