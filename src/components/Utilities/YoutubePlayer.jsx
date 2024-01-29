'use client';

import YouTube from 'react-youtube';
import { IoIosCloseCircle } from 'react-icons/io';
import { useState } from 'react';

const YoutubePlayer = ({ youtubeId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const opts = {
    height: '300',
    width: '380',
  };
  const onPlayerReady = (event) => {
    event.target.pauseVideo();
  };

  const handlePlayerTrailer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const Player = () => {
    return (
      <div className="fixed bottom-0 right-0">
        <button
          className="text-color-primary"
          onClick={handlePlayerTrailer}
        >
          <IoIosCloseCircle size={28} />
        </button>
        <YouTube
          opts={opts}
          videoId={youtubeId}
          onReady={onPlayerReady}
        />
      </div>
    );
  };

  const ButtonShowTrailer = () => {
    return (
      <div className="fixed bottom-0 right-0 bg-color-accent px-4 py-1 rounded">
        <button
          className="text-color-primary"
          onClick={handlePlayerTrailer}
        >
          <p className="text-color-dark font-bold">Show Trailer</p>
        </button>
      </div>
    );
  };
  return <>{isOpen ? <Player /> : <ButtonShowTrailer />}</>;
};

export default YoutubePlayer;
