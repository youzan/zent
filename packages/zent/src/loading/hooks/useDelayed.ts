import { useState, useEffect } from 'react';

export interface ILoadingUseDelayedParams {
  loading: boolean;
  delay: number;
}

export default function useDelayed({
  loading,
  delay,
}: ILoadingUseDelayedParams) {
  const shouldDelay = !!(delay && delay > 0);
  const [delayed, setDelayed] = useState(shouldDelay);

  useEffect(() => {
    if (loading && shouldDelay) {
      setDelayed(true);
      const timerId = setTimeout(() => setDelayed(false), delay);
      return () => clearTimeout(timerId);
    }

    return setDelayed(shouldDelay);
  }, [loading, delay]);

  return delayed;
}
