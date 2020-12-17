import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getMovieYoutube } from '../../../lib/MovieInfo';
import Youtube from './Youtube';
import Button from '../../Button';
import bannerBackground from '../../../images/main/banner-background.png';
import BackgroundImageSide from '../../../images/main/banner-side.png';

const YOUTUBE_CLASSNAME = ['pre', 'now', 'next'];

const BodyTopBox = styled.div`
  height: 450px;
  width: 100%;
  background-image: url(${bannerBackground});
  > div {
    position: relative;
    width: 800px;
  }
`;

const YoutubeBox = styled.div`
  z-index: 1000;
  position: relative;
  top: 0;
  width: 800px;
  height: 450px;
  margin: auto;
  overflow-x: hidden;
  &::before,
  &::after {
    z-index: 1100;
    content: '';
    width: 4px;
    height: 100%;
    position: absolute;
    top: 0;
    background-image: url(${BackgroundImageSide});
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
    transform: scaleX(-1);
  }
  > div {
    height: 450px;
    overflow-y: hidden;
    width: max-content;
  }
`;

const YoutubeItemBox = styled.div`
  z-index: 1010;
  width: 800px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  transition: all 1s;
  &.pre,
  &.now,
  &.next {
    z-index: 1050;
  }
  &.pre {
    left: -800px;
  }
  &.now {
    left: 0;
  }
  &.next {
    left: 800px;
  }
`;

function BodyTop(props) {
  const [youtubeIdArr, setYoutubeIdArr] = useState([]);
  const [nowList, setNowList] = useState([]);
  const [youtubeArr, setYoutubeArr] = useState([]);
  const [movieNm, setMovieNm] = useState();
  const [nowIndex, setNowIndex] = useState(0);
  const youtubeList = React.createRef();

  useEffect(async () => {
    if (movieNm !== props.movieNm) {
      setMovieNm(props.movieNm);
      setNowIndex(0);
      setYoutubeIdArr([]);
    } else if (youtubeIdArr.length === 0) {
      try {
        if (movieNm) {
          setYoutubeIdArr(await getMovieYoutube(movieNm));
          setNowList([]);
        }
      } catch (error) {}
    } else if (nowList.length === 0) {
      setNowList([
        youtubeIdArr[
          (nowIndex - 1 + youtubeIdArr.length) % youtubeIdArr.length
        ],
        youtubeIdArr[nowIndex],
        youtubeIdArr[(nowIndex + 1) % youtubeIdArr.length],
      ]);
    } else if (
      nowList.length &&
      [...document.querySelectorAll('.youtube-items.now div')].length &&
      nowList.indexOf(
        document.querySelector('.youtube-items.now div').className,
      ) < 0
    ) {
      setYoutubeArr([]);
    } else if (youtubeArr.length === 0) {
      setYoutubeArr(
        nowList.map((v, i) => (
          <YoutubeItemBox
            key={`${i}_${v}`}
            className={`youtube-items ${YOUTUBE_CLASSNAME[i]}`}
          >
            <Youtube youtubeList={youtubeList.current} key={v} videoId={v} />
          </YoutubeItemBox>
        )),
      );
    } else if (
      nowList[1] !==
      document.querySelectorAll('.youtube-items div')[1].className
    ) {
      const nowIndexIdx = nowList.indexOf(
        document.querySelectorAll('.youtube-items div')[1].className,
      );
      let startNowIndex;
      let plusIndex;
      let inputIndex;
      switch (nowIndexIdx) {
        case 0:
          startNowIndex = 1;
          plusIndex = -1;
          inputIndex = 2;
          setYoutubeArr([
            ...youtubeArr.slice(startNowIndex, startNowIndex + 2),
            <YoutubeItemBox
              key={`${inputIndex}_${nowList[inputIndex]}`}
              className={`youtube-items ${YOUTUBE_CLASSNAME[inputIndex]}`}
            >
              <Youtube
                youtubeList={youtubeList.current}
                key={nowList[inputIndex]}
                videoId={nowList[inputIndex]}
              />
            </YoutubeItemBox>,
          ]);
          break;
        case 2:
          startNowIndex = 0;
          plusIndex = 1;
          inputIndex = 0;
          setYoutubeArr([
            <YoutubeItemBox
              key={`${inputIndex}_${nowList[inputIndex]}`}
              className={`youtube-items ${YOUTUBE_CLASSNAME[inputIndex]}`}
            >
              <Youtube
                youtubeList={youtubeList.current}
                key={nowList[inputIndex]}
                videoId={nowList[inputIndex]}
              />
            </YoutubeItemBox>,
            ...youtubeArr.slice(startNowIndex, startNowIndex + 2),
          ]);
          break;
      }
      for (
        let i = startNowIndex,
          Arr = [...document.querySelectorAll('.youtube-items')];
        i < startNowIndex + 2;
        i++
      ) {
        Arr[i].classList.remove(YOUTUBE_CLASSNAME[i]);
        Arr[i].classList.add(YOUTUBE_CLASSNAME[i + plusIndex]);
      }
    }
  });

  function _onClick(next, e) {
    e.preventDefault();
    youtubeList.current.dataset.state = 'stop';
    e.target.style.visibility = 'hidden';
    setTimeout(
      function (youtubeList) {
        e.target.style.visibility = 'visible';
        youtubeList.dataset.state = 'play';
      }.bind(this, youtubeList.current),
      1000,
    );
    setNowList([]);
    if (next) {
      setNowIndex((nowIndex + 1) % youtubeIdArr.length);
    } else {
      setNowIndex((nowIndex - 1 + youtubeIdArr.length) % youtubeIdArr.length);
    }
  }
  return (
    <BodyTopBox>
      <div className="inner">
        <Button className="center-item" onClick={(e) => _onClick(false, e)} />
        <YoutubeBox
          ref={youtubeList}
          className="youtube-list"
          data-state="play"
        >
          {youtubeArr}
        </YoutubeBox>
        <Button
          right
          className="center-item"
          onClick={(e) => _onClick(true, e)}
        />
      </div>
    </BodyTopBox>
  );
}

export default BodyTop;
