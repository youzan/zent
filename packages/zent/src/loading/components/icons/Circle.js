import React from 'react';
import cx from 'classnames';
import getTextPosition from './position';

const DEFAULT_SIZE = 24;

export default function CircleIcon({ size, text, textPosition }) {
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
