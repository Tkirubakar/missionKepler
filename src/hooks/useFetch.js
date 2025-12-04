import { useState, useCallback } from "react";

export default function useFetch(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(fetcher));
  const [error, setError] = useState(null);

  const reload = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetcher(...args);
      setData(res);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, [fetcher]);

  return { data, loading, error, reload };
}
