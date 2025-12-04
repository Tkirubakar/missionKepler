import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import styles from "./AllMovies.module.css";
import { MovieService } from "../../services/MovieService";
import { MovieContext } from "../../context/MovieContext";
import MovieList from "../../features/MovieList/MovieList";
import MovieDetails from "../../features/MovieDetails/MovieDetails";
import Button from "../../components/common/Button/Button";

export default function AllMovies() {
  const { state, setMovies, selectMovie } = useContext(MovieContext);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [visibleCount, setVisibleCount] = useState(6);
  const [revealedAllLoaded, setRevealedAllLoaded] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  const pageSizeRef = useRef(null); 
  const mountedRef = useRef(true);

  const toArray = (resp) => {
    if (!resp) return [];
    if (Array.isArray(resp)) return resp;
    if (Array.isArray(resp?.data)) return resp.data;
    return [];
  };

  useEffect(() => {
    mountedRef.current = true;
    (async () => {
      setLoading(true);
      setErrorMsg(null);

      try {
        const response = await MovieService.getMovies(1);
        const moviesArray = toArray(response);

        if (!mountedRef.current) return;

        if (pageSizeRef.current === null) {
          pageSizeRef.current = moviesArray.length;
        }

        if (pageSizeRef.current === 0 || moviesArray.length < pageSizeRef.current) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        setMovies(moviesArray, 1);
      } catch (err) {
        if (!mountedRef.current) return;
        setErrorMsg("Failed to load movies. Try again later.");
        setMovies([], 1);
        setHasMore(false);
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    })();

    return () => {
      mountedRef.current = false;
    };
  }, [setMovies]);

  const selectedMovie = useMemo(() => {
    if (!Array.isArray(state?.movies) || state.movies.length === 0) return null;
    const found = state.movies.find((m) => m.id === state.selectedMovieId);
    return found ?? state.movies[0];
  }, [state?.movies, state?.selectedMovieId]);

  useEffect(() => {
    if ((state?.selectedMovieId === undefined || state?.selectedMovieId === null) && Array.isArray(state?.movies) && state.movies.length > 0) {
      selectMovie(state.movies[0].id);
    }
  }, [state?.movies, state?.selectedMovieId, selectMovie]);

  const handleLoadMore = async () => {
    const totalLoaded = Array.isArray(state?.movies) ? state.movies.length : 0;

    if (totalLoaded > visibleCount) {
      setVisibleCount(totalLoaded);
      setRevealedAllLoaded(true);
      return;
    }

    if (!hasMore) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const nextPage = (state?.page ?? 0) + 1;
      const response = await MovieService.getMovies(nextPage);
      const moviesArray = toArray(response);

      if (pageSizeRef.current === null) {
        pageSizeRef.current = moviesArray.length;
      }

      setMovies(moviesArray, nextPage);

      if (moviesArray.length === 0) {
        setHasMore(false);
      } else if (pageSizeRef.current === 0) {
        setHasMore(false);
      } else if (moviesArray.length < pageSizeRef.current) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setVisibleCount((prev) => {
        const added = Array.isArray(moviesArray) ? moviesArray.length : 0;
        return Math.max(prev, prev + added);
      });

      setRevealedAllLoaded(true);
    } catch (err) {
      setErrorMsg("Could not load more movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!revealedAllLoaded) {
      setVisibleCount(6);
    } else {
      setVisibleCount(Array.isArray(state?.movies) ? state.movies.length : 6);
    }
  }, [state?.movies, revealedAllLoaded]);

  const totalLoaded = Array.isArray(state?.movies) ? state.movies.length : 0;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.headerRow}>
          <h2>All Movies</h2>
        </div>

        {loading && <div className={styles.info}>Loading movies...</div>}
        {errorMsg && <div className={styles.error}>{errorMsg}</div>}

        {!loading && totalLoaded === 0 && <div className={styles.empty}>No movies available.</div>}

        {totalLoaded > 0 && <MovieList movies={state.movies} visibleCount={visibleCount} />}

        {hasMore && (
          <div className={styles.loadMoreRow}>
            <Button onClick={handleLoadMore} disabled={loading}>
              {loading ? "LOADING..." : "LOAD MORE"}
            </Button>
          </div>
        )}
      </div>

      <div className={styles.right}>
        {selectedMovie ? <MovieDetails movie={selectedMovie} /> : <div className={styles.info}>Select a movie to see details</div>}
      </div>
    </div>
  );
}