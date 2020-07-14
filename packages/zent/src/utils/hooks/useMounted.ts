import { useRef, useEffect } from 'react';

/**
 * 返回一个ref对象，其中存放的值会在组件unmount时变更为false
 */
export function useMounted() {
  const ref = useRef(false);
  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  });
  return ref;
}
