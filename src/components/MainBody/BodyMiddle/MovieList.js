import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getBoxOffice } from '../../../lib/MovieInfo';
import Button from '../../Button';

const MovieListBox = styled.div`
  width: 100%;
  > div:last-child {
    position: relative;
    width: 80%;
    margin: auto;
  }
`;

const ListBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const PosterItem = styled.div`
  display: inline-block;
  margin: 5px;
  width: 110px;
  height: 157px;
  flex-shrink: 0;
  img {
    width: 110px;
    height: 157px;
  }
`;

function getDay(count) {
  let date = new Date();
  date.setTime(date.getTime() + parseInt(count) * 24 * 60 * 60 * 1000);
  const year = date.getFullYear();
  const month = ('0' + (1 + date.getMonth())).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  date = null;
  return year + month + day;
}

function MovieList({ listName, searchKey }) {
  const [movieArr, setMovieArr] = useState([]);

  useEffect(async () => {
    console.log(listName + ' 영화 목록 등록');
    if (movieArr.length === 0) {
      let tempDay = -1;
      if (searchKey === 'weekly') tempDay = -7;
      setMovieArr(await getBoxOffice(getDay(tempDay), searchKey));
    }
  }, [listName]);

  function buttonClick(e, arrow) {
    console.log(movieArr);
    const elem = e.target.parentNode.parentNode.querySelector('.list-box');
    let plus = -1;
    if (arrow) plus = 1;
    elem.scrollTo({
      left: 120 * plus + elem.scrollLeft,
      behavior: 'smooth',
    });
  }

  return (
    <MovieListBox>
      <div>
        <div className="list-font">{listName}</div>
      </div>
      <div>
        <Button
          onClick={(e) => {
            buttonClick(e, false);
          }}
        />
        <ListBox className="list-box" data-now-index="0">
          {movieArr.map((v) => (
            <PosterItem key={v.movieCd}>
              <Link key={v.movieCd} to={v.linkTo}>
                <img
                  src={v.poster}
                  alt={v.movieNm}
                  onClick={() => {
                    document.querySelector('.youtube-list').dataset.state =
                      'play';
                  }}
                />
              </Link>
            </PosterItem>
          ))}
        </ListBox>
        <Button
          right
          onClick={(e) => {
            buttonClick(e, true);
          }}
        />
      </div>
    </MovieListBox>
  );
}

export default MovieList;
