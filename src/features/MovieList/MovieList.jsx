import React, { useContext } from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import { MovieContext } from "../../context/MovieContext";


export default function MovieList({ movies, visibleCount = Infinity }) {
  const { selectMovie } = useContext(MovieContext);

  const safeMovies = Array.isArray(movies) ? movies : [];

  const toRender = safeMovies.slice(0, Number.isFinite(visibleCount) ? visibleCount : safeMovies.length);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
      {toRender.map((movieItem) => (
        <MovieCard key={movieItem.id} movie={movieItem} onSelect={() => selectMovie(movieItem.id)} />
      ))}
    </div>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  visibleCount: PropTypes.number
};
