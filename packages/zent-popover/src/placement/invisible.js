import createPlacement from './create';

/**
 * 不可见定位
 */
export default createPlacement(() => {
  const x = -100000;
  const y = -100000;

  return {
    getCSSStyle() {
      return {
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        zIndex: -10,
        opacity: 0
      };
    },

    name: 'position-invisible'
  };
});
