import React from 'react';

import Icon from './icons';

export default function LoadingMask(props) {
  return (
    <div className="zent-loading-mask">
      <Icon {...props} />
    </div>
  );
}
