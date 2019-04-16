import * as React from 'react';
import cx from 'classnames';

import getTextPosition from './position';
import { IIconProps } from './IconProps';

const DEFAULT_WIDTH = 19;
const DEFAULT_HEIGHT = 23;
const DEFAULT_SIZE = 40;

export default function YouzanIcon({ size, text, textPosition }: IIconProps) {
  size = size || DEFAULT_SIZE;

  return (
    <div
      className={cx(
        'zent-loading-icon-and-text',
        getTextPosition(textPosition)
      )}
    >
      <div
        className="zent-loading-icon zent-loading-icon-youzan"
        style={{ height: size, width: size }}
      >
        <YouzanSvg size={size} />
      </div>
      {text && <div className="zent-loading-icon-text">{text}</div>}
    </div>
  );
}

function YouzanSvg({ size }: { size: number }) {
  return (
    <svg
      width={scaleSvgSize(size, DEFAULT_WIDTH)}
      height={scaleSvgSize(size, DEFAULT_HEIGHT)}
      viewBox={`0 0 ${DEFAULT_WIDTH} ${DEFAULT_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      className="zent-loading-icon-youzan-svg"
    >
      <path
        d="M4.649 22.4V11.573c3.245-.966 4.18-10.27 4.18-10.27.084-.621.64-1.204 1.252-1.3l-.21.033C11.495-.22 12.71.92 12.583 2.58l-.337 4.43c-.046.613.404 1.051 1.006.98l4.005-.482c1.216-.146 1.97.714 1.682 1.92 0 0-.135.403-.21 1.111-.073.708.312.96.23 1.986-.08 1.027-.411 1.154-.479 1.944s.174.888.122 1.628c-.068.955-.434 1.205-.508 1.66-.074.457.01.779.01.779.081.904-.55 1.753-1.435 1.898L4.649 22.4zM3.568 11.801v10.776l-2.5.409C.478 23.082 0 22.67 0 22.064v-8.762c0-.454.357-.89.797-.972 0 0 1.64-.307 2.77-.529z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function scaleSvgSize(size: number, value: number) {
  return (size / DEFAULT_SIZE) * value;
}
