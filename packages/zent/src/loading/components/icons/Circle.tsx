import cx from 'classnames';

import getTextPosition from './position';
import { IIconProps } from './IconProps';

const DEFAULT_SIZE = 24;

export default function CircleIcon({
  size,
  text,
  textPosition,
  colorPreset,
}: IIconProps) {
  size = size || DEFAULT_SIZE;

  return (
    <div
      className={cx(
        'zent-loading-icon-and-text',
        'zent-loading-icon-and-text--circle',
        `zent-loading-color-preset--${colorPreset}`,
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
