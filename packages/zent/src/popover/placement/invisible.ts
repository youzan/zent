// import { CSSProperties } from 'react';
//
import { IPopoverPosition } from '../position-function';
import { prefix } from './prefix';

export const INVISIBLE_POSITION: IPopoverPosition = {
  style: {
    position: 'fixed',
    left: -100000,
    top: -100000,
    zIndex: -10,
    opacity: 0,
  },
  className: prefix('position-invisible'),
};

export function Invisible(): IPopoverPosition {
  return INVISIBLE_POSITION;
}

// /**
//  * 不可见定位
//  */
// const locate: PositionFunctionImpl = () => {
//   const x = -100000;
//   const y = -100000;

//   return {
//     getCSSStyle(): CSSProperties {
//       return {
//         position: 'fixed',
//         left: `${x}px`,
//         top: `${y}px`,
//         zIndex: -10,
//         opacity: 0,
//       };
//     },

//     className: prefix('className: prefix('position-invisible')'),
//   };
// };

// const Invisible = createPlacement(locate);

// export default Invisible;
