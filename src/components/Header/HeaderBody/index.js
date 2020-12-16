import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HeaderBodyInner from './HeaderBodyInner';
import { RiLoginBoxLine, RiLogoutBoxLine } from 'react-icons/ri';

const HeaderBodyBox = styled.div`
  position: relative;
  height: 120px;
`;

function HeaderBody({ movieNm, user, onLogout }) {
  console.log(user);
  return (
    <HeaderBodyBox className="inner">
      <HeaderBodyInner>{movieNm ? movieNm : ''}</HeaderBodyInner>
      {user ? (
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '0',
            fontSize: '1.5em',
          }}
        >
          {user.username}님 어서오세요
          <div
            onClick={onLogout}
            style={{ display: 'inline-block', marginLeft: '10px' }}
          >
            <RiLogoutBoxLine />
          </div>
        </div>
      ) : (
        <>
          <Link to="/auth/login">
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '0',
                fontSize: '1.5em',
              }}
            >
              <RiLoginBoxLine />
            </div>
          </Link>
        </>
      )}
    </HeaderBodyBox>
  );
}

export default HeaderBody;
