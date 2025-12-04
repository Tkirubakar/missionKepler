import React, { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import styles from "./NowShowing.module.css";

export default function NowShowing() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.kicker}>NOW SHOWING</div>
      <div className={styles.title}>Sintel</div>

      <div className={styles.playerWrapper}>

        <video
          ref={videoRef}
          width="100%"
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          controls={isPlaying} 
          onPause={() => setIsPlaying(false)}
        />

        {!isPlaying && (
          <button
            className={styles.playButton}
            onClick={handlePlay}
            aria-label="Play Video"
          >
            <FaPlay />
          </button>
        )}

      </div>

      <div className={styles.description}>
        Sintel tells the story of a friendship between a girl sintel,
        a baby dragon and the desperate lengths she will go to when that
        friendship is taken from her. Sintel is created by Blender in 2010
        as a pet project to demonstrate Blender capabilities.
      </div>
    </div>
  );
}
