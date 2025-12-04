import { useRef, useEffect } from "react";

export default function useIntervalTimeout() {
  const timers = useRef([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  function set(fn, ms) {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }
  function clear(id) {
    clearTimeout(id);
    timers.current = timers.current.filter(t => t !== id);
  }
  return { set, clear };
}
