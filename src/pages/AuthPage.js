import React from 'react';
import Auth from '../components/Auth';

function AuthPage({ match, history }) {
  return (
    <>
      <Auth state={match.params.state} history={history} />
    </>
  );
}

export default AuthPage;
