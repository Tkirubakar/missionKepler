import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import styles from "./MovieDetails.module.css";
import ImagePlaceholder from "../../components/common/ImagePlaceholder/ImagePlaceholder";
import { MovieContext } from "../../context/MovieContext";
import withAdvertisement from "../../components/HOC/withAdvertisement";
import { IoThumbsUpSharp } from "react-icons/io5";

function Details({ movie }) {
  const { state, incrementLike } = useContext(MovieContext);
  const likes = state.likesMap[movie.id] ?? movie.likes ?? 0;

  const [isPosterLoaded, setPosterLoaded] = useState(false);
  const [isPosterError, setPosterError] = useState(false);

  const posterUrl =
    movie.imgUrl ||
    "/assets/defaultPoster.jpg";

  return (
    <div className={styles.detailsCard}>
    <div className={styles.headerSection}>
        <div className={styles.titleCardSection}>   
        <h1 className={styles.title}>{movie.name}</h1>
        <div className={styles.likes}>{likes} Likes</div>
        </div>
        <div className={styles.likeBtn}>
            <div className={styles.likeRow}>
                <button
                onClick={() => incrementLike(movie.id)}
                className={styles.likeAction}
                >
                <IoThumbsUpSharp />
                </button>
            </div>
        </div>
    </div>
      <div>
        <div className={styles.poster}>
          {!isPosterLoaded && !isPosterError && (
            <ImagePlaceholder width={180} height={260} />
          )}

          <img
            src={posterUrl}
            alt={movie.name}
            className={styles.posterImage}
            onLoad={() => setPosterLoaded(true)}
            onError={() => setPosterError(true)}
            style={{ display: isPosterLoaded ? "block" : "none" }}
            decoding="async"
          />

          {isPosterError && <ImagePlaceholder width={180} height={260} />}
        </div>

        <div style={{ flex: 1 }}>
          <div className={styles.description}>
            {movie.synopsis ?? movie.description ?? "No description available."}
          </div>



          <div className={styles.actorsTitle}>Actors</div>
          <ul className={styles.actorsList}>
            {(Array.isArray(movie.actors) ? movie.actors : []).map(
              (actorName) => (
                <li key={actorName}>{actorName}</li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

Details.propTypes = { movie: PropTypes.object.isRequired };

export default withAdvertisement(Details, {
  showAdAfterMs: 5000,
  adDurationMs: 5000,
  adImages: ["../../../ad2.jpg", "../../../ad1.jpg"]
});