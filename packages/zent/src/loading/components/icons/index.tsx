import * as React from 'react';

import YouzanIcon from './Youzan';
import CircleIcon from './Circle';
import { IIconProps } from './IconProps';

export interface IIconPropsWithType extends IIconProps {
  icon: string;
}

export default function Icon({ icon, ...rest }: IIconPropsWithType) {
  if (icon === 'youzan') {
    return <YouzanIcon {...rest} />;
  }

  if (icon === 'circle') {
    return <CircleIcon {...rest} />;
  }

  return null;
}
