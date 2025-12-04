import React, { useEffect, useRef, useState } from "react";
import { MovieService } from "../../services/MovieService";
import { FaPlay } from "react-icons/fa";
import styles from "./Teasers.module.css";

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const AD_IMAGES = ["/AdvertisementSmall1.png", "/AdvertisementSmall2.png"];
const PRE_AD_SECONDS = 5;
const AD_DURATION_SECONDS = 2;

export default function Teasers() {
  const [teaserList, setTeaserList] = useState([]);
  const [uiStateMap, setUiStateMap] = useState({});
  const videoRefMap = useRef({});
  const timerMap = useRef({});
  const lastAdIndexRef = useRef(-1);


  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await MovieService.getShortTeasers();
        const array = Array.isArray(res) ? res : res?.data ?? [];

        const mapped = array.map((item, idx) => ({
          teaserId: slugify(item.movieName ?? item.title ?? `teaser-${idx + 1}`),
          title: item.movieName ?? item.title,
          videoUrl: item.videoUrl,
          thumbnailUrl: `/teaser-${idx + 1}.jpg`
        }));

        if (mounted) setTeaserList(mapped);
      } catch {
        if (!mounted) return;
        setTeaserList([
          { teaserId: "local-1", title: "The Mountain Climber", videoUrl: "/assets/teaser1.mp4", thumbnailUrl: "/teaser1.jpg" },
          { teaserId: "local-2", title: "The Lost Rail", videoUrl: "/assets/teaser2.mp4", thumbnailUrl: "/teaser2.jpg" },
          { teaserId: "local-3", title: "The Long Ride", videoUrl: "/assets/teaser3.mp4", thumbnailUrl: "/teaser3.jpg" }
        ]);
      }
    })();
    return () => { mounted = false; };
  }, []);


  const updateUi = (id, patch) =>
    setUiStateMap(prev => ({
      ...prev,
      [id]: { ...(prev[id] || {}), ...patch }
    }));

  const clearTimers = (id) => {
    const t = timerMap.current[id];
    if (!t) return;

    clearTimeout(t.pauseTimeout);
    clearInterval(t.preInterval);
    clearInterval(t.adInterval);

    timerMap.current[id] = {};
  };


  const handlePlay = (id) => {
    clearTimers(id);

    updateUi(id, {
      isPlaying: true,
      secondsToAd: PRE_AD_SECONDS,
      adActive: false,
      adSecondsLeft: 0,
      currentAdIndex: -1
    });

    timerMap.current[id] = {};

    let remaining = PRE_AD_SECONDS;
    timerMap.current[id].preInterval = setInterval(() => {
      remaining -= 1;
      updateUi(id, { secondsToAd: remaining });

      if (remaining <= 0) {
        clearInterval(timerMap.current[id].preInterval);
      }
    }, 1000);

    timerMap.current[id].pauseTimeout = setTimeout(() => {
      const v = videoRefMap.current[id];
      v?.pause();

      const nextIndex = (lastAdIndexRef.current + 1) % AD_IMAGES.length;
      lastAdIndexRef.current = nextIndex;

      updateUi(id, {
        adActive: true,
        adSecondsLeft: AD_DURATION_SECONDS,
        currentAdIndex: nextIndex,
        isPlaying: false
      });

      let adRemaining = AD_DURATION_SECONDS;

      timerMap.current[id].adInterval = setInterval(() => {
        adRemaining -= 1;
        updateUi(id, { adSecondsLeft: adRemaining });

        if (adRemaining <= 0) {
          clearInterval(timerMap.current[id].adInterval);

          updateUi(id, {
            adActive: false,
            adSecondsLeft: 0,
            currentAdIndex: -1,
            isPlaying: true,
            secondsToAd: PRE_AD_SECONDS
          });

          v?.play();
        }
      }, 1000);
    }, PRE_AD_SECONDS * 1000);
  };

  return (
    <section className={styles.teasersSection}>
      <h2 className={styles.sectionHeading}>Short Teasers</h2>

      <div className={styles.grid}>
        {teaserList.map(item => {
          const ui = uiStateMap[item.teaserId] || {};

          return (
            <div key={item.teaserId} className={styles.card}>
              
              <div className={styles.mediaWrapper}>
                <video
                  ref={(el) => (videoRefMap.current[item.teaserId] = el)}
                  className={styles.video}
                  src={item.videoUrl}
                  poster={item.thumbnailUrl}
                  controls={!!ui.isPlaying}
                  onPlay={() => handlePlay(item.teaserId)}
                />

                {!ui.isPlaying && !ui.adActive && (
                  <button
                    className={styles.overlayPlay}
                    onClick={() => videoRefMap.current[item.teaserId].play()}
                  >
                    <FaPlay />
                  </button>
                )}

                {ui.adActive && (
                  <div className={styles.adFullOverlay}>
                    <img
                      src={AD_IMAGES[ui.currentAdIndex]}
                      className={styles.adFullImage}
                      alt="Advertisement"
                    />
                  </div>
                )}
              </div>

              <div className={styles.titleRow}>
                <div className={styles.titleText}>{item.title}</div>
              </div>

              <div className={styles.adRow}>
                {ui.adActive ? (
                  <div className={styles.adActive}>
                    Video Resumes in 00:{String(ui.adSecondsLeft).padStart(2, "0")}
                  </div>
                ) : ui.isPlaying ? (
                  <div className={styles.adNotice}>
                    Advertisement in 00:{String(ui.secondsToAd).padStart(2, "0")}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}