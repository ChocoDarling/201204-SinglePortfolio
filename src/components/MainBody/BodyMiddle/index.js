import React from 'react';
import styled from 'styled-components';
import MovieList from './MovieList';

function BodyMiddle() {
  return (
    <div className="inner">
      <MovieList listName="Daily BoxOffice" searchKey="daily"></MovieList>
      <MovieList listName="Weekly BoxOffice" searchKey="weekly"></MovieList>
    </div>
  );
}

export default BodyMiddle;
