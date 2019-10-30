import { CSSProperties } from 'react';

// FIXME: these values and css variables in pop.scss are interrelated
export const ARROW_OFFSET_H = 15;
export const ARROW_OFFSET_V = 9;

export const createPosition = (x, y, side) => {
  return {
    getCSSStyle(): CSSProperties {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
      };
    },

    name: `position-${side}`,
  };
};
