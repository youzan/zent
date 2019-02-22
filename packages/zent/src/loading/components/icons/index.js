import React from 'react';

import YouzanIcon from './Youzan';
import CircleIcon from './Circle';

export default function Icon({ icon, ...rest }) {
  if (icon === 'youzan') {
    return <YouzanIcon {...rest} />;
  }

  if (icon === 'circle') {
    return <CircleIcon {...rest} />;
  }

  return null;
}
