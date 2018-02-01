import React from 'react';
import reactCSS from '../helpers/reactcss';
import * as checkboard from '../helpers/checkboard';

const Checkboard = ({ white, grey, size, renderers }) => {
  const styles = reactCSS({
    default: {
      grid: {
        absolute: '0px 0px 0px 0px',
        background: `url(${checkboard.get(
          white,
          grey,
          size,
          renderers.canvas
        )}) center left`,
      },
    },
  });

  return <div style={styles.grid} />;
};

Checkboard.defaultProps = {
  size: 8,
  white: 'transparent',
  grey: 'rgba(0,0,0,.08)',
  renderers: {},
};

export default Checkboard;
