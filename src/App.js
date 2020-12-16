import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <>
      <Route path={['/:movieNm', '/']} component={MainPage} />
      <Route path="/auth/:state" component={AuthPage} exact />
    </>
  );
}

/*
로그인, footer 설명
*/

export default App;
