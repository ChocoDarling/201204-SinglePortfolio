import React, { useEffect } from 'react';

let loadYT;
function Player({ videoId, width, height, youtubeList }) {
  let player;

  function onPlayerStateChange(e) {
    let checkingMove;
    if (-1 < e.data && e.data < 5) {
      checkingMove = setInterval(() => {
        if (youtubeList.dataset.state === 'stop' && checkingMove) {
          player.stopVideo();
          clearInterval(checkingMove);
        }
      }, 100);
    }
  }

  useEffect(() => {
    if (!loadYT) {
      loadYT = new Promise((resolve) => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      });
    }
    loadYT.then((YT) => {
      player = new YT.Player(videoId, {
        width: width || 800,
        height: height || 450,
        videoId: videoId,
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    });
    return () => {
      player.destroy();
    };
  });

  return (
    <div className={videoId}>
      <div id={videoId}></div>
    </div>
  );
}

export default Player;
