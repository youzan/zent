import * as React from 'react';
import cx from 'classnames';

import getTextPosition from './position';
import { IIconProps } from './IconProps';

const DEFAULT_SIZE = 24;

export default function CircleIcon({ size, text, textPosition }: IIconProps) {
  size = size || DEFAULT_SIZE;

  return (
    <div
      className={cx(
        'zent-loading-icon-and-text',
        getTextPosition(textPosition)
      )}
    >
      <div
        className="zent-loading-icon zent-loading-icon-circle"
        style={{ width: size, height: size }}
      />
      {text && <div className="zent-loading-icon-text">{text}</div>}
    </div>
  );
}
