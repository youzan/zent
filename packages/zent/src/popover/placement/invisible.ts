import { CSSProperties } from 'react';
import createPlacement from './create';
import { PositionFunctionImpl } from '../position-function';

/**
 * 不可见定位
 */
const locate: PositionFunctionImpl = () => {
  const x = -100000;
  const y = -100000;

  return {
    getCSSStyle(): CSSProperties {
      return {
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        zIndex: -10,
        opacity: 0,
      };
    },

    name: 'position-invisible',
  };
};

const Invisible = createPlacement(locate);

export default Invisible;
