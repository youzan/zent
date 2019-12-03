import { CSSProperties } from 'react';

export default function createArrowPosition(x, y, side) {
  return {
    getCSSStyle(): CSSProperties {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
      };
    },

    name: `position-arrow-${side}`,
  };
}
