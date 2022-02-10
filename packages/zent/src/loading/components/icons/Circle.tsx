import cx from 'classnames';

import getTextPosition from './position';
import { IIconProps } from './IconProps';
import { LoadingColorPreset } from '../../props';

const DEFAULT_SIZE = 20;

const ColorPresetMap: Record<LoadingColorPreset, [string, string]> = {
  primary: ['#155BD4', '#EDF4FF'],
  grey: ['#CCC', '#F7F7F7'],
};

const renderCircleSvg = (size: number, colorPreset: LoadingColorPreset) => {
  const colors = ColorPresetMap[colorPreset];

  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 20 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="zent-loading-icon zent-loading-icon-circle"
    >
      <g
        id="loading"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <rect x="0" y="0" width="20" height="20"></rect>
        <path
          d="M10,2 C14.418278,2 18,5.581722 18,10 C18,14.418278 14.418278,18 10,18 C5.581722,18 2,14.418278 2,10 C2,5.581722 5.581722,2 10,2 Z M10,4 C6.6862915,4 4,6.6862915 4,10 C4,13.3137085 6.6862915,16 10,16 C13.3137085,16 16,13.3137085 16,10 C16,6.6862915 13.3137085,4 10,4 Z"
          fill={colors[1]}
          fillRule="nonzero"
        ></path>
        <path
          d="M10,2 L10,4 L10,4 C6.6862915,4 4,6.6862915 4,10 C4,13.3137085 6.6862915,16 10,16 L10,18 L10,18 C5.581722,18 2,14.418278 2,10 C2,5.581722 5.581722,2 10,2 Z"
          fill={colors[0]}
          fillRule="nonzero"
        ></path>
      </g>
    </svg>
  );
};

export default function CircleIcon({
  size,
  text,
  textPosition,
  textSize = 14,
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
      {renderCircleSvg(size, colorPreset)}
      {text && (
        <div
          className="zent-loading-icon-text"
          style={{ fontSize: `${textSize}px` }}
        >
          {text}
        </div>
      )}
    </div>
  );
}
