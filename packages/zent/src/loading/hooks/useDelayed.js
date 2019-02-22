import { useState, useEffect } from 'react';

export default function useDelayed({ loading, delay }) {
  const [delayed, setDelayed] = useState(true);

  useEffect(() => {
    const shouldDelay = delay && delay > 0;

    if (loading && shouldDelay) {
      setDelayed(true);
      const timerId = setTimeout(() => setDelayed(false), delay);
      return () => clearTimeout(timerId);
    }

    setDelayed(shouldDelay);
  }, [loading, delay]);

  return delayed;
}
