import React, { createContext, useCallback, useReducer } from "react";
import PropTypes from "prop-types";

export const MovieContext = createContext();

const initialState = {
  movies: [],
  page: 0,
  selectedMovieId: null,
  likesMap: {}
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_MOVIES": {
      const incomingMovies = Array.isArray(action.payload?.movies) ? action.payload.movies : [];
      const page = typeof action.payload?.page === "number" ? action.payload.page : state.page ?? 0;

      const existingMovies = Array.isArray(state.movies) ? state.movies : [];

      const mergedMap = {};

      const addToMap = (movieItem) => {
        if (!movieItem) return;
        const idKey = movieItem.id ?? movieItem.movieId ?? movieItem.teaserId ?? movieItem.title ?? JSON.stringify(movieItem);
        mergedMap[idKey] = { ...mergedMap[idKey], ...movieItem, id: idKey };
      };

      existingMovies.forEach(addToMap);
      incomingMovies.forEach(addToMap);

      const mergedArray = Object.values(mergedMap);

      const selectedMovieId = state.selectedMovieId ?? (mergedArray[0]?.id ?? null);

      return {
        ...state,
        movies: mergedArray,
        page,
        selectedMovieId
      };
    }

    case "SELECT_MOVIE": {
      return { ...state, selectedMovieId: action.payload };
    }

    case "INCREMENT_LIKE": {
      const movieId = action.payload;
      const prevLikes = state.likesMap?.[movieId] ?? state.movies.find((m) => m.id === movieId)?.likes ?? 0;
      return {
        ...state,
        likesMap: { ...(state.likesMap || {}), [movieId]: prevLikes + 1 }
      };
    }

    case "SYNC_LIKES": {
      const likesObj = typeof action.payload === "object" && action.payload ? action.payload : {};
      return { ...state, likesMap: { ...(state.likesMap || {}), ...likesObj } };
    }

    default:
      return state;
  }
}

export function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setMovies = useCallback((moviesArray, pageNumber = 1) => {
    const safeArray = Array.isArray(moviesArray) ? moviesArray : [];
    dispatch({ type: "SET_MOVIES", payload: { movies: safeArray, page: pageNumber } });
  }, []);

  const selectMovie = useCallback((movieId) => dispatch({ type: "SELECT_MOVIE", payload: movieId }), []);
  const incrementLike = useCallback((movieId) => dispatch({ type: "INCREMENT_LIKE", payload: movieId }), []);
  const syncLikes = useCallback((likesObject) => dispatch({ type: "SYNC_LIKES", payload: likesObject }), []);

  return (
    <MovieContext.Provider value={{ state, setMovies, selectMovie, incrementLike, syncLikes }}>
      {children}
    </MovieContext.Provider>
  );
}

MovieProvider.propTypes = { children: PropTypes.node };