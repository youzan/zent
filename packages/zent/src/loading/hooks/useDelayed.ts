import { useState, useEffect } from 'react';

export interface ILoadingUseDelayedParams {
  loading: boolean;
  delay: number;
}

export default function useDelayed({
  loading,
  delay,
}: ILoadingUseDelayedParams) {
  const [delayed, setDelayed] = useState(true);

  useEffect(() => {
    const shouldDelay = delay && delay > 0;

    if (loading && shouldDelay) {
      setDelayed(true);
      const timerId = setTimeout(() => setDelayed(false), delay);
      return () => clearTimeout(timerId);
    }

    setDelayed(shouldDelay);
    return null;
  }, [loading, delay]);

  return delayed;
}
