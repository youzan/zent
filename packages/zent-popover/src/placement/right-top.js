import createPlacement from './create';

/**
* -------------------------------
* |   anchor           | popover |
* |                    |---------
* ----------------------
*/
export default createPlacement((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
  const { right, top } = anchorBoundingBox;
  const x = right + options.cushion;
  const y = top;

  return {
    getCSSStyle() {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`
      };
    },

    name: 'position-right-top'
  };
});

/**
* ----------------------------------
* |		                |   popover   |
* |   anchor          --------------|
* ----------------------------------|
*/
// export function TopRightInnerPlacement(anchorBoundingBox, containerBoundingBox) {
//   const { right, top } = anchorBoundingBox;
//   const x = containerBoundingBox.right - right;
//   const y = top;

//   return {
//     getCSSStyle() {
//       return {
//         position: 'absolute',
//         right: `${x}px`,
//         top: `${y}px`
//       };
//     },

//     toString() {
//       return 'rt-i';
//     }
//   };
// }
