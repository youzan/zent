import React from 'react';

import Colors from './colors';

const palettes = {
  primary: {
    title: 'Primary Colors',
    desc: <p>The primary color in Zent is blue.</p>
  },
  neutral: {
    title: 'Neutral Colors',
    desc: <p>Used in texts, backgrounds and borders.</p>
  },
  auxiliary: {
    success: {
      title: 'Auxiliary - Success'
    },
    warning: {
      title: 'Auxiliary - Warning'
    },
    notice: {
      title: 'Auxiliary - Notice'
    },
    error: {
      title: 'Auxiliary - Error'
    },
    others: {
      title: 'Auxiliary - Others',
      desc: <p>Used for masks or shadows.</p>
    }
  }
};

export default function ColorsUS() {
  return (
    <Colors
      title="Colors"
      desc={
        <p>
          Zent uses a set of color palettes to unify the overall look and feel.
          You can even customize colors using <a href="theme">themes</a>.
        </p>
      }
      palettes={palettes}
    />
  );
}
