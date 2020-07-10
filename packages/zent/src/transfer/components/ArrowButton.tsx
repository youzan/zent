import * as React from 'react';
import cx from 'classnames';

import Button from '../../button';
import { Direction } from '../constants';
import { IArrowButton } from '../types';

const ArrowButton = ({
  direction,
  onChange,
  disabled,
  prefix,
}: IArrowButton) => {
  return (
    <Button
      type={disabled ? 'default' : 'primary'}
      disabled={disabled}
      onClick={onChange}
      className={`${prefix}__arrow__button`}
    >
      <svg
        width="9"
        height="14"
        xmlns="http://www.w3.org/2000/svg"
        className={cx(`${prefix}__arrow__icon`, {
          [`${prefix}__arrow__icon--disabled`]: disabled,
        })}
      >
        <path
          d={
            Direction.left === direction
              ? 'M8 1L1.78 7 8 13'
              : 'M1 1l6.22 6L1 13'
          }
          strokeWidth={2}
          fill="none"
          fillRule="evenodd"
        />
      </svg>
    </Button>
  );
};

export default ArrowButton;
