import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RegisterForm, LoginForm } from '../../containers/FormContainer';

const AuthBox = styled.div`
  position: fixed;
  z-index: 5000;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: default;
`;

function Auth({ state, history }) {
  if (state !== 'register' && state !== 'login') {
    history.push('/');
  }

  useEffect(() => {
    function handleWheel(e) {
      e.preventDefault();
    }
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  });

  return (
    <AuthBox
      className="center-item"
      onClick={() => {
        history.push('/');
      }}
    >
      {state === 'login' ? (
        <LoginForm state={state} history={history} />
      ) : (
        <RegisterForm state={state} history={history} />
      )}
    </AuthBox>
  );
}

export default Auth;
