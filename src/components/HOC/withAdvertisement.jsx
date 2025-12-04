import React, { useEffect, useRef, useState } from "react";
import styles from "../../features/MovieDetails/MovieDetails.module.css";

export default function withAdvertisement(WrappedComponent, options = {}) {
  const {
    showAdAfterMs = 15000,
    adDurationMs = 5000,
    adImages = [],
    movieKeySelector = (props) => props?.movie?.id ?? null
  } = options;

  const sec = (ms) => Math.floor(ms / 1000);
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  };

  return function WithAd(props) {
    const movieKey = movieKeySelector(props);

    const [showPre, setShowPre] = useState(false);
    const [preLeft, setPreLeft] = useState(sec(showAdAfterMs));

    const [showAd, setShowAd] = useState(false);
    const [adLeft, setAdLeft] = useState(sec(adDurationMs));
    const [currentAdSrc, setCurrentAdSrc] = useState(null);

    const timersRef = useRef({ preInterval: null, showTimeout: null, adInterval: null });
    const lastIndexRef = useRef(-1); 
    const preloadImgRef = useRef(null);

    const clearAll = () => {
      if (timersRef.current.preInterval) { clearInterval(timersRef.current.preInterval); timersRef.current.preInterval = null; }
      if (timersRef.current.showTimeout) { clearTimeout(timersRef.current.showTimeout); timersRef.current.showTimeout = null; }
      if (timersRef.current.adInterval) { clearInterval(timersRef.current.adInterval); timersRef.current.adInterval = null; }
      if (preloadImgRef.current) { preloadImgRef.current.onload = null; preloadImgRef.current.onerror = null; preloadImgRef.current = null; }
    };

    useEffect(() => {
      clearAll();
      setShowAd(false);
      setCurrentAdSrc(null);
      setAdLeft(sec(adDurationMs));
      setPreLeft(sec(showAdAfterMs));
      setShowPre(true);

      if (!Array.isArray(adImages) || adImages.length === 0 || movieKey == null) {
        setShowPre(false);
        return () => clearAll();
      }

      timersRef.current.preInterval = setInterval(() => {
        setPreLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timersRef.current.preInterval);
            timersRef.current.preInterval = null;
            setShowPre(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timersRef.current.showTimeout = setTimeout(() => {
        const nextIndex = (lastIndexRef.current + 1) % adImages.length;
        lastIndexRef.current = nextIndex;
        const src = adImages[nextIndex];

        const img = new Image();
        preloadImgRef.current = img;

        img.onload = () => {
          setCurrentAdSrc(src);
          setShowAd(true);
          setAdLeft(sec(adDurationMs));

          timersRef.current.adInterval = setInterval(() => {
            setAdLeft((prev) => {
              if (prev <= 1) {
                clearInterval(timersRef.current.adInterval);
                timersRef.current.adInterval = null;
                setShowAd(false);
                setCurrentAdSrc(null);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        };

        img.onerror = () => {
          setShowAd(false);
          setCurrentAdSrc(null);
        };

        img.src = src;
      }, showAdAfterMs);

      return () => {
        clearAll();
      };
    }, [movieKey]);

    if (showAd && currentAdSrc) {
      return (
        <div style={{ marginTop: 18 }}>
          <img src={currentAdSrc} alt="Advertisement" />
          <div className={styles.countDown}>Resume in {formatTime(adLeft)}</div>
        </div>
      );
    }

    return (
      <div className={styles.movieCountdown} style={{ position: "relative" }}>
        <WrappedComponent {...props} />

        {showPre && (
          <div className={styles.beforeCountDown}>
            Ad starting in {formatTime(preLeft)}
          </div>
        )}
      </div>
    );
  };
}
