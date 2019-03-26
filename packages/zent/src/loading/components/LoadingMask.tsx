import * as React from 'react';

import Icon, { IIconPropsWithType } from './icons';

export default function LoadingMask(props: IIconPropsWithType) {
  return (
    <div className="zent-loading-mask">
      <Icon {...props} />
    </div>
  );
}
