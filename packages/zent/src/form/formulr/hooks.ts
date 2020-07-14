import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

export function useValue$<T>(value$: Observable<T>, initialValue: T) {
  const [value, setValue] = useState(initialValue);
  useEffect$(value$, value => {
    setValue(value);
  });
  return value;
}

export function useEffect$<T>(event$: Observable<T>, effect: (e: T) => void) {
  useEffect(() => {
    const $ = event$.subscribe(effect);
    return () => $.unsubscribe();
    /** ignore effect function */
  }, [event$]); // eslint-disable-line react-hooks/exhaustive-deps
}
