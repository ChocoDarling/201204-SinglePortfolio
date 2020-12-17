import React, { useEffect, useState } from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import MainBody from '../components/MainBody';

function MainPage({ match, history }) {
  const [movieNm, setMovieNm] = useState('이웃사촌');
  useEffect(() => {
    if (match.params.movieNm && match.params.movieNm !== 'auth') {
      setMovieNm(match.params.movieNm);
      match.params = {};
      history.push('/');
      return;
    }
  });
  return (
    <>
      <HeaderContainer movieNm={movieNm} />
      <MainBody movieNm={movieNm} />
    </>
  );
}

export default MainPage;
