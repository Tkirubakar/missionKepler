import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import styles from "./MovieCard.module.css";
import ImagePlaceholder from "../../components/common/ImagePlaceholder/ImagePlaceholder";
import { MovieContext } from "../../context/MovieContext";
import { IoThumbsUpSharp } from "react-icons/io5";

export default function MovieCard({ movie, onSelect }) {
  const { state, incrementLike } = useContext(MovieContext);

  const likes = state.likesMap[movie.id] ?? movie.likes ?? 0;

  const [isImageLoaded, setImageLoaded] = useState(false);
  const [isError, setImageError] = useState(false);

  const posterUrl =
    movie.imgUrl ||
    "/assets/defaultPoster.jpg"; 

  return (
    <div className={styles.card}>
      <div className={styles.thumb} onClick={onSelect}>
        
        {!isImageLoaded && !isError && (
          <ImagePlaceholder width="100%" height={240} />
        )}

        <img
          src={posterUrl}
          alt={movie.name}
          className={styles.posterImage}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          style={{ display: isImageLoaded ? "block" : "none" }}
        />

        {isError && (
          <ImagePlaceholder width="100%" height={240} />
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.movieTitle}>
            <div className={styles.title}>{movie.name}</div>
            <span className={styles.likeArea}>{likes} Likes</span>
        </div>
        <div className={styles.meta}>
          <button
            className={styles.likeBtn}
            onClick={(e) => {
              e.stopPropagation();
              incrementLike(movie.id);
            }}
          >
            <IoThumbsUpSharp />
          </button>
        </div>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
};